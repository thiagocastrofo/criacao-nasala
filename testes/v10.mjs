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

await p.locator('.tb-item[aria-label="Abrir o dashboard"]').click(); await p.waitForTimeout(700);
const anos = await p.locator('.yr').allInnerTexts();
check('filtro de ano sem contagem', anos.every(t => /^(Tudo|\d{4})$/.test(t.trim())), anos.map(t=>t.trim()).join(' · '));
check('rótulos numa linha só', await p.evaluate(()=>[...document.querySelectorAll('.yr')]
  .every(e=>e.getBoundingClientRect().height <= 34)));
check('legenda de cor removida', await p.locator('.ramp').count() === 0 && await p.locator('.ramp-bar').count() === 0);
check('subtítulo sem "a cor mostra"', !/a cor mostra/.test(await p.locator('.panel-sub').first().innerText()),
      await p.locator('.panel-sub').first().innerText());
check('barras continuam com duas cores', await p.evaluate(()=>[...document.querySelectorAll('.bar')]
  .filter(e=>(e.style.background.match(/rgb\(/g)||[]).length===2).length) > 0);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);

// esmaecido nas pontas da faixa de pessoas
await p.locator('#dockResp').click(); await p.waitForTimeout(600);
const est = async () => p.evaluate(()=>{const f=document.getElementById('respPills');
  return {l:f.classList.contains('fade-l'), r:f.classList.contains('fade-r'),
          mask:getComputedStyle(f).maskImage.slice(0,42), scroll:Math.round(f.scrollLeft)};});
const ini = await est();
check('no início: esmaece só à direita', !ini.l && ini.r, `mask=${ini.mask}`);
await p.locator('#popResp .pill-arrow[data-scroll="1"]').click(); await p.waitForTimeout(700);
const meio = await est();
check('no meio: esmaece dos dois lados', meio.l && meio.r, `scroll=${meio.scroll}`);
const dir = p.locator('#popResp .pill-arrow[data-scroll="1"]');
for (let i = 0; i < 8 && !(await dir.isDisabled()); i++) { await dir.click(); await p.waitForTimeout(500); }
const fim = await est();
check('no fim: esmaece só à esquerda', fim.l && !fim.r, `scroll=${fim.scroll}`);
check('nas pontas o pill aparece inteiro', !(fim.r), 'sem corte à direita no fim');

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
