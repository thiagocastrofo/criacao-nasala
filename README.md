# Gestão de Demandas — naSala

Quadro de pautas e demandas do time. Site estático — HTML, CSS e JavaScript
puros, sem build e sem dependência para instalar. Dá para abrir o
`site/index.html` direto no navegador ou publicar no Render.

```
criacao-nasala/
├── render.yaml         ← configuração do site no Render (headers inclusive)
├── ferramentas/        ← conversores de uma vez (pauta → demandas, .ai → SVG)
├── site/               ← O ÚNICO diretório que vai ao ar
│   ├── index.html      ← página principal
│   ├── robots.txt
│   └── assets/
│       ├── styles.css  ← todo o CSS
│       └── app.js      ← toda a lógica + os dados das demandas
├── docs/
│   └── CONTEXTO-DO-PROJETO.md   ← decisões de design e armadilhas conhecidas
└── testes/             ← bateria Playwright + auditorias
```

O letreiro da naSala é um SVG embutido no `index.html`; os das três casas
(nSco., cidade, nSeventos) ficam na constante `MARKS` do `app.js`, porque são
desenhados dentro dos filtros e dos cabeçalhos de seção. Não há imagem externa,
e todos os caminhos são **relativos** (`assets/...`).

---

## Publicar no Render

O Render serve site estático de graça, lê repositório privado, refaz o deploy a
cada push e dá HTTPS. Site estático **não hiberna** — isso vale para *web
services*, não para estáticos.

