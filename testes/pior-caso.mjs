// O fundo é um gradiente: o card translúcido compõe sobre luminâncias
// diferentes conforme a posição. Este teste força o pior caso — o ponto mais
// claro do gradiente no escuro, o mais escuro no claro — e confere o contraste.
import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
for (const [scheme, pior] of [['dark','#2C2C34'], ['light','#D5DCE8']]) {
  const ctx = await b.newContext({ colorScheme: scheme, viewport:{width:1280,height:1000} });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/index.html`); await page.waitForTimeout(800);
  await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
  await page.click('#authSubmit'); await page.waitForTimeout(2300);
  await page.addStyleTag({ content: `body::before{background:${pior}!important} body{background:${pior}!important}` });
  await page.waitForTimeout(300);
  const bad = await page.evaluate(() => {
    const lin=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4};
    const L=([r,g,b])=>0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
    const cr=(a,b)=>{const[x,y]=[L(a),L(b)].sort((m,n)=>n-m);return (x+0.05)/(y+0.05)};
    const parse=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    const comp=(fg,bg)=>fg.length===4&&fg[3]<1?[0,1,2].map(i=>Math.round(fg[i]*fg[3]+bg[i]*(1-fg[3]))):fg.slice(0,3);
    function bgOf(el){let n=el;while(n&&n!==document.documentElement){const c=parse(getComputedStyle(n).backgroundColor);
      if(c.length===3||(c[3]??1)>0.92)return c.slice(0,3);
      if(c.length===4&&c[3]>0){const u=bgOf(n.parentElement||document.body);return[0,1,2].map(i=>Math.round(c[i]*c[3]+u[i]*(1-c[3])));}
      n=n.parentElement;} return parse(getComputedStyle(document.body).backgroundColor).slice(0,3);}
    const out=[];
    document.querySelectorAll('.card *, .dock *, .card, .dock').forEach(el=>{
      const t=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');
      if(!t)return; const cs=getComputedStyle(el);
      if(cs.visibility==='hidden'||cs.opacity==='0'||el.closest('[hidden]'))return;
      const size=parseFloat(cs.fontSize),w=parseInt(cs.fontWeight)||400;
      const need=(size>=24||(size>=18.66&&w>=700))?3:4.5;
      const own=parse(cs.backgroundColor);
      const bg=(own.length===3||(own[3]??1)>0.92)?own.slice(0,3):bgOf(el.parentElement||document.body);
      const r=cr(comp(parse(cs.color),bg),bg);
      if(r<need)out.push(`${(el.className||el.tagName).toString().slice(0,24)} "${t.slice(0,26)}" ${size}px → ${r.toFixed(2)}:1`);
    });
    return [...new Set(out)];
  });
  console.log(`${scheme} sobre ${pior}: ${bad.length ? '\n  ' + bad.slice(0,8).join('\n  ') : 'passa'}`);
  await ctx.close();
}
await b.close(); servidor?.close();
