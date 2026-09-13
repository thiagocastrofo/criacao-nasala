/**
 * A armadilha nº 1 deste projeto.
 *
 * O `app.js` é carregado como `<script type="module">`. Em módulos, função de
 * topo NÃO é global — então os `onclick="..."` inline do HTML não enxergam.
 * Por isso existe o bloco `Object.assign(window, {...})` no fim do app.js.
 * Esquecer de incluir uma função nova ali deixa o botão morto, com um
 * "X is not defined" no console e mais nada.
 *
 * Este script compara os dois lados e falha se algum handler ficou de fora.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../site/', import.meta.url));
const app  = readFileSync(raiz + 'assets/app.js', 'utf8');
const html = readFileSync(raiz + 'index.html', 'utf8');

const usados = new Set();
for (const m of (app + html).matchAll(/on(?:click|change|input|blur|submit|keydown)=\\?["'`]([^"'`]*)/g))
  for (const f of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*\(/g)) usados.add(f[1]);

const expostos = new Set(
  (app.split('Object.assign(window, {')[1] || '').split('});')[0]
    .split(/[,\n]/).map(x => x.replace(/\/\/.*/, '').trim()).filter(Boolean)
);

// Nomes que aparecem na varredura mas não são handlers do app.
const ignorar = new Set(['if','for','setTimeout','alert','confirm','event','this',
  'document','getElementById','preventDefault','click','stopPropagation','focus','blur']);

const faltando = [...usados].filter(f => !expostos.has(f) && !ignorar.has(f));

if (faltando.length) {
  console.error('FALTANDO no Object.assign(window): ' + faltando.join(', '));
  process.exit(1);
}
console.log(`todos os ${usados.size - [...usados].filter(f => ignorar.has(f)).length} handlers expostos ✓`);
