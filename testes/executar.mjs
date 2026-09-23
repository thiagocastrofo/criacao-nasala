/**
 * Roda a bateria inteira e resume.  `node testes/executar.mjs`
 *
 * Sobe UM servidor com os headers do render.yaml e passa por todas as suítes
 * em série (elas compartilham a porta e o estado do localStorage do navegador,
 * então paralelizar dá falso negativo). Sai com código 1 se algo falhar, para
 * servir em CI sem ajuste.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { garantir, BASE, headersDoRender } from './servir.mjs';

const exec = promisify(execFile);
const aqui = fileURLToPath(new URL('.', import.meta.url));

const SUITES = ['test', 'auth', 'remodel', 'perfil', 'painel',
                'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14', 'v15'];
const EXTRAS = ['contrast', 'pior-caso'];

const hs = await headersDoRender();
const servidor = await garantir();

// Se a porta já estava ocupada, só dá para reaproveitar se quem está lá servir
// os headers do render.yaml — senão a bateria testaria outra coisa em silêncio.
const resp = await fetch(`${BASE}/index.html`);
const faltando = hs.filter(h => resp.headers.get(h.name) !== h.value);
if (faltando.length) {
  console.error(`Alguém já está na porta de ${BASE} sem os headers do render.yaml ` +
                `(faltando: ${faltando.map(h => h.name).join(', ')}). ` +
                `Derrube esse servidor antes de rodar a bateria.`);
  process.exit(1);
}
console.log(`site/ em ${BASE} · ${hs.length} headers do render.yaml` +
            `${servidor ? '' : ' (servidor já estava de pé)'}\n`);

let falhou = 0;

// A auditoria de handlers não precisa de navegador e é a que pega o erro mais
// comum do projeto, então vem primeiro.
try {
  const { stdout } = await exec('node', [aqui + 'handlers.mjs']);
  console.log(`handlers     ${stdout.trim()}`);
} catch (e) {
  falhou++;
  console.log(`handlers     ${(e.stdout || e.stderr || e.message).trim()}`);
}

for (const nome of [...SUITES, ...EXTRAS]) {
  try {
    const { stdout } = await exec('node', [`${aqui}${nome}.mjs`], {maxBuffer: 8 << 20});
    const linhas = stdout.split('\n');
    const ruins  = linhas.filter(l => l.startsWith('FAIL'));
    const erros  = stdout.includes('ERROS:');
    if (ruins.length || erros) falhou++;
    console.log(`${nome.padEnd(12)} ${ruins.length ? ruins.length + ' FALHAS' : 'ok'}` +
                `${erros ? ' + erros de página' : ''}`);
    for (const r of ruins) console.log('   ' + r);
  } catch (e) {
    falhou++;
    console.log(`${nome.padEnd(12)} QUEBROU — ${(e.stderr || e.message).split('\n')[0]}`);
  }
}

servidor?.close();
console.log(falhou ? `\n${falhou} item(ns) com problema` : '\ntudo verde');
process.exit(falhou ? 1 : 0);
