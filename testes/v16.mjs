// Trocar a cor de alguém, com o time no formato que o banco devolve.
//
// O Firebase não guarda `null`: some com a chave. Quem lê de volta recebe o
// membro SEM `svg`, e `m.svg` vira `undefined` — que é justamente o que o
// Firebase recusa ao gravar, lançando de forma síncrona. Era isso que fazia a
// cor mudar na tela e voltar ao recarregar.
import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const servidor = await garantir();
const FALSO = readFileSync(fileURLToPath(new URL('./firebase-falso.js', import.meta.url)), 'utf8');

// Exatamente como o banco de produção devolve: sem svg, sem startDate, sem role.
const TIME_DO_BANCO = [
  {name: 'Luiza',  color: '#6AB04C'},
  {name: 'Vitão',  color: '#FF9F43'},
  {name: 'Thiago', color: '#00d0ff'},
  {name: 'Marcela', color: '#aa00ff'},
  {name: 'Marcelo', color: '#bababa', hidden: true},
];

const b = await chromium.launch();
const ctx = await b.newContext({colorScheme:'dark', viewport:{width:1280, height:940}});
await ctx.addInitScript(FALSO);
await ctx.addInitScript(t => {
  window.__fake.gravar('demandas/team', t);
  window.__fake.gravar('demandas/appTitle', 'Gestão de Demandas');
  const uid = window.__fake.criarConta('thiago@nasala.com.br', 'SenhaForte123', 'Thiago');
  window.__fake.gravar('demandas/users/' + uid, {uid, name:'Thiago', email:'thiago@nasala.com.br',
    admin:true, memberName:'Thiago', createdAt:'2026-09-22T23:57:24Z', status:'ativo'});
}, TIME_DO_BANCO);

const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error' && !/gstatic|net::/i.test(m.text())) errs.push(m.text()); });
const ok = []; const check = (n,c,x='') => ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);
const corNoBanco = q => p.evaluate(n => (window.__fake.ler('demandas/team') || [])
  .find(m => m && m.name === n)?.color, q);

let quebrou = null;
try {
  await p.goto(`${BASE}/index.html`); await p.waitForTimeout(1200);
  await p.fill('#authEmail','thiago@nasala.com.br'); await p.fill('#authPass','SenhaForte123');
  await p.click('#authSubmit'); await p.waitForTimeout(2300);
  check('entrou no quadro', await p.locator('#appShell').isVisible());
  // O cenário (time sem `svg`) é montado no addInitScript acima. O que
  // interessa verificar é o desfecho: o app grava sem estourar. Isso está nas
  // checagens de cor abaixo e na de `svg === null` no fim.

  const abrirPerfis = async () => {
    await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
    await p.locator('#moreMenu').getByText('Perfis do time').click(); await p.waitForTimeout(700);
  };
  const cartaoDe = async nome => {
    const i = await p.evaluate(q => [...document.querySelectorAll('.profile')]
      .findIndex(c => c.querySelector('.profile-name')?.innerText.trim() === q), nome);
    return p.locator('.profile').nth(i);
  };

  // ── cor da paleta ──
  await abrirPerfis();
  await (await cartaoDe('Luiza')).locator('.av-edit-btn').click(); await p.waitForTimeout(600);
  // Um swatch que NÃO seja a cor atual dela, senão o teste não prova nada.
  await p.locator('#colorSwatches .swatch').nth(6).click(); await p.waitForTimeout(250);
  const escolhida = await p.evaluate(() => document.getElementById('avPreviewLg').style.background);
  await p.locator('#avOverlay').getByText('Salvar',{exact:false}).first().click(); await p.waitForTimeout(900);
  check('cor da paleta gravou no banco', (await corNoBanco('Luiza')) !== '#6AB04C',
        `#6AB04C → ${await corNoBanco('Luiza')}`);
  check('e não houve erro de página', errs.length === 0, errs[0] || '');

  // ── cor personalizada, pelo campo hex ──
  await (await cartaoDe('Vitão')).locator('.av-edit-btn').click(); await p.waitForTimeout(600);
  check('o campo mostra o hex atual',
        (await p.locator('#hexInput').inputValue()).toLowerCase() === '#ff9f43',
        await p.locator('#hexInput').inputValue());
  await p.fill('#hexInput', '#12B886'); await p.waitForTimeout(300);
  check('prévia acompanha o hex digitado',
        (await p.evaluate(() => document.getElementById('avPreviewLg').style.background)) === 'rgb(18, 184, 134)');
  await p.locator('#avOverlay').getByText('Salvar',{exact:false}).first().click(); await p.waitForTimeout(900);
  check('cor personalizada gravou no banco',
        (await corNoBanco('Vitão')).toLowerCase() === '#12b886', await corNoBanco('Vitão'));

  // ── hex inválido não estraga nada ──
  await (await cartaoDe('Marcela')).locator('.av-edit-btn').click(); await p.waitForTimeout(600);
  const antesMarcela = await corNoBanco('Marcela');
  await p.fill('#hexInput', 'nada disso'); await p.waitForTimeout(300);
  check('hex inválido é marcado', await p.locator('#hexInput.is-bad').count() === 1);
  await p.locator('#avOverlay').getByText('Salvar',{exact:false}).first().click(); await p.waitForTimeout(800);
  check('e não grava lixo', (await corNoBanco('Marcela')) === antesMarcela, await corNoBanco('Marcela'));

  // ── pessoa oculta também ──
  await (await cartaoDe('Marcelo')).locator('.av-edit-btn').click(); await p.waitForTimeout(600);
  await p.fill('#hexInput', '#FF5470'); await p.waitForTimeout(250);
  await p.locator('#avOverlay').getByText('Salvar',{exact:false}).first().click(); await p.waitForTimeout(900);
  check('pessoa oculta também tem a cor gravada',
        (await corNoBanco('Marcelo')).toLowerCase() === '#ff5470', await corNoBanco('Marcelo'));

  // ── o campo que faltava: svg preenchido como null na leitura ──
  check('svg passou a ser null, não undefined',
        await p.evaluate(() => (window.__fake.ler('demandas/team')||[]).every(m => m.svg === null)));
  check('nenhum erro de página em todo o caminho', errs.length === 0, errs.join(' | '));

} catch (e) { quebrou = e; }

console.log(ok.join('\n'));
if (quebrou) console.log('\nQUEBROU: ' + String(quebrou).split('\n')[0]);
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
