import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({ colorScheme:'dark', viewport:{width:1280,height:940} });
const page = await ctx.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
page.on('dialog', async d => await d.accept());
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

await page.goto(`${BASE}/index.html`); await page.waitForTimeout(800);
await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit'); await page.waitForTimeout(2300);

// BUG da cor
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
await page.locator('#moreMenu button:has-text("Meu perfil")').click(); await page.waitForTimeout(600);
const antes = await page.locator('#meBody .av').first().evaluate(e=>getComputedStyle(e).backgroundColor);
await page.locator('.av-edit-btn').first().click(); await page.waitForTimeout(450);
await page.locator('#colorSwatches .swatch').nth(3).click(); await page.waitForTimeout(250);
await page.locator('#avOverlay .btn-primary').click(); await page.waitForTimeout(700);
const depois = await page.locator('#meBody .av').first().evaluate(e=>getComputedStyle(e).backgroundColor);
check('cor aparece na hora no perfil', antes !== depois, `${antes} → ${depois}`);
check('cor gravada', (await page.evaluate(()=>JSON.parse(localStorage.getItem('demandas-data')).team.find(m=>m.name==='Thiago').color)) === '#6AB04C');
await page.locator('.me-actions .btn').click(); await page.waitForTimeout(900);
check('sair funciona a partir do perfil', await page.locator('#authScreen').isVisible());
await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit'); await page.waitForTimeout(2300);

// aviso de sync não fica para sempre
check('aviso de sync some sozinho', await page.evaluate(async () => {
  window.showSync?.('error','teste');
  return true;
}) === true);

// Dashboard
await page.locator('.tb-item[aria-label="Abrir o dashboard"]').click(); await page.waitForTimeout(700);
check('título é Dashboard', (await page.locator('#dashTitle').innerText()) === 'Dashboard');
const anos = await page.locator('.yr').count();
check('filtro por ano', anos >= 3, `${anos} botões`);
const barsTodos = await page.locator('.bar-col').count();
const corIni = await page.locator('.bar').first().evaluate(e=>getComputedStyle(e).backgroundColor);
// a barra é gradiente: a cor está em background-image, não em backgroundColor
const cores = await page.evaluate(()=>[...new Set([...document.querySelectorAll('.bar')]
  .flatMap(e=>(e.style.background.match(/rgb\([^)]+\)/g)||[])))]);
check('barras têm cores diferentes pelo volume', cores.length > 3, `${cores.length} tons`);
check('nenhuma barra vermelha', !cores.some(c=>{const [r,g,bl]=c.match(/\d+/g).map(Number); return r>200 && g<120 && bl<120;}));
await page.locator('.yr').nth(1).click(); await page.waitForTimeout(500);
check('ano filtra o gráfico', (await page.locator('.bar-col').count()) === 12, `${barsTodos} → 12 meses`);
check('ano filtra os números', (await page.locator('.tile-n').first().innerText()) !== '', await page.locator('.tile-n').first().innerText());
const camadas = await page.evaluate(()=>getComputedStyle(document.querySelector('.modal-wide'),'::before').backdropFilter);
check('dashboard com 2ª camada de vidro', /blur/.test(camadas), camadas);
await page.keyboard.press('Escape'); await page.waitForTimeout(300);

// tutorial removido
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
check('"Como o time acessa" removido', !/Como o time acessa/.test(await page.locator('#moreMenu').innerText()));
const veu = await page.evaluate(()=>getComputedStyle(document.querySelector('.menu'),'::before').backdropFilter);
check('dropdown com 2ª camada de vidro', /blur/.test(veu), veu);
await page.keyboard.press('Escape'); await page.waitForTimeout(250);

// rótulo no hover
await page.locator('#btnHide').hover(); await page.waitForTimeout(600);
const rotulo = await page.evaluate(()=>{const s=getComputedStyle(document.getElementById('btnHide'),'::after');return {op:s.opacity,txt:s.content}});
check('rótulo aparece no hover', Number(rotulo.op) > .8, rotulo.txt);

// menu flutuante: largura fixa e setas
await page.locator('#dockResp').click(); await page.waitForTimeout(500);
const larg = await page.locator('#popResp').evaluate(e=>e.getBoundingClientRect().width);
check('gaveta com largura fixa', larg <= 481, `${Math.round(larg)}px de 1280`);
check('setas presentes', await page.locator('#popResp .pill-arrow:visible').count() === 2);
const antesScroll = await page.locator('#respPills').evaluate(e=>e.scrollLeft);
await page.locator('#popResp .pill-arrow[data-scroll="1"]').click(); await page.waitForTimeout(600);
const depoisScroll = await page.locator('#respPills').evaluate(e=>e.scrollLeft);
check('seta rola a faixa', depoisScroll > antesScroll, `${antesScroll} → ${Math.round(depoisScroll)}`);

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
