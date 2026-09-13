import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({colorScheme:'dark',viewport:{width:1280,height:940}});
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);
await p.goto(`${BASE}/index.html`); await p.waitForTimeout(800);
await p.fill('#authEmail','thiago@nasala.com.br'); await p.fill('#authPass','Thiago@290692');
await p.click('#authSubmit'); await p.waitForTimeout(2300);

const pills = () => p.evaluate(()=>[...document.querySelectorAll('#respPills .fp')].map(e=>e.innerText.trim()));
const abrirPerfis = async () => {
  if (await p.locator('#profilesOverlay:not([hidden])').count()) return;
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  await p.locator('#moreMenu').getByText('Perfis do time', {exact:false}).click();
  await p.waitForTimeout(600);
};

const antes = await pills();
const alvo = antes[1];                       // segunda pessoa da gaveta
const demandasAntes = await p.locator('.card').count();

await abrirPerfis();
check('perfis mostram o botão de ocultar', await p.locator('.profile-eye').count() === antes.length,
      `${await p.locator('.profile-eye').count()} botões · ${antes.length} pessoas`);

// oculta a pessoa cujo cartão tem esse nome
const idx = await p.evaluate(n => [...document.querySelectorAll('.profile')]
  .findIndex(c => c.querySelector('.profile-name').innerText.split(' ')[0] === n), alvo);
await p.locator('.profile').nth(idx).locator('.profile-eye').click();
await p.waitForTimeout(700);

check('cartão fica marcado como oculto', await p.locator('.profile.is-hidden').count() === 1);
check('etiqueta diz "oculto"', (await p.locator('.profile-tag.is-off').innerText()).trim() === 'oculto');
check('cartão oculto vai para o fim da grade',
      await p.evaluate(()=>document.querySelector('.profile:last-child').classList.contains('is-hidden')));

await p.locator('#profilesOverlay .modal-x, #profilesOverlay [onclick*="closeProfiles"]').first().click();
await p.waitForTimeout(500);

const depois = await pills();
check('pessoa oculta some da gaveta de time', !depois.includes(alvo) && depois.length === antes.length - 1,
      `${antes.length} → ${depois.length} pills`);
check('NENHUMA demanda foi apagada', await p.locator('.card').count() === demandasAntes,
      `${demandasAntes} → ${await p.locator('.card').count()}`);
check('demandas da pessoa continuam visíveis',
      await p.evaluate(n => [...document.querySelectorAll('.card')].some(c => c.innerText.includes(n)), alvo));

// dashboard: sem linha de carga para quem está oculto
await p.locator('[aria-label="Abrir o dashboard"]').click(); await p.waitForTimeout(900);
const nomesCarga = await p.evaluate(()=>[...document.querySelectorAll('.load-name')].map(e=>e.innerText.trim()));
check('carga por pessoa ignora quem está oculto', !nomesCarga.includes(alvo), nomesCarga.join(' '));
await p.keyboard.press('Escape'); await p.waitForTimeout(500);

// seletor de responsáveis de uma demanda nova
await p.locator('.btn-primary', {hasText:'Nova'}).first().click(); await p.waitForTimeout(600);
await p.locator('#multiWrap').click(); await p.waitForTimeout(300);
const opcoes = await p.evaluate(()=>[...document.querySelectorAll('#multiDrop .mopt')].map(e=>e.innerText.trim()));
check('oculto não aparece para receber demanda nova', !opcoes.some(o=>o.startsWith(alvo)),
      `${opcoes.length} opções`);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);

// editar uma demanda ANTIGA da pessoa oculta não pode perder a responsável
const i2 = await p.evaluate(n => [...document.querySelectorAll('.card')]
  .findIndex(c => c.innerText.includes(n)), alvo);
await p.locator('.card').nth(i2).hover(); await p.waitForTimeout(200);
await p.locator('.card').nth(i2).locator('[onclick^="openModal"]').first().click();
await p.waitForTimeout(600);
const chips = await p.evaluate(()=>[...document.querySelectorAll('#multiWrap .chip')].map(e=>e.innerText.trim()));
check('demanda antiga mantém a responsável oculta', chips.some(c=>c.startsWith(alvo)), chips.join(' · '));
await p.locator('#multiWrap').click(); await p.waitForTimeout(300);
const op2 = await p.evaluate(()=>[...document.querySelectorAll('#multiDrop .mopt')].map(e=>e.innerText.trim()));
check('e ela segue no seletor desta demanda, para não sumir sem querer',
      op2.some(o=>o.startsWith(alvo)), `${op2.length} opções`);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);

// desfaz
await abrirPerfis();
await p.locator('.profile.is-hidden .profile-eye').click(); await p.waitForTimeout(700);
check('dá para reexibir', await p.locator('.profile.is-hidden').count() === 0);
await p.locator('#profilesOverlay .modal-x, #profilesOverlay [onclick*="closeProfiles"]').first().click();
await p.waitForTimeout(500);
check('pessoa volta para a gaveta', (await pills()).includes(alvo));

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
