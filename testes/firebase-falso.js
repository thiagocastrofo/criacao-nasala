/**
 * Firebase de mentira, para os testes.
 *
 * O ambiente onde este projeto é desenvolvido bloqueia o `gstatic.com`, de
 * onde o Firebase real é carregado — então o caminho de autenticação nunca
 * roda nos testes de verdade. Este módulo substitui os dois SDKs por uma
 * implementação em memória, com a mesma superfície que o `app.js` usa:
 * `initializeApp`, `db.{getDatabase,ref,get,set,remove,onValue,update}` e
 * `auth.{getAuth,onAuthStateChanged,signIn…,createUser…,signOut,updateProfile}`.
 *
 * O app procura por `window.__firebase` antes de tentar a rede (ver
 * `carregarFirebase`), então basta este arquivo ser injetado antes do
 * `app.js` para o caminho inteiro ser exercitado.
 *
 * O que ele NÃO faz: regras de segurança. Ele aceita toda leitura e escrita.
 * As regras são verificadas contra o banco de verdade, pelo console.
 */
(function () {
  const dados = {};                       // a árvore do banco, em memória
  const ouvintes = [];                    // {caminho, cb}

  const partes = c => String(c).split('/').filter(Boolean);
  function ler(caminho) {
    let n = dados;
    for (const p of partes(caminho)) {
      if (n == null || typeof n !== 'object') return null;
      n = n[p];
    }
    return n === undefined ? null : n;
  }
  function gravar(caminho, valor) {
    const ps = partes(caminho);
    if (!ps.length) return;
    let n = dados;
    for (const p of ps.slice(0, -1)) {
      if (typeof n[p] !== 'object' || n[p] === null) n[p] = {};
      n = n[p];
    }
    const ultimo = ps[ps.length - 1];
    if (valor === null) delete n[ultimo]; else n[ultimo] = valor;
    avisar(caminho);
  }
  // Uma escrita acorda quem escuta o próprio nó e quem escuta acima dele.
  function avisar(caminho) {
    for (const o of ouvintes.slice()) {
      if (caminho === o.caminho ||
          caminho.startsWith(o.caminho + '/') ||
          o.caminho.startsWith(caminho + '/')) {
        o.cb(snap(o.caminho));
      }
    }
  }
  const snap = caminho => {
    const v = ler(caminho);
    return {val: () => v, exists: () => v !== null && v !== undefined};
  };

  /**
   * O Firebase de verdade RECUSA `undefined` e lança de forma SÍNCRONA, antes
   * de devolver promessa — nenhum `.catch()` pega. Um falso que aceitasse
   * `undefined` deixaria passar exatamente o bug que derrubou a troca de cor,
   * então ele recusa igual, com a mesma mensagem.
   */
  function recusarUndefined(valor, caminho) {
    const ver = (v, onde) => {
      if (v === undefined) {
        throw new Error(`set failed: value argument contains undefined in property '${onde}'`);
      }
      if (v && typeof v === 'object') {
        for (const [k, x] of Object.entries(v)) ver(x, `${onde}.${k}`);
      }
    };
    ver(valor, String(caminho).replace(/\//g, '.'));
  }

  const db = {
    getDatabase: () => ({}),
    ref: (_d, caminho) => ({caminho: caminho || ''}),
    get: async r => snap(r.caminho),
    set: (r, v) => { recusarUndefined(v, r.caminho); return Promise.resolve(gravar(r.caminho, v)); },
    remove: async r => gravar(r.caminho, null),
    update: (r, obj) => {
      recusarUndefined(obj, r.caminho);
      for (const [k, v] of Object.entries(obj)) gravar(`${r.caminho}/${k}`, v);
      return Promise.resolve();
    },
    onValue: (r, cb, err) => {
      const o = {caminho: r.caminho, cb};
      ouvintes.push(o);
      try { cb(snap(r.caminho)); } catch (e) { err && err(e); }
      return () => {                       // a função que desliga a escuta
        const i = ouvintes.indexOf(o);
        if (i >= 0) ouvintes.splice(i, 1);
      };
    },
  };

  const contas = new Map();                // email → {uid, email, senha, displayName}
  let atual = null;
  const observadores = [];
  const mudou = () => observadores.forEach(f => f(atual));
  const falha = code => { const e = new Error(code); e.code = code; return e; };

  const auth = {
    getAuth: () => ({}),
    onAuthStateChanged: (_a, cb) => { observadores.push(cb); cb(atual); return () => {}; },
    signInWithEmailAndPassword: async (_a, email, senha) => {
      const c = contas.get(String(email).toLowerCase());
      if (!c || c.senha !== senha) throw falha('auth/invalid-credential');
      atual = {uid: c.uid, email: c.email, displayName: c.displayName};
      mudou();
      return {user: atual};
    },
    createUserWithEmailAndPassword: async (_a, email, senha) => {
      const e = String(email).toLowerCase();
      if (contas.has(e)) throw falha('auth/email-already-in-use');
      if (String(senha).length < 6) throw falha('auth/weak-password');
      const c = {uid: 'fb-' + (contas.size + 1), email: e, senha, displayName: ''};
      contas.set(e, c);
      atual = {uid: c.uid, email: c.email, displayName: ''};
      mudou();
      return {user: atual};
    },
    updateProfile: async (u, {displayName}) => {
      u.displayName = displayName;
      const c = contas.get(u.email);
      if (c) c.displayName = displayName;
    },
    signOut: async () => { atual = null; mudou(); },
  };

  window.__firebase = {initializeApp: () => ({}), db, auth};
  // Porta para o teste espiar e preparar o estado.
  window.__fake = {
    dados, contas,
    ler, gravar,
    criarConta: (email, senha, nome) => {
      const e = email.toLowerCase();
      contas.set(e, {uid: 'fb-' + (contas.size + 1), email: e, senha, displayName: nome || ''});
      return contas.get(e).uid;
    },
  };
})();
