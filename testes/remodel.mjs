import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({ colorScheme:'dark', viewport:{width:1280,height:900} });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type()==='error' && !/gstatic|firebase|net::/i.test(m.text())) errs.push(m.text()); });
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

await page.goto(`${BASE}/index.html`); await page.waitForTimeout(800);
await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit'); await page.waitForTimeout(2300);

// vidro só na camada flutuante
const glass = await page.evaluate(() => {
  const has = sel => { const e=document.querySelector(sel); if(!e) return null;
    const f=getComputedStyle(e).backdropFilter||getComputedStyle(e).webkitBackdropFilter; return f && f!=='none'; };
  const contentGlass = [...document.querySelectorAll('.card,.profile,.cat-sec,.body,.rail')]
    .filter(e => { const f=getComputedStyle(e).backdropFilter; return f && f!=='none'; }).length;
  return { topbar: has('.topbar'), card: has('.card'), contentGlass };
});
check('vidro na barra do topo', glass.topbar === true);
// O vidro no conteúdo foi pedido explicitamente. O que a regra protegia era a
// hierarquia: aberto tem de continuar avançando sobre entregue. A guarda
// agora é essa — e o contraste, que roda na suíte própria.
check('vidro no card (pedido)', glass.card === true);
const peso = await page.evaluate(() => {
  const a = document.querySelector('.card:not(.is-done)'), d = document.querySelector('.card.is-done');
  const alfa = el => Number((getComputedStyle(el).backgroundColor.match(/[\d.]+\)$/)||['1)'])[0].slice(0,-1));
  return a && d ? { aberto: alfa(a), entregue: alfa(d) } : null;
});
check('aberto é mais denso que entregue', peso && peso.aberto > peso.entregue,
      `${peso?.aberto} vs ${peso?.entregue}`);

// atalhos
await page.keyboard.press('/'); await page.waitForTimeout(400);
check('atalho / abre a busca', await page.evaluate(() => document.activeElement?.id === 'srch'));
await page.keyboard.press('Escape'); await page.waitForTimeout(300);
await page.keyboard.press('n'); await page.waitForTimeout(400);
check('atalho N abre nova demanda', !(await page.locator('#taskOverlay').isHidden()));
await page.keyboard.press('Escape'); await page.waitForTimeout(300);

// aviso + desfazer no lugar do confirm()
page.on('dialog', async d => { errs.push('CONFIRM inesperado: '+d.message()); await d.dismiss(); });
// o trilho de estado publica o total: "734 de 746 entregues"
const total = async () => Number((await page.locator('#stateSummary').innerText()).match(/^(\d+) demandas/)[1]);
const antes = await total();
await page.locator('.card .act-del').first().click(); await page.waitForTimeout(700);
const depois = await total();
check('excluir não abre diálogo do navegador', depois === antes - 1, `${antes} → ${depois} demandas`);
check('aviso com Desfazer aparece', await page.locator('.toast-action:has-text("Desfazer")').count() === 1);
await page.locator('.toast-action:has-text("Desfazer")').click(); await page.waitForTimeout(800);
check('Desfazer devolve a demanda', await total() === antes, `${await total()} demandas`);

// botão de editar avatar não é mais coberto pelo círculo
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
await page.locator('#moreMenu button:has-text("Perfis do time")').click(); await page.waitForTimeout(500);
const btn = await page.evaluate(() => {
  const b = document.querySelector('.av-edit-btn'); const r = b.getBoundingClientRect();
  const top = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
  return { clickable: b.contains(top) || b === top, w: Math.round(r.width), h: Math.round(r.height),
           circleIsButton: !!document.querySelector('button.av') };
});
check('lápis recebe o clique', btn.clickable, `${btn.w}×${btn.h}`);
check('círculo não é mais clicável', btn.circleIsButton === false);
check('alvo do lápis ≥ 28px', btn.w >= 28 && btn.h >= 28, `${btn.w}×${btn.h}`);
// e continua recebendo o clique com o ponteiro em cima (era aí que falhava)
await page.locator('.av-wrap').first().hover(); await page.waitForTimeout(350);
const aindaEmCima = await page.evaluate(() => {
  const b = document.querySelector('.av-edit-btn'); const r = b.getBoundingClientRect();
  return b.contains(document.elementFromPoint(r.left + r.width/2, r.top + r.height/2));
});
check('lápis continua na frente no hover', aindaEmCima);
await page.locator('.av-edit-btn').first().click(); await page.waitForTimeout(400);
check('lápis abre o editor de cor', !(await page.locator('#avOverlay').isHidden()));

console.log(ok.join('\n'));
console.log(errs.length ? '\nERROS:\n'+errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
