// Migração para Firebase Auth, exercitada contra o Firebase falso.
// Ver testes/firebase-falso.js: este ambiente bloqueia o gstatic.com, então o
// SDK de verdade nunca carrega. O falso tem a mesma superfície que o app usa.
import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const servidor = await garantir();

const FALSO = readFileSync(fileURLToPath(new URL('./firebase-falso.js', import.meta.url)), 'utf8');

const b = await chromium.launch();
const ctx = await b.newContext({colorScheme:'dark', viewport:{width:1280, height:940}});
await ctx.addInitScript(FALSO);          // entra antes do app.js
const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error' && !/gstatic|net::/i.test(m.text())) errs.push(m.text()); });
const ok = []; const check = (n,c,x='') => ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

const cadastrar = async (nome, mail, senha) => {
  await p.locator('#authSwitchBtn').click(); await p.waitForTimeout(250);
  await p.fill('#authName', nome); await p.fill('#authEmail', mail);
  await p.fill('#authPass', senha); await p.fill('#authPass2', senha);
  await p.click('#authSubmit'); await p.waitForTimeout(1600);
};
const entrar = async (mail, senha) => {
  await p.fill('#authEmail', mail); await p.fill('#authPass', senha);
  await p.click('#authSubmit'); await p.waitForTimeout(1600);
};
const sair = async () => {
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  await p.locator('#moreMenu').getByText('Sair da conta').click(); await p.waitForTimeout(1200);
};

// Relata o que já passou mesmo se quebrar no meio — sem isso, um timeout
// esconde todas as checagens anteriores.
let quebrou = null;
try {
  await p.goto(`${BASE}/index.html`); await p.waitForTimeout(1200);

  // ── 1. o Firebase falso foi mesmo usado, não a rede ──
  check('app usou o Firebase injetado', await p.evaluate(() => !!window.__fake));
  check('tela de entrada aparece sem sessão', await p.locator('#authScreen').isVisible());

  // ── 2. a primeira conta monta o quadro: entra liberada e administradora ──
  await cadastrar('Thiago', 'thiago@nasala.com.br', 'SenhaForte123');
  check('primeira conta entra direto', await p.locator('#appShell').isVisible());
  const eu = await p.evaluate(() => window.__fake.ler('demandas/users'));
  const meu = Object.values(eu || {})[0] || {};
  check('primeira conta é administradora', meu.admin === true, JSON.stringify(meu.status));
  check('primeira conta já liberada', meu.status === 'ativo');
  check('credencial ficou no Firebase, não no banco',
        await p.evaluate(() => {
          const u = Object.values(window.__fake.ler('demandas/users') || {})[0] || {};
          return !u.hash && !u.salt;
        }));
  check('banco recebeu a semente', (await p.evaluate(() =>
    Object.keys(window.__fake.ler('demandas/tasks') || {}).length)) > 800);

  // ── 3. segunda conta cai na fila ──
  await sair();
  check('sair volta para a entrada', await p.locator('#authScreen').isVisible());
  await cadastrar('Fulano Teste', 'fulano@nasala.com.br', 'SenhaForte123');
  check('segunda conta NÃO entra no quadro', await p.locator('#appShell').isHidden());
  check('segunda conta espera liberação', await p.locator('#waitScreen').isVisible());

  // ── 4. senha errada ──
  await p.locator('#waitScreen .btn-block').click(); await p.waitForTimeout(800);
  await entrar('fulano@nasala.com.br', 'SenhaErrada999');
  check('senha errada é recusada pelo Firebase',
        /não conferem/i.test(await p.locator('#authError').innerText()),
        await p.locator('#authError').innerText());

  // ── 5. admin libera, e quem esperava entra SOZINHO, sem recarregar ──
  await entrar('thiago@nasala.com.br', 'SenhaForte123');
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  check('admin vê o pedido no contador', (await p.locator('#accessCount').innerText()).trim() === '1');
  await p.locator('#btnAccess').click(); await p.waitForTimeout(600);
  await p.locator('.acc-row').filter({hasText:'fulano@'}).getByText('Liberar').click();
  await p.waitForTimeout(900);
  const perfis = await p.evaluate(() => window.__fake.ler('demandas/users'));
  const fulano = Object.values(perfis).find(u => u.email === 'fulano@nasala.com.br');
  check('liberação gravou no perfil dela', fulano.status === 'ativo', fulano.status);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);

  // a pessoa liberada entra sem passar pela tela de entrada de novo
  await sair();
  await entrar('fulano@nasala.com.br', 'SenhaForte123');
  check('liberada entra no quadro', await p.locator('#appShell').isVisible());
  check('e vê as demandas', await p.locator('.card').count() > 0);
  check('mas não é administradora', await p.evaluate(() =>
    !document.documentElement.classList.contains('is-admin')));

  // ── 6. suspender expulsa na hora, sem recarregar a página ──
  await sair();
  await entrar('thiago@nasala.com.br', 'SenhaForte123');
  await p.evaluate(() => {
    const u = Object.entries(window.__fake.ler('demandas/users'))
      .find(([, v]) => v.email === 'fulano@nasala.com.br');
    window.__fake.gravar(`demandas/users/${u[0]}/status`, 'recusado');
  });
  await p.waitForTimeout(600);
  check('suspender alguém não derruba quem está logado', await p.locator('#appShell').isVisible());

} catch (e) { quebrou = e; }

console.log(ok.join('\n'));
if (quebrou) console.log('\nQUEBROU: ' + String(quebrou).split('\n')[0]);
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