1. Entre em [render.com](https://render.com) e crie a conta com o GitHub.
2. **New → Blueprint** e escolha este repositório, autorizando o acesso.
3. O Render lê o `render.yaml`, propõe o serviço `criacao-nasala` e você
   confirma. Não preencha build: não existe.
4. Em cerca de um minuto sai a URL `https://criacao-nasala.onrender.com`.

Daí em diante, todo push na `main` republica sozinho.

Se o Blueprint não pegar, o caminho manual é **New → Static Site** com
**Publish Directory** `site`, **Build Command** vazio, e os headers copiados do
`render.yaml` em *Settings → Headers*.

### O header que não pode faltar

`Cache-Control: no-cache`, no `render.yaml`. Não quer dizer "não guarde"; quer
dizer "pergunte ao servidor antes de usar". Como não há build, `app.js` e
`styles.css` nunca mudam de nome — sem isso o navegador continua servindo a
versão antiga depois de um deploy e o time roda código velho sem perceber.
Para conferir que está de pé: abra o site, F12 → aba **Network**, recarregue —
`app.js` deve voltar `304`, não `200 (from disk cache)`.

### Domínio próprio

Opcional e grátis no Render (*Settings → Custom Domains*): aponte um CNAME de
`demandas.nasala.com.br` para o endereço `.onrender.com`. O certificado sai
sozinho. Trocar depois não exige refazer o deploy.

---

## Rodar e testar localmente

```bash
node testes/servir.mjs      # site/ em http://127.0.0.1:8931
node testes/executar.mjs    # a bateria inteira, com resumo
node testes/v12.mjs         # uma suíte só
```

O `servir.mjs` **lê os headers do próprio `render.yaml`** e os aplica. Assim os
testes exercitam a configuração real: mexeu no header do Render, o teste passa a
testar o header novo sozinho.

Fora deste ambiente, instale o navegador uma vez:

```bash
npm i -D playwright && npx playwright install chromium
```

`testes/handlers.mjs` é a auditoria mais importante e roda em um segundo, sem
navegador: ela pega a armadilha nº 1 do projeto, descrita no
`docs/CONTEXTO-DO-PROJETO.md` — o `app.js` é um módulo, então função de topo não
é global, e todo handler `onclick` inline precisa estar no `Object.assign(window,
{...})` do fim do arquivo. Esquecer disso deixa o botão mudo.

---

## Atualizar a pauta

A lista de demandas mora no `site/assets/app.js`. Para atualizar a partir do
texto da pauta (aquele com `- [x]` agrupado em EQUIPE, CIDADE, EVENTOS…):

```bash
python3 ferramentas/pauta-para-tarefas.py pauta.txt            # só o relatório
python3 ferramentas/pauta-para-tarefas.py pauta.txt --aplicar  # escreve
node testes/executar.mjs
```

O relatório sai antes de escrever qualquer coisa: quantas entram, quantas saem,
o que mudou de situação e o intervalo de meses. `ferramentas/pauta-exemplo.txt`
é a pauta de 22/09/2026, que serve de referência de formato.

A ferramenta casa cada linha com a demanda que já existe e **preserva id e
título**, para o time não ver os cards mudarem de nome à toa. E cuida da parte
chata: a pauta só traz dia/mês e atravessa a virada de ano, então a passagem é
cronológica e a virada só conta quando o mês despenca de out/nov/dez para
jan/fev/mar — virar a cada mês que diminui quebraria em cima dos itens fora de
ordem que a pauta tem.

---

## Sincronização em tempo real (Firebase)

> ⚠ **Hoje a sincronização está fora do ar.** O banco `ns-criacao` devolve
> `401 Permission denied` em todos os caminhos — as regras não estão mais
> abertas, provavelmente porque o modo de teste do Firebase expirou (ele dura
> 30 dias). Enquanto isso, cada pessoa vê só a cópia do próprio navegador e as
> edições não chegam a ninguém. Conserte em **Realtime Database → Regras**, no
> console. Detalhes e a ordem certa de fazer isso estão no
> `docs/CONTEXTO-DO-PROJETO.md`.

Sem configuração, o app funciona, mas cada pessoa vê os dados do próprio
navegador. Para o time inteiro ver e editar ao vivo, conecte um Realtime
Database gratuito:

1. Em [console.firebase.google.com](https://console.firebase.google.com), crie
   um projeto.
2. **Realtime Database → Criar banco de dados**, inicie no modo de teste.
3. **Configurações do projeto (⚙️) → Seus apps → Web (`</>`)**, registre um app
   e copie o `firebaseConfig`.
4. Preencha `FIREBASE_CONFIG` nas primeiras linhas de `site/assets/app.js`.
5. Commit e push — o Render republica sozinho.

> A chave de API do Firebase para web é pública por natureza (fica visível no
> navegador) e não é segredo: a segurança vem das **regras** do banco, não da
> chave. O `app.js` deste repositório já vem com o projeto `ns-criacao`
> preenchido.

O Realtime Database não filtra por domínio de origem, por isso a sincronização
funciona de qualquer endereço sem configurar nada. **Se um dia vocês ativarem o
Firebase Auth** (veja abaixo), aí sim o domínio do Render precisa ser adicionado
em *Authentication → Settings → Authorized domains*, senão o login quebra em
produção e funciona só no `localhost`.

---

## Contas e permissões

| Quem | O que pode |
|---|---|
| Visitante sem conta | Nada: só a tela de entrada |
| Conta recém-criada | Nada ainda: fica esperando um administrador liberar |
| Pessoa com conta | Vê tudo; edita as demandas em que é responsável |
| Administrador | Edita todas as demandas, o time e os perfis; define quem mais é administrador |

Conta inicial: `thiago@nasala.com.br`.

**Criar conta não dá acesso.** Quem se cadastra fica numa sala de espera até um
administrador liberar em *menu da conta → Liberar acesso*, onde também dá para
recusar um pedido ou suspender quem já tinha entrado. O botão da conta ganha um
ponto quando há pedido esperando. Contas que já existiam antes desta regra
seguem valendo — a barreira vale para quem se cadastrar daqui em diante.

Administradores também podem **ocultar** um perfil sem apagar nada: a pessoa
some dos filtros, do seletor de responsáveis e da carga do dashboard, mas as
demandas dela continuam na lista.

### ⚠ O que esta tela protege — e o que não protege

A conferência da senha acontece **no navegador**, contra a lista de usuários
guardada no próprio banco. Junto com a aprovação por administrador, isso
organiza quem entra e evita engano no dia a dia. **Não é segurança.**

O banco em si passou a negar acesso não autenticado (verificado em 22/09/2026:
todo caminho devolve `401 Permission denied`, provavelmente porque o modo de
teste do Firebase expirou). Isso **não** fecha o quadro, e tem um efeito
colateral sério descrito na seção de sincronização: ninguém está sincronizando.

A exposição continua, por outra porta: a lista inteira de demandas é a semente
dentro do `assets/app.js`, que é servido publicamente. Quem abrir o link lê
todas as demandas no código-fonte da página, com cliente e responsável, sem
passar pela tela de entrada. Por isso a aprovação por administrador é um portão
de processo, não uma barreira de dados: quem espera liberação já tem os dados
no navegador — a tela esconde, não impede.

Repositório privado protege o código-fonte no GitHub, **não** o site: o `app.js`
publicado carrega os mesmos dados. O `robots.txt` e o header `X-Robots-Tag`
mantêm o quadro fora do Google, o que reduz a chance de alguém tropeçar nele,
mas não barram ninguém.

O que a implementação ainda assim faz direito: senha nenhuma é guardada em
texto. Cada conta tem um sal aleatório e a senha vira uma derivação
PBKDF2-SHA256 de 210 mil iterações — se o banco vazar, as senhas que as pessoas
reusam em outros lugares não vão junto.

### Como fechar de verdade

Duas mudanças, nesta ordem:

1. No console do Firebase, **Authentication → Sign-in method**, ative
   **E-mail/senha**. Troque `doLogin` / `doSignup` no `app.js` pelas funções
   `signInWithEmailAndPassword` e `createUserWithEmailAndPassword` do módulo
   `firebase-auth.js`. Adicione o domínio do Render aos *Authorized domains*.
2. Em **Realtime Database → Regras**, feche para quem está autenticado:

   ```json
   { "rules": { ".read": "auth != null", ".write": "auth != null" } }
   ```

Alternativa sem mexer no código: pôr uma barreira de rede na frente do site
(Cloudflare Access, grátis até 50 pessoas), que exige domínio próprio no DNS da
Cloudflare. Protege o site; não protege o banco.

---

## Onde estão as decisões

`docs/CONTEXTO-DO-PROJETO.md` guarda o sistema visual, as regras que não podem
regredir e as armadilhas já pagas — leia antes de mexer no código.
