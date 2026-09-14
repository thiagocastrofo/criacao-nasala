import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({ colorScheme:'dark', viewport:{width:1280,height:900} });
const page = await ctx.newPage();
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&!/gstatic|firebase|net::/i.test(m.text()))errs.push(m.text())});
// Cadastrar não dá mais acesso: a conta nasce pendente. Para seguir testando o
// que esta suíte testa de verdade — o que um não-admin pode —, o admin precisa
// liberar a conta antes.
async function liberarComoAdmin(page, mail) {
  await page.evaluate(() => window.signOut()); await page.waitForTimeout(500);
  await page.fill('#authEmail','thiago@nasala.com.br'); await page.fill('#authPass','Thiago@290692');
  await page.click('#authSubmit'); await page.waitForTimeout(2200);
  await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
  await page.locator('#btnAccess').click(); await page.waitForTimeout(600);
  await page.locator('.acc-row').filter({hasText: mail}).getByText('Liberar').click();
  await page.waitForTimeout(700);
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  await page.evaluate(() => window.signOut()); await page.waitForTimeout(500);
}

const ok=[]; const check=(n,c,x='')=>ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);
const login=async(e,p)=>{await page.fill('#authEmail',e);await page.fill('#authPass',p);await page.click('#authSubmit');await page.waitForTimeout(2300)};

await page.goto(`${BASE}/index.html`); await page.waitForTimeout(800);
await login('thiago@nasala.com.br','Thiago@290692');

// conta visível na barra sem clicar
const conta = await page.locator('#btnAccount').innerText();
check('nome na barra, sem clicar', /Thiago/.test(conta), conta.replace(/\n/g,' '));
check('avatar na barra', await page.locator('#btnAccount .av').count() === 1);

// trilho vira filtro
const chips = await page.locator('#stateChips .stat').count();
check('fichas de status', chips === 4, `${chips} (3 status + atrasadas)`);
const antes = await page.locator('.card').count();
await page.locator('.stat.is-danger').click(); await page.waitForTimeout(500);
const soAtrasadas = await page.locator('.card.is-late').count();
const total = await page.locator('.card').count();
check('clicar em Atrasadas filtra', total > 0 && total === soAtrasadas, `${antes} → ${total}, todas atrasadas`);
await page.locator('.stat.is-danger').click(); await page.waitForTimeout(400);
check('clicar de novo limpa', await page.locator('.card').count() === antes);
await page.locator('#stateChips .stat').first().click(); await page.waitForTimeout(500);
check('ficha de status também filtra', await page.locator('.stat.is-on').count() === 1);
await page.locator('#stateChips .stat').first().click(); await page.waitForTimeout(400);

// números respeitam o escopo
const totalGeral = await page.locator('#stateChips .stat').first().innerText();
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Luiza")').click(); await page.waitForTimeout(500);
const totalLuiza = await page.locator('#stateChips .stat').first().innerText();
check('números seguem o filtro de pessoa', totalGeral !== totalLuiza, `${totalGeral.replace(/\n/g,' ')} → ${totalLuiza.replace(/\n/g,' ')}`);
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Luiza")').click(); await page.waitForTimeout(400);

// meu perfil
await page.locator('#btnAccount').click(); await page.waitForTimeout(300);
check('menu mostra nome e e-mail', /thiago@nasala/.test(await page.locator('#menuUser').innerText()));
await page.locator('#moreMenu button:has-text("Meu perfil")').click(); await page.waitForTimeout(600);
check('Meu perfil abre', !(await page.locator('#meOverlay').isHidden()));
check('mostra minhas demandas em aberto', await page.locator('.me-open').count() === 1,
      (await page.locator('.me-open h4').innerText()));
check('perfil tem o botão de sair', await page.locator('.me-actions .btn').count() === 1);
await page.keyboard.press('Escape'); await page.waitForTimeout(300);

// admin vê Perfis do time; não-admin não
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
check('admin vê Perfis do time', await page.locator('#moreMenu button:has-text("Perfis do time"):visible').count() === 1);
await page.keyboard.press('Escape');

await page.evaluate(()=>window.signOut(true)); await page.waitForTimeout(400);
await page.click('#authSwitchBtn');
await page.fill('#authName','Gabs'); await page.fill('#authEmail','gabs@nasala.com.br');
await page.fill('#authPass','SenhaForte123'); await page.fill('#authPass2','SenhaForte123');
await page.click('#authSubmit'); await page.waitForTimeout(2300);
check('cadastro fica esperando liberação', await page.locator('#waitScreen').isVisible());
await liberarComoAdmin(page, 'gabs@nasala.com.br');
await page.fill('#authEmail','gabs@nasala.com.br'); await page.fill('#authPass','SenhaForte123');
await page.click('#authSubmit'); await page.waitForTimeout(2300);

await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
check('não-admin NÃO vê Perfis do time', await page.locator('#moreMenu button:has-text("Perfis do time"):visible').count() === 0);
check('não-admin vê Meu perfil', await page.locator('#moreMenu button:has-text("Meu perfil"):visible').count() === 1);
await page.locator('#moreMenu button:has-text("Meu perfil")').click(); await page.waitForTimeout(500);
check('perfil mostra a conta certa', /gabs@nasala/.test(await page.locator('#meBody').innerText()));
await page.keyboard.press('Escape'); await page.waitForTimeout(300);

// sair já deixa a porta pronta para a próxima pessoa
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
check('não há mais "Trocar de conta"', !/Trocar de conta/.test(await page.locator('#moreMenu').innerText()));
await page.keyboard.press('Escape'); await page.waitForTimeout(200);
await page.evaluate(() => window.signOut(true)); await page.waitForTimeout(600);
check('sair volta para a entrada', !(await page.locator('#authScreen').isHidden()));
check('campo de e-mail limpo para a próxima pessoa', (await page.locator('#authEmail').inputValue()) === '');

console.log(ok.join('\n'));
console.log(errs.length?'\nERROS:\n'+errs.join('\n'):'\nsem erros de página');
await b.close(); servidor?.close();
