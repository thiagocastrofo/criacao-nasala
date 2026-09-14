// Barreira de acesso: cadastrar não dá acesso; um administrador libera.
import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();

const b = await chromium.launch();
const ctx = await b.newContext({colorScheme:'dark', viewport:{width:1280, height:940}});
const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error' && !/gstatic|firebase|net::/i.test(m.text())) errs.push(m.text()); });
const ok = []; const check = (n,c,x='') => ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

const entrar = async (mail, senha) => {
  await p.fill('#authEmail', mail); await p.fill('#authPass', senha);
  await p.click('#authSubmit'); await p.waitForTimeout(2200);
};
const menu = async () => { await p.locator('#btnAccount').click(); await p.waitForTimeout(250); };

await p.goto(`${BASE}/index.html`); await p.waitForTimeout(800);

// ── 1. cadastro novo cai na sala de espera, não no quadro ──
await p.locator('#authSwitchBtn').click(); await p.waitForTimeout(300);
await p.fill('#authName', 'Fulano Teste');
await p.fill('#authEmail', 'fulano@nasala.com.br');
await p.fill('#authPass', 'SenhaForte123');
await p.fill('#authPass2', 'SenhaForte123');
await p.click('#authSubmit'); await p.waitForTimeout(2500);

check('cadastro não entra no quadro', await p.locator('#appShell').isHidden());
check('cai na sala de espera', await p.locator('#waitScreen').isVisible());
check('a sala de espera identifica a pessoa',
      (await p.locator('#waitName').innerText()).includes('Fulano'),
      await p.locator('#waitMail').innerText());
check('nenhuma demanda foi carregada na tela', await p.locator('.card').count() === 0);

// ── 2. pendente não entra no time (filtros / dashboard) ──
const noTime = await p.evaluate(() => window.__t ? 0 : null);
await p.evaluate(() => localStorage.getItem('demandas-data'));
const dados = await p.evaluate(() => JSON.parse(localStorage.getItem('demandas-data') || '{}'));
check('pendente NÃO entra no time', !(dados.team || []).some(m => /Fulano/.test(m.name)),
      `${(dados.team || []).length} pessoas no time`);
check('conta gravada como pendente',
      Object.values(dados.users || {}).some(u => u.email === 'fulano@nasala.com.br' && u.status === 'pendente'));

// ── 3. sair e voltar continua na espera ──
await p.locator('#waitScreen .btn-block').click(); await p.waitForTimeout(600);
check('sair da espera volta para a entrada', await p.locator('#authScreen').isVisible());
await entrar('fulano@nasala.com.br', 'SenhaForte123');
check('login de pendente volta para a espera', await p.locator('#waitScreen').isVisible());
await p.locator('#waitScreen .btn-block').click(); await p.waitForTimeout(600);

// ── 4. admin vê o pedido ──
await entrar('thiago@nasala.com.br', 'Thiago@290692');
check('admin entra normalmente', await p.locator('#appShell').isVisible());
check('botão da conta avisa que tem pedido',
      await p.locator('#btnAccount.has-badge').count() === 1);
await menu();
check('contador no menu mostra 1', (await p.locator('#accessCount').innerText()).trim() === '1');
await p.locator('#btnAccess').click(); await p.waitForTimeout(600);
check('painel lista o pedido', (await p.locator('#accessBody').innerText()).includes('fulano@nasala.com.br'));

// ── 5. liberar ──
await p.locator('.acc-sec').first().locator('.btn-primary').click(); await p.waitForTimeout(800);
check('contador zera depois de liberar', await p.locator('#btnAccount.has-badge').count() === 0);
const depois = await p.evaluate(() => JSON.parse(localStorage.getItem('demandas-data') || '{}'));
check('conta virou ativa',
      Object.values(depois.users || {}).some(u => u.email === 'fulano@nasala.com.br' && u.status === 'ativo'));
check('agora sim entrou no time', (depois.team || []).some(m => /Fulano/.test(m.name)));
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
await menu(); await p.locator('#moreMenu').getByText('Sair da conta').click(); await p.waitForTimeout(800);

// ── 6. liberado entra de verdade ──
await entrar('fulano@nasala.com.br', 'SenhaForte123');
check('liberado entra no quadro', await p.locator('#appShell').isVisible());
check('e vê as demandas', await p.locator('.card').count() > 0,
      `${await p.locator('.card').count()} cards`);
check('mas não é admin', await p.locator('#btnAccount.has-badge').count() === 0);
await menu();
const itens = await p.evaluate(() => [...document.querySelectorAll('#moreMenu button')]
  .filter(x => x.offsetParent !== null).map(x => x.innerText.trim()));
check('não-admin não vê "Liberar acesso"', !itens.some(t => /Liberar acesso/.test(t)), itens.join(' · '));
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
await menu(); await p.locator('#moreMenu').getByText('Sair da conta').click(); await p.waitForTimeout(800);

// ── 7. suspender tira o acesso ──
await entrar('thiago@nasala.com.br', 'Thiago@290692');
await menu(); await p.locator('#btnAccess').click(); await p.waitForTimeout(600);
const linhaFulano = p.locator('.acc-row').filter({hasText: 'fulano@nasala.com.br'});
await linhaFulano.getByText('Suspender').click(); await p.waitForTimeout(800);
check('suspenso sai da lista de acesso',
      (await p.locator('.acc-sec').nth(1).innerText()).includes('fulano') === false);
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
await menu(); await p.locator('#moreMenu').getByText('Sair da conta').click(); await p.waitForTimeout(800);
await entrar('fulano@nasala.com.br', 'SenhaForte123');
check('suspenso não entra mais', await p.locator('#appShell').isHidden());
check('e recebe o motivo', (await p.locator('#authError').innerText()).length > 10,
      await p.locator('#authError').innerText());

// ── 8. admin não pode se trancar para fora ──
await entrar('thiago@nasala.com.br', 'Thiago@290692');
await menu(); await p.locator('#btnAccess').click(); await p.waitForTimeout(600);
const minhaLinha = p.locator('.acc-row').filter({hasText: 'thiago@nasala.com.br'});
check('admin não tem botão de suspender a si mesmo',
      await minhaLinha.getByText('Suspender').count() === 0,
      await minhaLinha.locator('.acc-tag').innerText().catch(() => '?'));

console.log(ok.join('\n'));
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
