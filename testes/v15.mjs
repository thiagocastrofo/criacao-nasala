// "Contas e pessoas": ligar conta nova a pessoa que já existe no time.
import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const servidor = await garantir();
const FALSO = readFileSync(fileURLToPath(new URL('./firebase-falso.js', import.meta.url)), 'utf8');

const b = await chromium.launch();
const ctx = await b.newContext({colorScheme:'dark', viewport:{width:1280, height:940}});
await ctx.addInitScript(FALSO);
const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error' && !/gstatic|net::/i.test(m.text())) errs.push(m.text()); });
const ok = []; const check = (n,c,x='') => ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

const cadastrar = async (nome, mail) => {
  await p.locator('#authSwitchBtn').click(); await p.waitForTimeout(250);
  await p.fill('#authName', nome); await p.fill('#authEmail', mail);
  await p.fill('#authPass', 'SenhaForte123'); await p.fill('#authPass2', 'SenhaForte123');
  await p.click('#authSubmit'); await p.waitForTimeout(1600);
};
const entrar = async (mail) => {
  await p.fill('#authEmail', mail); await p.fill('#authPass', 'SenhaForte123');
  await p.click('#authSubmit'); await p.waitForTimeout(1600);
};
const sair = async () => {
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  await p.locator('#moreMenu').getByText('Sair da conta').click(); await p.waitForTimeout(1200);
};
const abrirVinculos = async () => {
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  await p.locator('#moreMenu').getByText('Contas e pessoas').click(); await p.waitForTimeout(700);
};

let quebrou = null;
try {
  await p.goto(`${BASE}/index.html`); await p.waitForTimeout(1200);

  // ── a tela de entrada não traz mais o aviso sobre as regras ──
  check('aviso sobre as regras saiu da tela de entrada',
        !/regras do Firebase/i.test(await p.locator('#authScreen').innerText()));

  await cadastrar('Thiago', 'thiago@nasala.com.br');
  check('admin entrou', await p.locator('#appShell').isVisible());

  // ── conta nova com nome que NÃO bate com o time ──
  await sair();
  await cadastrar('Vitinho', 'vitao@nasala.com.br');   // no time é "Vitão"
  check('nome que não bate cai na fila', await p.locator('#waitScreen').isVisible());
  await p.locator('#waitScreen .btn-block').click(); await p.waitForTimeout(700);

  await entrar('thiago@nasala.com.br');
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  await p.locator('#btnAccess').click(); await p.waitForTimeout(600);
  await p.locator('.acc-row').filter({hasText:'vitao@'}).getByText('Liberar').click();
  await p.waitForTimeout(800);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);

  // ── o painel avisa que o vínculo está solto ──
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  check('menu avisa que há vínculo solto',
        (await p.locator('#linkCount').innerText()).trim() === '1');
  await p.locator('#moreMenu').getByText('Contas e pessoas').click(); await p.waitForTimeout(700);
  check('painel abre', await p.locator('#linkOverlay').isVisible());
  const solta = p.locator('.lk-row.is-solta');
  check('a conta do Vitinho aparece marcada', await solta.count() === 1,
        (await solta.innerText()).replace(/\n/g, ' · '));
  // Duas redações possíveis: "não está no time" quando o vínculo ficou solto,
  // e "não tem nenhuma demanda" quando a aprovação criou a pessoa duplicada —
  // que é o caso comum, e o que este painel existe para desfazer.
  check('e a nota diz o motivo',
        /não está no time|não tem nenhuma demanda/.test(await solta.locator('.lk-nota').innerText()),
        (await solta.locator('.lk-nota').innerText()).slice(0, 60));
  check('"Vitão" aparece entre quem ainda não tem conta',
        /Vitão/.test(await p.locator('.lk-chips').innerText()));

  // ── ligar a conta à pessoa certa ──
  const antes = await p.evaluate(() => {
    const u = Object.values(window.__fake.ler('demandas/users'))
      .find(x => x.email === 'vitao@nasala.com.br');
    return u.memberName;
  });
  await solta.locator('select').selectOption('Vitão'); await p.waitForTimeout(900);
  const depois = await p.evaluate(() => {
    const u = Object.values(window.__fake.ler('demandas/users'))
      .find(x => x.email === 'vitao@nasala.com.br');
    return u.memberName;
  });
  check('vínculo gravado no perfil', depois === 'Vitão', `${antes} → ${depois}`);
  check('some a marcação de solto', await p.locator('.lk-row.is-solta').count() === 0);
  check('e "Vitão" sai da lista de quem não tem conta',
        !/Vitão/.test(await p.locator('.lk-chips').innerText()));
  check('a pessoa duplicada e vazia saiu do time',
        await p.evaluate(() => !(window.__fake.ler('demandas/team') || [])
          .some(m => m && m.name === 'Vitinho')));
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  check('contador do menu zera', await p.locator('#linkCount').isHidden());
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);

  // ── o que isso resolve: agora ela vê as demandas dela ──
  await sair();
  await entrar('vitao@nasala.com.br');
  check('Vitinho entra', await p.locator('#appShell').isVisible());
  const minhas = await p.evaluate(() => {
    const el = [...document.querySelectorAll('#respPills .fp')].find(e => /Vitão/.test(e.innerText));
    if (el) el.click();
    return true;
  });
  await p.waitForTimeout(700);
  check('e as demandas do Vitão são editáveis por ela',
        await p.locator('.card .act').count() > 0,
        `${await p.locator('.card').count()} cards`);

  // ── só administrador vê o painel ──
  await p.locator('#btnAccount').click(); await p.waitForTimeout(250);
  const itens = await p.evaluate(() => [...document.querySelectorAll('#moreMenu button')]
    .filter(x => x.offsetParent !== null).map(x => x.innerText.trim()));
  check('não-admin não vê "Contas e pessoas"',
        !itens.some(t => /Contas e pessoas/.test(t)), itens.join(' · '));

} catch (e) { quebrou = e; }

console.log(ok.join('\n'));
if (quebrou) console.log('\nQUEBROU: ' + String(quebrou).split('\n')[0]);
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
