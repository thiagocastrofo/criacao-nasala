/**
 * De onde sai o Playwright.
 *
 * As suítes foram escritas num ambiente onde o Playwright mora num caminho
 * absoluto. Noutra máquina esse caminho não existe, então aqui se tenta, em
 * ordem: o pacote instalado no projeto, e depois o caminho do ambiente
 * remoto. Se nenhum responder, a mensagem diz o que fazer.
 */
const CAMINHOS = [
  'playwright',
  '/opt/node22/lib/node_modules/playwright/index.mjs',
];

let mod = null;
const tentativas = [];
for (const c of CAMINHOS) {
  try { mod = await import(c); break; }
  catch (e) { tentativas.push(`  ${c} → ${e.code || e.message}`); }
}

if (!mod) {
  throw new Error(
    'Playwright não encontrado. Rode `npm i -D playwright` e ' +
    '`npx playwright install chromium` na raiz do projeto.\n' +
    'Tentativas:\n' + tentativas.join('\n')
  );
}

export const chromium = mod.chromium;
export default mod;
