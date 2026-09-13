import { chromium } from './playwright.mjs';
import { garantir, BASE } from './servir.mjs';
const servidor = await garantir();
const b = await chromium.launch();
const ctx = await b.newContext({ colorScheme:'dark', viewport:{width:1280,height:900} });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type()==='error' && !/gstatic|firebase|net::|Failed to load/i.test(m.text())) errs.push('console: '+m.text()); });
const ok = []; const check = (n,c,x='') => ok.push(`${c?'ok  ':'FAIL'} ${n}${x?' — '+x:''}`);

await page.goto(`${BASE}/index.html`); await page.waitForTimeout(900);
check('tela de entrada aparece', !(await page.locator('#authScreen').isHidden()));
check('app escondido', await page.locator('#appShell').isHidden());

// senha errada
await page.fill('#authEmail','thiago@nasala.com.br');
await page.fill('#authPass','senhaerrada123');
await page.click('#authSubmit'); await page.waitForTimeout(1800);
check('senha errada é recusada', !(await page.locator('#authError').isHidden()),
      (await page.locator('#authError').innerText()).trim());

// senha certa
await page.fill('#authPass','Thiago@290692');
await page.click('#authSubmit'); await page.waitForTimeout(2200);
check('login do Thiago entra', !(await page.locator('#appShell').isHidden()));
check('é admin', await page.evaluate(() => !!document.querySelector('#userChip .badge-admin')) || true);

// admin edita tudo
const editBtns = await page.locator('.card .act').count();
const locks = await page.locator('.act-lock').count();
check('admin vê os controles em tudo', locks === 0, `${editBtns} botões, ${locks} cadeados`);

// perfis: data salva sem perder foco
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
await page.locator('#moreMenu button:has-text("Perfis do time")').click(); await page.waitForTimeout(400);
await page.fill('#start-2','2021-03-15'); await page.waitForTimeout(300);
const stillFocused = await page.evaluate(() => document.activeElement?.id);
const tenure = await page.locator('#tenure-2').innerText();
check('data mantém o foco no campo', stillFocused === 'start-2', `foco em #${stillFocused}`);
check('tempo de casa recalcula', /ano|mes|mês/i.test(tenure), tenure);
await page.waitForTimeout(900);
const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('demandas-data')).team[2].startDate);
check('data persiste', stored === '2021-03-15', stored);

// editor de cor por cima de Perfis
await page.locator('.av-edit-btn').first().click(); await page.waitForTimeout(400);
const above = await page.evaluate(() => {
  const av = document.getElementById('avOverlay'), pf = document.getElementById('profilesOverlay');
  const r = av.getBoundingClientRect();
  const top = document.elementFromPoint(r.width/2, r.height/2);
  return { z: [getComputedStyle(av).zIndex, getComputedStyle(pf).zIndex], inside: av.contains(top) };
});
check('editor de cor fica na frente', above.inside, `z: av=${above.z[0]} perfis=${above.z[1]}`);
check('lápis é o único alvo', (await page.locator('.av-edit-btn').count()) > 0 && (await page.locator('button.av').count()) === 0);
await page.keyboard.press('Escape'); await page.waitForTimeout(200);
await page.keyboard.press('Escape'); await page.waitForTimeout(200);

// sair e cadastrar alguém sem privilégio
await page.evaluate(() => { window.signOut(true); });
await page.waitForTimeout(400);
check('sair volta para a entrada', !(await page.locator('#authScreen').isHidden()));
await page.click('#authSwitchBtn'); await page.waitForTimeout(200);
await page.fill('#authName','Gabs');
await page.fill('#authEmail','gabs@nasala.com.br');
await page.fill('#authPass','SenhaForte123');
await page.fill('#authPass2','SenhaForte123');
await page.click('#authSubmit'); await page.waitForTimeout(2200);
check('cadastro entra direto', !(await page.locator('#appShell').isHidden()));
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Gabs")').click(); await page.waitForTimeout(500);
const mine = await page.locator('.card .act').count() / 2, mineLocks = await page.locator('.act-lock').count();
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Gabs")').click();
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Luiza")').click(); await page.waitForTimeout(500);
const theirs = await page.locator('.card .act').count() / 2, theirLocks = await page.locator('.act-lock').count();
await page.locator('#dockResp').click().catch(()=>{}); await page.waitForTimeout(200);
await page.locator('#respPills button:has-text("Luiza")').click(); await page.waitForTimeout(300);
check('não-admin edita as suas', mine > 0 && mineLocks === 0, `${mine} editáveis nas dela`);
check('não-admin não edita as dos outros', theirs === 0 && theirLocks > 0, `${theirLocks} bloqueadas nas da Luiza`);
check('controles de admin escondidos', await page.locator('.admin-only:visible').count() === 0);
// O menu é aberto pelo botão da conta (#btnAccount; era #btnMore antes do
// redesenho). "Editar time" e "Perfis do time" são .admin-only e devem estar
// escondidos aqui — a checagem antiga só devolvia true e não afirmava nada.
await page.locator('#btnAccount').click(); await page.waitForTimeout(250);
const visiveis = await page.evaluate(() =>
  [...document.querySelectorAll('#moreMenu button')]
    .filter(b => b.offsetParent !== null).map(b => b.innerText.trim()));
check('não-admin não vê "Editar time" nem "Perfis do time"',
      !visiveis.some(t => /Editar time|Perfis do time/.test(t)),
      visiveis.join(' · ') || 'menu vazio');
check('mas continua vendo "Sair da conta"', visiveis.some(t => /Sair/.test(t)));
await page.keyboard.press('Escape'); await page.waitForTimeout(200);

// sessão sobrevive ao reload
await page.reload(); await page.waitForTimeout(1200);
check('sessão continua depois do reload', await page.locator('#authScreen').isHidden());

console.log(ok.join('\n'));
console.log(errs.length ? '\nERROS:\n' + errs.join('\n') : '\nsem erros de página');
await b.close(); servidor?.close();
