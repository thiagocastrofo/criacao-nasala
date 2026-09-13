import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
// iframe SEM allow-modals: é assim que o preview roda, e é onde confirm()
// devolve false silenciosamente.
const ctx = await b.newContext({colorScheme:'dark',viewport:{width:1280,height:940}});
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
let dialogos = 0; p.on('dialog', async d => { dialogos++; await d.dismiss(); });
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);
await p.goto(`${BASE}/index.html`); await p.waitForTimeout(800);
await p.fill('#authEmail','thiago@nasala.com.br'); await p.fill('#authPass','Thiago@290692');
await p.click('#authSubmit'); await p.waitForTimeout(2300);

// 1. ocultar entregues mantém o número
const antes = await p.locator('#stateChips .stat').first().innerText();
await p.locator('#btnHide').click(); await p.waitForTimeout(600);
const depois = await p.locator('#stateChips .stat').first().innerText();
check('contador de entregues não zera', depois.includes('734'), `${antes.replace(/\n/g,' ')} → ${depois.replace(/\n/g,' ')}`);
check('ficha de entregues esmaecida', await p.locator('.stat.is-muted').count() === 1);
check('lista realmente esconde as entregues', await p.locator('.card.is-done').count() === 0);
await p.locator('#btnHide').click(); await p.waitForTimeout(500);
check('voltar restaura', await p.locator('.stat.is-muted').count() === 0 && await p.locator('.card.is-done').count() > 0);

// 2. sair — SEM diálogo do navegador
await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
await p.locator('#moreMenu button:has-text("Sair da conta")').click(); await p.waitForTimeout(900);
check('sair funciona sem diálogo do navegador', await p.locator('#authScreen').isVisible() && dialogos === 0,
      `${dialogos} diálogo(s) do navegador`);
await p.fill('#authEmail','thiago@nasala.com.br'); await p.fill('#authPass','Thiago@290692');
await p.click('#authSubmit'); await p.waitForTimeout(2300);

// limpar histórico usa a confirmação própria — precisa de log, então gera um
await p.locator('.card .status-select').first().selectOption('em andamento');
await p.waitForTimeout(600);
await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
await p.locator('#moreMenu button:has-text("Log de atividades")').click(); await p.waitForTimeout(500);
await p.locator('.modal-btns .btn-danger').click(); await p.waitForTimeout(500);
check('confirmação é da própria página', !(await p.locator('#askOverlay').isHidden()) && dialogos === 0,
      await p.locator('#askTitle').innerText());
await p.locator('#askOverlay .btn').first().click(); await p.waitForTimeout(400);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);

// 3. gaveta de casas sem sobra
await p.locator('#dockCat').click(); await p.waitForTimeout(500);
const wCasas = await p.locator('#popCat').evaluate(e=>e.getBoundingClientRect().width);
await p.locator('#dockResp').click(); await p.waitForTimeout(500);
const wTime = await p.locator('#popResp').evaluate(e=>e.getBoundingClientRect().width);
check('gaveta de casas não sobra espaço', wCasas < wTime, `casas ${Math.round(wCasas)}px · time ${Math.round(wTime)}px`);
check('gaveta de time no teto', wTime <= 481, `${Math.round(wTime)}px`);
await p.keyboard.press('Escape'); await p.waitForTimeout(250);

// 4. carga some com filtro de ano
await p.locator('.tb-item[aria-label="Abrir o dashboard"]').click(); await p.waitForTimeout(700);
check('carga aparece em Tudo', (await p.locator('.load-row').count()) > 0);
await p.locator('.yr').nth(1).click(); await p.waitForTimeout(600);
check('carga some com ano selecionado',
  (await p.locator('.load-row').count()) === 0 && !/Carga por pessoa/.test(await p.locator('#dashBody').innerText()));
await p.locator('.yr').nth(0).click(); await p.waitForTimeout(500);
check('volta em Tudo', (await p.locator('.load-row').count()) > 0);
await p.keyboard.press('Escape'); await p.waitForTimeout(300);

// 5. sem contagem de concorrência
await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
await p.locator('#moreMenu button:has-text("Meu perfil")').click(); await p.waitForTimeout(600);
const mMeu = await p.locator('#meBody .metric-l').allInnerTexts();
check('Meu perfil sem "Ganhas"', !mMeu.includes('Ganhas'), mMeu.join(' · '));
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
await p.locator('#moreMenu button:has-text("Perfis do time")').click(); await p.waitForTimeout(600);
const mTime = await p.locator('.profile .metric-l').allInnerTexts();
check('Perfis do time sem "Ganhas"', !mTime.includes('Ganhas'), [...new Set(mTime)].join(' · '));

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
