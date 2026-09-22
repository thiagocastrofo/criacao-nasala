import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const browser = await chromium.launch();
const ctx = await browser.newContext({ colorScheme:'dark', viewport:{width:1280,height:900} });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type()==='error' && !/gstatic|firebase|net::|Failed to load/i.test(m.text())) errs.push('console: ' + m.text()); });
await page.goto(`${BASE}/index.html`, { waitUntil:'domcontentloaded' });
await page.waitForTimeout(900);
await page.fill('#authEmail','thiago@nasala.com.br');
await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit');
await page.waitForTimeout(2200);

const ok = [];
const check = (name, cond, extra='') => ok.push(`${cond?'ok  ':'FAIL'} ${name}${extra?' — '+extra:''}`);

// filtros de casa
await page.locator('#dockCat').click(); await page.waitForTimeout(250);
await page.locator('#catPills button').nth(1).click();   // CIDADE
await page.waitForTimeout(150);
check('filtro de casa', (await page.locator('.cat-sec').count()) === 1, (await page.locator('.cat-hdr .sr-only, .cat-lbl').first().innerText()).trim());
await page.locator('#dockCat').click(); await page.waitForTimeout(250);
await page.locator('#catPills button').nth(1).click();   // desmarca
await page.waitForTimeout(150);
check('desmarcar casa', (await page.locator('.cat-sec').count()) === 3);

// busca
await page.locator('#dockSearch').click();
await page.locator('#srch').fill('boticário');
await page.waitForTimeout(400);
const found = await page.locator('.card').count();
check('busca', found > 0 && found < 60, `${found} resultados`);
await page.locator('#srch').fill('');
await page.waitForTimeout(300);

// ocultar entregues — o esperado sai dos próprios dados, não de um número
// fixo, senão a suíte quebra toda vez que a pauta é atualizada.
const abertasEsperadas = await page.evaluate(() =>
  window.__tasks ? 0 : document.querySelectorAll('.card:not(.is-done)').length);
await page.locator('#btnHide').click();
await page.waitForTimeout(250);
const sobraram = await page.locator('.card').count();
check('ocultar entregues', sobraram === abertasEsperadas && sobraram > 0,
      `${sobraram} abertas (esperado ${abertasEsperadas})`);
check('aria-pressed', await page.locator('#btnHide').getAttribute('aria-pressed') === 'true');
await page.locator('#btnHide').click();
await page.waitForTimeout(250);

// mostrar mais
const before = await page.locator('.card').count();
await page.locator('.more-btn').first().click();
await page.waitForTimeout(300);
check('mostrar mais', (await page.locator('.card').count()) > before, `${before} → ${await page.locator('.card').count()}`);

// recolher seção
await page.locator('.cat-hdr').first().click();
await page.waitForTimeout(200);
check('recolher seção', await page.locator('.cat-body').first().evaluate(el => getComputedStyle(el).display) === 'none');
check('aria-expanded seção', await page.locator('.cat-hdr').first().getAttribute('aria-expanded') === 'false');
await page.locator('.cat-hdr').first().click();
await page.waitForTimeout(200);

// tema
const themeBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
await page.locator('#btnAccount').click();
await page.waitForTimeout(150);
check('menu abre', !(await page.locator('#moreMenu').isHidden()));
await page.locator('#btnTheme').click();
await page.waitForTimeout(300);
const themeAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check('alternar tema', themeBefore !== themeAfter, `${themeBefore} → ${themeAfter}`);
await page.keyboard.press('Escape');
await page.locator('#btnTheme').click({ force:true }).catch(()=>{});
await page.locator('#btnAccount').click();
await page.locator('#btnTheme').click();
await page.waitForTimeout(200);
await page.keyboard.press('Escape');

// modais: abre, Esc fecha, foco volta
for (const [label, sel] of [['Nova demanda','.topbar .btn-primary'],['Dashboard','.tb-item[aria-label="Abrir o dashboard"]'],['Dashboard','.tb-item[aria-label="Abrir o dashboard"]']]) {
  await page.locator(sel).first().click();
  await page.waitForTimeout(250);
  const dlg = await page.locator('.overlay:not([hidden])').count();
  const focusedIn = await page.evaluate(() => !!document.activeElement?.closest('.overlay:not([hidden])'));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const closed = (await page.locator('.overlay:not([hidden])').count()) === 0;
  check(`modal ${label}`, dlg === 1 && focusedIn && closed, `abre=${dlg===1} foco=${focusedIn} esc=${closed}`);
}

// caminho só de teclado: primeira tecla de uma página recém-carregada
await page.reload({ waitUntil:'domcontentloaded' });
await page.waitForTimeout(1500);
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0,40));
check('skip link é o 1º foco', /Pular para a lista/.test(firstFocus||''), firstFocus);
const skipVisible = await page.evaluate(() => {
  const a = document.querySelector('a.sr-only'); a.focus();
  return a.getBoundingClientRect().width > 40;
});
check('skip link visível ao focar', skipVisible);

// anel de foco visível
const ring = await page.evaluate(() => {
  const b = document.querySelector('#btnHide'); b.focus();
  const s = getComputedStyle(b);
  return s.outlineStyle + ' ' + s.outlineWidth;
});
check('anel de foco', !/none/.test(ring), ring);

// nenhum texto abaixo de 11px
const tiny = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll('body *').forEach(el => {
    if (!el.childNodes.length) return;
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs && fs < 11) bad.push(el.className + ' @ ' + fs + 'px');
  });
  return [...new Set(bad)].slice(0,8);
});
check('nada abaixo de 11px', tiny.length === 0, tiny.join(' | ') || 'ok');

// botão dentro de botão (HTML inválido)
const nested = await page.evaluate(() => document.querySelectorAll('button button').length);
check('sem botão aninhado', nested === 0, `${nested}`);

// alvos pequenos demais
const small = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll('button, select, a[href], input:not([type=hidden])').forEach(el => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width === 0 || cs.pointerEvents === 'none' || el.classList.contains('sr-only')) return;
    if (r.width < 28 || r.height < 28) bad.push((el.className||el.tagName) + ` ${Math.round(r.width)}×${Math.round(r.height)}`);
  });
  return [...new Set(bad)].slice(0,8);
});
check('alvos ≥ 28×28', small.length === 0, small.join(' | ') || 'ok');

// rolagem horizontal em 390px
await page.setViewportSize({ width:390, height:800 });
await page.waitForTimeout(300);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
check('sem rolagem horizontal em 390px', overflow <= 0, `overflow ${overflow}px`);

console.log(ok.join('\n'));
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await browser.close(); servidor?.close();
