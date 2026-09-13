import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const browser = await chromium.launch();
for (const scheme of ['dark','light']) {
  const ctx = await browser.newContext({ colorScheme:scheme, viewport:{width:1280,height:1400} });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/index.html`, { waitUntil:'domcontentloaded' });
  await page.waitForTimeout(900);
  await page.fill('#authEmail','thiago@nasala.com.br');
  await page.fill('#authPass','Thiago@290692');
  await page.click('#authSubmit');
  await page.waitForTimeout(2200);
  const painéis = ['.topbar .btn:has-text("Perfis")', '.topbar .btn:has-text("Carga")'];
  if (process.env.PANEL) {
    await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
    await page.locator('#moreMenu button:has-text("Perfis do time")').click();
    await page.waitForTimeout(600);
  }
  const bad = await page.evaluate(() => {
    const lin = c => { c/=255; return c<=0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4; };
    const L = ([r,g,b]) => 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
    const cr = (a,b) => { const [x,y]=[L(a),L(b)].sort((m,n)=>n-m); return (x+0.05)/(y+0.05); };
    const parse = s => (s.match(/[\d.]+/g)||[]).map(Number);
    const comp = (fg,bg) => fg.length===4 && fg[3]<1
      ? [0,1,2].map(i => Math.round(fg[i]*fg[3] + bg[i]*(1-fg[3]))) : fg.slice(0,3);
    function bgOf(el){
      let n = el;
      while (n && n !== document.documentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c.length === 3 || (c[3] ?? 1) > 0.92) return c.slice(0,3);
        if (c.length === 4 && c[3] > 0) {
          const under = bgOf(n.parentElement || document.body);
          return [0,1,2].map(i => Math.round(c[i]*c[3] + under[i]*(1-c[3])));
        }
        n = n.parentElement;
      }
      return parse(getComputedStyle(document.body).backgroundColor).slice(0,3);
    }
    const out = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('[hidden]') || el.classList.contains('sr-only')) return;
      const text = [...el.childNodes].filter(n => n.nodeType===3 && n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');
      if (!text) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.opacity === '0') return;
      const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight) || 400;
      const need = (size >= 24 || (size >= 18.66 && weight >= 700)) ? 3 : 4.5;
      const own = parse(cs.backgroundColor);
      const bg = (own.length === 3 || (own[3] ?? 1) > 0.92)
        ? own.slice(0,3) : bgOf(el.parentElement || document.body);
      const fg = comp(parse(cs.color), bg);
      const ratio = cr(fg, bg);
      if (ratio < need) out.push(`${(el.className||el.tagName).toString().slice(0,26)} "${text.slice(0,28)}" ${size}px/${weight} → ${ratio.toFixed(2)}:1 (precisa ${need})`);
    });
    return [...new Set(out)];
  });
  console.log(`\n=== ${scheme.toUpperCase()} ===`);
  console.log(bad.length ? bad.slice(0,20).join('\n') : 'todos os pares de texto passam');
  await ctx.close();
}
await browser.close(); servidor?.close();
