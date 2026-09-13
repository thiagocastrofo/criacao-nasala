import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const p = await (await b.newContext({colorScheme:'dark',viewport:{width:1280,height:940}})).newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);
await p.goto(`${BASE}/index.html`); await p.waitForTimeout(800);
await p.fill('#authEmail','thiago@nasala.com.br'); await p.fill('#authPass','Thiago@290692');
await p.click('#authSubmit'); await p.waitForTimeout(2300);

// cabeçalho não se mexe com o menu aberto
const h1 = await p.locator('.topbar').evaluate(e=>e.getBoundingClientRect().height);
const t1 = await p.locator('.title-display').evaluate(e=>Math.round(e.getBoundingClientRect().y));
await p.locator('#btnAccount').click(); await p.waitForTimeout(400);
check('menu não empurra o cabeçalho',
  h1 === await p.locator('.topbar').evaluate(e=>e.getBoundingClientRect().height) &&
  t1 === await p.locator('.title-display').evaluate(e=>Math.round(e.getBoundingClientRect().y)));
check('menu está fora do fluxo', await p.locator('#moreMenu').evaluate(e=>getComputedStyle(e).position) === 'absolute');
await p.keyboard.press('Escape'); await p.waitForTimeout(250);

await p.locator('.tb-item[aria-label="Abrir o dashboard"]').click(); await p.waitForTimeout(700);
// duas cores por mês, da paleta
const fundos = await p.evaluate(()=>[...document.querySelectorAll('.bar')].filter(e=>e.style.background.includes('gradient')).map(e=>e.style.background));
check('cada barra é gradiente de duas cores', fundos.length > 0 && fundos.every(f=>(f.match(/rgb\(/g)||[]).length === 2), `${fundos.length} barras`);
const rgbs = [...new Set(fundos.flatMap(f=>f.match(/rgb\([^)]+\)/g)))];
const fora = rgbs.filter(c=>{const[r,g,bl]=c.match(/\d+/g).map(Number);
  // tudo tem de cair dentro do envelope da paleta: menta→verde→amarelo→laranja
  return !(r<=255 && g>=140 && bl<=215) || (r>200 && g<130);});
check('cores dentro da paleta de referência', fora.length===0, fora.slice(0,3).join(' ') || `${rgbs.length} tons`);
check('nenhum vermelho', !rgbs.some(c=>{const[r,g,bl]=c.match(/\d+/g).map(Number); return r>200 && g<120 && bl<120;}));

// ano filtrado esconde a carga por pessoa por inteiro (não mostra barras zeradas)
await p.locator('.yr').nth(1).click(); await p.waitForTimeout(600);
const linhas = await p.locator('.load-row').count();
const barrasZero = await p.evaluate(()=>[...document.querySelectorAll('.load-fill')].filter(e=>e.style.width==='0%').length);
check('ano filtrado some com a carga, sem barras vazias', linhas === 0 && barrasZero === 0,
      `${linhas} linha(s) de carga, ${barrasZero} barras zeradas`);
await p.locator('.yr').nth(0).click(); await p.waitForTimeout(500);
check('voltar para Tudo restaura os painéis', await p.locator('.load-row').count() > 0);

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
