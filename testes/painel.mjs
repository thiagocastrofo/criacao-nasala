import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({ colorScheme:'dark', viewport:{width:1280,height:960} });
const page = await ctx.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

await page.goto(`${BASE}/index.html`); await page.waitForTimeout(800);
await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit'); await page.waitForTimeout(2300);

// a barra saiu do quadro, as fichas ficaram
check('barra saiu do quadro', await page.locator('#stateRail .seg').count() === 0);
check('fichas de status ficaram', await page.locator('#stateChips .stat').count() === 4);

// atraso: sem traço, com glow
const late = await page.evaluate(() => {
  const c = document.querySelector('.card.is-late'); if (!c) return null;
  const sh = getComputedStyle(c).boxShadow;
  return { temInset: /inset/.test(sh), temGlow: /rgba?\(/.test(sh) && sh !== 'none', sh: sh.slice(0,70) };
});
check('traço vermelho removido', late && !late.temInset, late?.sh);
check('glow de atraso presente', late && late.temGlow);

// painel
await page.locator('.tb-item[aria-label="Abrir o dashboard"]').click(); await page.waitForTimeout(700);
check('painel abre', !(await page.locator('#dashOverlay').isHidden()));
check('3 números de cabeçalho', await page.locator('.tile').count() === 3);
check('gráfico de 12 meses', await page.locator('.bar-col').count() === 12);
const chave = (await page.locator('.stack-key').innerText()).replace(/\n/g,' ');
check('situação dentro do painel', await page.locator('.stack-key > div').count() === 3, chave);
check('número e porcentagem separados', !/\d{3,}%/.test(chave.replace(/\s/g,'')) || / · /.test(chave), chave);
check('por casa', await page.locator('.house-row').count() > 0, `${await page.locator('.house-row').count()} casas`);
check('carga por pessoa', await page.locator('.load-row').count() > 0, `${await page.locator('.load-row').count()} pessoas`);

// carga usa tinta neutra, não paleta de status
const cargaCor = await page.evaluate(() => {
  const f=[...document.querySelectorAll('.load-fill')].map(e=>getComputedStyle(e).backgroundColor);
  return {unica:new Set(f).size===1, cor:f[0]};
});
check('carga: um tom só, neutro', cargaCor.unica, cargaCor.cor);

// tooltip do gráfico
await page.locator('.bar-col').nth(6).hover(); await page.waitForTimeout(350);
check('tooltip aparece no hover', !(await page.locator('#chartTip').isHidden()),
      await page.locator('#chartTip').innerText());

// vidro mais denso
const blur = await page.evaluate(() => getComputedStyle(document.querySelector('#dashOverlay .modal')).backdropFilter);
check('vidro das janelas mais denso', /48px/.test(blur), blur);
await page.keyboard.press('Escape'); await page.waitForTimeout(300);

// trocar de conta removido; sair continua
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
const menu = await page.locator('#moreMenu').innerText();
check('Trocar de conta removido', !/Trocar de conta/.test(menu));
check('Sair da conta continua', /Sair da conta/.test(menu));
// no escuro o item mostra o SOL (a ação é ir para o claro); a lua é no claro
check('sol no tema escuro', await page.evaluate(() => /circle/.test(document.getElementById('themeIcon').innerHTML)));
await page.locator('#btnTheme').click(); await page.waitForTimeout(400);
check('lua preenchida no tema claro', await page.evaluate(() =>
  !!document.querySelector('#themeIcon path[fill="currentColor"]')),
  await page.evaluate(() => document.getElementById('themeLabel').textContent));

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
