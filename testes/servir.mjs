/**
 * Servidor local para os testes.
 *
 * Serve `site/` — e só `site/` — aplicando os MESMOS headers declarados no
 * `render.yaml`. O ponto de ler o YAML em vez de repetir a lista aqui é que
 * não existe deriva: se alguém mexer no header do Render, o teste passa a
 * exercitar o header novo automaticamente.
 *
 * Uso:  node testes/servir.mjs [porta]     (padrão 8931)
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ  = fileURLToPath(new URL('../site/', import.meta.url));
const YAML  = fileURLToPath(new URL('../render.yaml', import.meta.url));
export const PORTA = Number(process.argv[2]) || 8931;
export const BASE  = `http://127.0.0.1:${PORTA}`;

/**
 * Lê os pares nome/valor de `headers:` do render.yaml sem depender de uma
 * biblioteca de YAML — o bloco tem forma fixa e conhecida:
 *   - path: /*
 *     name: Cache-Control
 *     value: no-cache
 */
export async function headersDoRender() {
  const txt = await readFile(YAML, 'utf8');
  const bloco = txt.split(/^\s*headers:\s*$/m)[1] || '';
  const out = [];
  for (const m of bloco.matchAll(/-\s*path:\s*(\S+)\s*\n\s*name:\s*(.+?)\s*\n\s*value:\s*(.+?)\s*$/gm)) {
    out.push({ path: m[1], name: m[2], value: m[3] });
  }
  if (!out.length) throw new Error('nenhum header lido do render.yaml — o formato mudou?');
  return out;
}

const TIPOS = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.txt':'text/plain; charset=utf-8', '.svg':'image/svg+xml',
  '.png':'image/png', '.ico':'image/x-icon',
};

export async function subir(porta = PORTA) {
  const headers = await headersDoRender();
  const srv = createServer(async (req, res) => {
    for (const h of headers) res.setHeader(h.name, h.value);

    // normalize + prefixo barra a saída de `site/` por "../".
    let rel = decodeURIComponent(new URL(req.url, BASE).pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    const alvo = normalize(join(RAIZ, rel));
    if (!alvo.startsWith(RAIZ)) { res.writeHead(403).end('403'); return; }

    try {
      const info = await stat(alvo);
      if (info.isDirectory()) throw new Error('dir');
      res.writeHead(200, {'Content-Type': TIPOS[extname(alvo)] || 'application/octet-stream'});
      res.end(await readFile(alvo));
    } catch {
      // Qualquer coisa fora de `site/` cai aqui — inclusive README.md e
      // CONTEXTO, que é exatamente o que se quer provar.
      res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}).end('404');
    }
  });
  await new Promise(ok => srv.listen(porta, '127.0.0.1', ok));
  return srv;
}

/**
 * Sobe o servidor só se ninguém estiver na porta. Deixa cada suíte rodar
 * sozinha (`node testes/v12.mjs`) e também em série pelo executar.mjs, que
 * sobe um servidor só para todas.
 */
export async function garantir(porta = PORTA) {
  try {
    const r = await fetch(`http://127.0.0.1:${porta}/index.html`);
    if (r.ok) return null;                 // já tem alguém servindo
  } catch { /* porta livre */ }
  return subir(porta);
}

// Rodado direto (`node testes/servir.mjs`) fica de pé até Ctrl-C.
if (import.meta.url === `file://${process.argv[1]}`) {
  await subir();
  const hs = await headersDoRender();
  console.log(`site/ em ${BASE} com ${hs.length} headers do render.yaml:`);
  for (const h of hs) console.log(`  ${h.name}: ${h.value}`);
}
