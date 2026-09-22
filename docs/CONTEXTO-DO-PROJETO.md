# Contexto do Projeto — Gestão de Demandas (naSala)

> **Cole este documento no início de um novo chat** e anexe o `demandas.zip`.
> Ele contém tudo que o assistente precisa saber para continuar o trabalho.

---

## O que é

Plataforma web de gestão de tarefas/demandas para a agência **naSala**. Site
estático (HTML + CSS + JavaScript puro), sem build e sem framework. Funciona
abrindo o `index.html`, e está hospedado em GitHub Pages.

Idioma da interface: **português do Brasil**.

---

## Estrutura de arquivos

```
demandas/
├── index.html          ← estrutura HTML, logos SVG inline, todos os modais
├── .nojekyll           ← faz o GitHub Pages servir a pasta assets/
├── README.md           ← instruções de publicação
├── CONTEXTO-DO-PROJETO.md  ← este arquivo
└── assets/
    ├── styles.css      ← todo o CSS
    └── app.js          ← toda a lógica + as 841 demandas + config Firebase
```

Todos os caminhos são **relativos** (`assets/...`). Não há arquivos de imagem
externos: os 4 logos (naSala, nSco., nSeventos, cidade) e todos os ícones são
SVGs embutidos. As fontes são a stack nativa do sistema (`-apple-system`).

---

## Design

Segue as Human Interface Guidelines da Apple traduzidas para web. As regras
estão comentadas no topo do `assets/styles.css`. O que **não** pode ser
regredido:

- Fonte: `-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif`
- Fios de `0.5px`, raios de 6–20px, `backdrop-filter` **só** na camada
  flutuante (o cabeçalho) — nunca dentro do conteúdo
- Escala tipográfica em `rem` (`--t-xs` a `--t-2xl`), para acompanhar a
  configuração de corpo de texto do navegador. **Nada abaixo de 11px.**

### Cores

Cada sinal tem dois tokens, e eles não são intercambiáveis:

| token | para que serve |
| --- | --- |
| `--grn`, `--org`, `--red`, `--acc`, `--pur` | **preenchimento**: barras, pontos, fios |
| `--grn-i`, `--org-i`, … (`-i` de tinta) | **texto e ícone** |
| `--grn-t`, `--org-t`, … (`-t` de tingido) | **fundo tingido** atrás da tinta |

As cores de sistema da Apple são feitas para preencher formas, não para
escrever: `#34C759` sobre branco dá 2,0:1. Por isso a tinta é mais escura no
tema claro. **Todo par texto/fundo do app passa de 4.5:1 nos dois temas** — a
medida de cada token está no comentário ao lado dele no CSS. Ao mexer em cor,
recalcule.

### Dashboard (gráficos)

`openDashboard()`. Tem **filtro por ano** (`dashAno`, `doAno`) que vale para
todos os painéis. Sem contagem no botão — só o rótulo, numa linha só.
Demandas sem data de entrega (31 de 746) não pertencem a ano nenhum e só
aparecem em "Tudo".

**Rampa de volume** (`RAMPA`, `rampa4`, `gradienteVolume`): paleta do cliente,
menos → mais = Mint `#66D4CF` · Green `#32D74B` · Yellow `#FFD60A` · Orange
`#FF9F0A`. Sem vermelho. **Cada barra recebe duas cores**: a da sua posição na
rampa e a do passo seguinte, num gradiente vertical. **Sem legenda de cor** —
retirada a pedido; a altura da barra e o tooltip continuam dizendo a medida.

> **Ressalva honesta, registrada de propósito.** Esta rampa **não** é
> monotônica em luminosidade — o amarelo (L 0.69) é mais claro que os
> vizinhos. Isso só é aceitável aqui porque a cor é **reforço**, não o canal
> da medida: quem mede é a **altura da barra**, e cada mês traz o número no
> tooltip e na lista para leitor de tela. **Não reaproveite `rampa4` em mapa
> de calor, coroplético ou qualquer gráfico onde a cor seja a medida** — ali
> a luminosidade monotônica volta a ser obrigatória.

A rampa vem com legenda "menos → mais". Sem ela a cor da barra não diz nada,
e ela é também o alívio exigido para preenchimento de baixo contraste.

**Estado vazio** (`painelVazio`): recorte de ano sem dado mostra uma frase,
não barras zeradas. Nove trilhas vazias lado a lado leem como defeito, não
como "não há nada aqui".

**Duas camadas de vidro** no `.modal-wide` (a janela mais um véu em
`::before`): uma camada só ficava transparente demais para um painel cheio de
número. O mesmo vale para o `.menu` da conta.

> **Armadilha já paga uma vez:** ao pôr o véu no `.menu`, declarei
> `position:relative` no fim da regra. Ele vence o `position:absolute` do
> começo do mesmo bloco, o menu volta para o fluxo e **empurra o cabeçalho
> inteiro**. `absolute` já serve de bloco de contenção para o `::before` com
> `inset:0` — não declare `position` de novo ali.

Regras que os gráficos seguem — **não regredir**:

1. **Cor de status só onde significa status.** Verde/azul/laranja/vermelho
   aparecem em Situação, Por casa e nos números de cabeçalho. **Carga por
   pessoa usa tinta neutra**: o comprimento da barra já é a medida, e a antiga
   escala de calor (verde→amarelo→laranja→vermelho) era arco-íris *e* roubava
   o significado da cor de status.
2. **Sequencial precisa de luminosidade monotônica.** "Entregas por mês" usa
   a rampa verde → âmbar de `corVolume`, com legenda.
3. **Nada fala só pela cor.** Toda marca tem rótulo e número visíveis. É
   também o alívio exigido quando o preenchimento tem menos de 3:1 contra a
   superfície, que é o caso do verde e do laranja no tema claro.
4. **Um bloco cheio só.** Dos três números de cabeçalho, apenas "Atrasadas"
   é tingido, e só quando existe alguma. Três blocos coloridos lado a lado
   anulam uns aos outros.
5. **2px de respiro** entre preenchimentos vizinhos, para a divisa ler.
6. Toda barra tem *tooltip* no hover e no foco, e `aria-label` próprio.

A paleta de status foi validada: separação para daltonismo **ΔE 12,1
(deutan) / 18,4 (visão normal)**, bem acima do piso de 8. No tema escuro ela
fica um pouco acima da faixa de luminosidade recomendada — é troca consciente:
escurecer o laranja derruba a separação contra o vermelho para ΔE 4,6, e
separação protege mais leitor do que uniformidade de brilho.

### Barra de ferramentas

Reconstruída segundo a orientação de *toolbars*. Regras que valem:

- **Símbolo sem borda dentro de contêiner.** Os controles de vista (ocultar
  entregues, painel) são ícones sem borda própria, dentro de um `.tb-group`
  único que é quem desenha a borda — "borders aren't necessary because the
  section provides a visible container". Antes eram dois *pills* com borda
  cada, que é justamente o "reduce the use of toolbar backgrounds and tinted
  controls".
- **Três grupos, no máximo.** Vista · conta · ação primária. `gap:10px` entre
  eles não é estética: rótulos de texto encostados "may appear to run
  together, making the buttons indistinguishable".
- **Uma ação primária só, na borda final.** "+ Nova", tingida. Nenhum outro
  controle da barra é tingido.
- **Raio concêntrico.** Item do menu = raio do menu (12) menos o respiro (5)
  = 7. Item da barra herda o pill do grupo.

### Sistema de ícones

`icons.md` exige "consistent size, level of detail, stroke thickness" e
"match the weights of interface icons and adjacent text". Havia **8 larguras
de traço diferentes** espalhadas pelo app.

A regra agora é uma só: **`stroke-width / viewBox = 0.095`**. Assim o traço
renderizado é `0.095 × tamanho` — peso óptico igual em todo lugar, e ícone
maior engrossa na proporção certa para casar com o texto ao lado. Ao criar
ícone novo, calcule o traço a partir do viewBox (13 → 1.24, 12 → 1.14,
16 → 1.5).

Os tamanhos continuam variando por contexto **de propósito**: 16 na barra, 15
no menu, 10–13 junto de texto pequeno. A regra é casar com o texto vizinho,
não uniformizar o tamanho.

### Fundo, vidro no conteúdo e o menu flutuante

**Decisão do cliente, contra a orientação escrita.** A regra é "don't use
Liquid Glass in the content layer" — vidro no conteúdo achata a hierarquia
que o vidro existe para criar. Foi pedido duas vezes, então vale; o que foi
feito para o custo não aparecer:

- **Fundo fluido** (`body::before`): manchas radiais grandes sobre o `--ground`,
  com deriva lenta de 46s. Sem filtro de desfoque — o gradiente radial já é o
  borrão, e sai de graça para a GPU. É ele que dá ao vidro o que refratar; num
  fundo chapado, vidro vira cinza.
- **Dois pesos de vidro no card.** `--glass-card` para aberto, `--glass-card-2`
  (bem mais fino) para entregue. A hierarquia que a regra protegia volta pela
  **espessura**: aberto avança, entregue recua. Há teste que falha se o card
  aberto ficar igual ou mais fino que o entregue.
- **As manchas do gradiente têm alcance limitado de propósito.** O card é
  translúcido, então o texto compõe sobre o que estiver atrás. `pior-caso.mjs`
  força o ponto mais claro do gradiente e refaz a auditoria de contraste. Ao
  mexer nas cores das manchas, **rode esse teste**.

**Menu flutuante** (`.dock`): casas, time e busca saíram do topo e flutuam
sobre a lista. Uma gaveta por vez, Esc fecha, clique fora fecha. O filtro
ativo fica escrito no próprio botão — não é preciso abrir para saber. A
gaveta usa `--glass-thick`: no peso fino dava para ler o card por baixo dela.
**Largura fixa** (`min(480px, 100vw-24px)`): solta, ela esticava até a tela
inteira em monitor largo. A faixa de pills rola por dentro, entre duas setas
(`wirePillArrows`), que se escondem sozinhas quando tudo cabe.

O esmaecido das pontas (`.fade-l` / `.fade-r`) é ligado **pelo estado real de
rolagem**, não fixo: sem isso o nome seguinte era cortado a faca junto da
seta, e com máscara fixa o primeiro e o último pill apareciam apagados mesmo
quando não havia mais nada para rolar.

Os dois ícones da barra mostram o nome no hover e no foco, via `::after` com
`attr(aria-label)` e atraso de 250ms — símbolo sozinho é rápido para quem já
sabe, o rótulo é para quem ainda não sabe.
`.body` tem `padding-block-end:116px` para a última linha não ficar embaixo
do menu; avisos e o indicador de sync sobem para 84px pelo mesmo motivo.

### Material, brilho e movimento

**Vidro só na camada flutuante.** Barra do topo, menu ⋯, janelas, avisos e o
indicador de sync. **Card de demanda, perfil e qualquer container de conteúdo
não levam `backdrop-filter`** — a orientação é explícita: vidro no conteúdo
embaralha justamente a hierarquia que o vidro existe para criar. Há um teste
automatizado que falha se aparecer vidro no conteúdo.

- `--glass` (.70) na barra, menu e avisos — pouco texto em cima.
- `--glass-thick` (.94) + `--glass-blur-deep` (48px) nas janelas — superfície
  com muito texto pede a variante espessa. Em .88 a leitura sofria.
- `--glass-edge` é o fio de luz na borda de cima; `.topbar::after` é o
  esmaecido que dissolve o conteúdo ao encontrar a barra.
- `prefers-reduced-transparency` deixa **todas** as superfícies sólidas.

**Brilho é estado, nunca enfeite.** `--glow-acc` no botão primário e no pill
ativo, `--glow-focus` no anel de foco, `--glow-red` na ficha "Atrasadas" e
`--glow-late` no card atrasado.

**Atraso não tem mais traço lateral.** O sinal é `--glow-late` — uma borda
vermelha discreta mais um brilho contido — junto da etiqueta "Atrasada · N
dias" e da data em vermelho. O glow é deliberadamente fraco: numa versão
anterior ele estava em .55 de opacidade e quatro atrasadas seguidas viravam
uma parede vermelha que ainda vazava pelo desfoque das janelas. Se for mexer,
mexa para baixo.

**Movimento breve e raro.** `--dur-1/2/3` e `--ease`. Um momento orquestrado:
ao entrar no quadro, as seis primeiras linhas assentam (`#lista.boot`), uma vez
só. Nada anima em interação frequente — trocar status, filtrar e rolar não
animam de propósito.

### Regras que a reformulação estabeleceu

1. **Uma cor, um significado.** Verde/laranja/azul/vermelho são de status e
   prazo, e de mais nada. O porte usa traços (▁▃▅) em tinta neutra — antes
   usava as mesmas três cores do status, o que confundia. Roxo é só
   "concorrência ganha".
2. **As casas não têm cor.** A identidade delas é o letreiro (`MARKS` no
   `app.js`), que aparece no pill de filtro e no cabeçalho da seção e herda
   `currentColor` — acende junto com o estado do controle. É a assinatura do
   quadro; não substitua por texto nem por uma quinta paleta.
3. **Ênfase por preenchimento, arquivo por fio.** Demanda em aberto = card
   cheio; entregue = só contorno (`.card.is-done`). A regra continua valendo,
   mas a justificativa antiga não: ela vinha do letreiro da nSco. desenhado
   dentro de um quadro de fio, e o letreiro novo (set/2026) não tem quadro.
   O que sustenta a regra hoje é só a hierarquia — e o fato de que entregue
   **nunca** pode voltar a ser `opacity:.5`, que dava 1,4:1 de contraste.
4. **Uma ênfase só.** O único preenchimento saturado é o botão "Nova".
   Atraso = fio lateral vermelho + etiqueta tingida.
5. **Aberto primeiro.** `sortTasks()` põe atrasado → próximo → em aberto →
   entregue. São 734 entregues contra 12 abertas: sem isso o que importa fica
   soterrado.
6. **A situação é controle, não enfeite.** O trilho e as fichas de status
   (`renderState`) filtram a lista: clicar em "Atrasadas" mostra quais são.
   Os números respeitam casa, pessoa e busca — falam do que está na tela, não
   do arquivo inteiro. A barra pintada tem 8px mas o alvo tem 30, e cada faixa
   tem 28px de largura mínima: proporção é forma, o número exato está na ficha.
   Ficha com zero fica `disabled` — informação sim, controle morto não.
7. **Porte "Médio" não aparece.** É o padrão de 99% das demandas; a etiqueta
   marca só a exceção.

### Conta e perfil

- O avatar mora na barra (`#btnAccount`) e é também a porta do menu: dá para
  ver de quem é a sessão sem clicar em nada.
- **Meu perfil** (`openMe`) é de cada pessoa: identidade, cargo, data de
  início, avatar, os próprios números e as próprias demandas em aberto, mais
  Trocar de conta / Sair / Excluir minha conta.
- **Perfis do time** (`openProfiles`) virou painel de **administrador**. Quem
  não administra não vê o item no menu e a função recusa se chamada direto.
- Quem cria conta tem de poder apagá-la — `deleteMyAccount()`. Bloqueia se a
  pessoa for a única administradora.
- **Não existe "Como o time acessa".** O tutorial foi removido inteiro.
- **`refreshOpenPanels()`** redesenha qualquer painel aberto depois de uma
  gravação ou de um sync. Sem isso a cor do avatar salvava e a folha "Meu
  perfil" continuava mostrando a antiga — parecia que não tinha salvo.
- **O aviso de sincronização sempre some**, inclusive o de erro (7s). Antes o
  erro ficava na tela para sempre e deixava de ser aviso para virar sujeira.
- **Não existe "Trocar de conta".** `signOut()` já fecha o perfil, volta para
  a tela de entrada e limpa o campo de e-mail — dois botões para o mesmo
  caminho é um botão a mais.

### Retorno de estado e atalhos

- `toast(msg, {tone, action, onAction})` substituiu os `alert()`. Retorno de
  estado mora na interface, perto do que descreve; alerta modal ficou só para
  o que é crítico e sem volta.
- **Excluir não pergunta** — apagar o que se mandou apagar é o resultado
  esperado. O que faltava não era aviso prévio e sim volta atrás: sai um aviso
  com **Desfazer** por 9 s, que devolve a demanda para a mesma posição.
- Ainda usam confirmação modal, e devem continuar usando: **limpar histórico**
  (perda inesperada e sem volta) e **sair da conta**.
- Atalhos: `N` nova, `/` ou `⌘K` buscar, `H` ocultar entregues, `Esc` fecha.
  Listados no rodapé do menu ⋯ e nos `title` dos controles. Ignorados enquanto
  se digita ou com uma janela aberta.

### Acessibilidade (não regredir)

- Foco visível em tudo (`:focus-visible`), atalho "pular para a lista"
- Modais: `role="dialog"`, `aria-modal`, `Esc`, foco entra e volta, Tab preso
- `aria-pressed` / `aria-expanded` nos controles de estado
- Alvos de 44px sob `@media (pointer:coarse)`
- `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-color-scheme`
- `inkOn()` escolhe branco ou quase-preto para as iniciais do avatar conforme
  a cor escolhida pela pessoa — branco sobre o amarelo da paleta dava 1,6:1

---

## Contas e permissões

O quadro abre numa tela de entrada (`#authScreen`); o app inteiro fica dentro
de `#appShell`, escondido até alguém entrar.

- `users/{uid}` no banco: `{uid, name, email, salt, hash, admin, memberName, createdAt}`
- `SEED_USER` no `app.js` é a conta `thiago@nasala.com.br`, administradora.
  Só a derivação PBKDF2-SHA256 (210 mil iterações) e o sal estão no código —
  nunca a senha.
- `canEdit(t)` = administrador **ou** estar em `t.responsible`. Quem não pode
  editar vê o status como etiqueta (`.status-static`) e um cadeado
  (`.act-lock`) no lugar dos botões.
- Controles só de administrador levam a classe `.admin-only` e aparecem quando
  a raiz recebe `.is-admin` (`applyRole()`). Esconder é melhor do que mostrar
  e recusar depois do clique.
- `crypto.subtle` só existe em contexto seguro. Por `file://` a tela avisa e
  desabilita o botão, em vez de falhar calada.

> **Isto não é segurança.** A senha é conferida no navegador e as regras do
> Realtime Database continuam abertas: quem tiver o link e abrir o console lê e
> altera tudo. O README traz o passo a passo para trocar por Firebase
> Authentication + regras, e as regras prontas.

## Formato dos dados no Firebase (schema 2)

```
demandas/
├── tasks/{id}        ← uma demanda por nó
├── team, users/{uid}, appTitle, log, schema
└── _backup/tasks_v1  ← a lista original, intocada
```

`tasks` deixou de ser lista e virou mapa. Motivo: salvar uma demanda não
reescreve as outras 745 (duas pessoas editando junto não perdem trabalho) e dá
para escrever regra de permissão por demanda. `migrateTasksToMap()` converte
sozinho na primeira abertura, **depois** de copiar a lista para
`_backup/tasks_v1`.

Escrita: `saveTaskNode`, `removeTaskNode`, `saveTeam2`, `saveUsers`, `saveLog`,
`saveTitle` — cada uma grava um nó. `persist()` (bloco inteiro) ficou só para
casos raros.

## Funcionalidades implementadas

### Tarefas
- Status via **dropdown** nativo no card: Pendente / Em andamento / Concluído
  (livre para ir e voltar). É um `<select>` de propósito: teclado, leitor de
  tela e menu do sistema vêm de graça
- Título, descrição, categoria
- **Múltiplos responsáveis** (multi-select com avatares)
- **Duas datas**: data de entrega e data de apresentação
- **Porte**: Pequeno / Médio / Grande (badge colorido)
- **Concorrência ganha**: checkbox, exibe selo roxo "Ganha"
- **Etiquetas automáticas de prazo** (`dueStatus` devolve `{kind, days}`):
  - `Entrega hoje` / `amanhã` / `em N dias` quando faltam ≤ 3 dias (`NEAR_DAYS`)
  - `Atrasada · N dias` quando a data já passou, mais um fio vermelho na
    lateral do card. Sem piscar: a animação infinita saía em cima de quem usa
    `prefers-reduced-motion`

### Categorias
NSCO, CIDADE, EVENTOS, OUTROS — em seções recolhíveis.

### Filtros
- Bolha **CASAS** (cada pill é o letreiro da casa) e bolha **TIME** (ponto da
  cor da pessoa + primeiro nome)
- Abertas por padrão; clicar no rótulo recolhe/expande com animação
- Clicar num pill já selecionado **desmarca** o filtro
- Quando recolhida com filtro ativo, mostra um chip com × para limpar
- **Busca**: ícone de lupa que expande para campo de texto

### Time e perfis
- Botão **Time**: editar membros (nome, cor, avatar SVG ou iniciais)
- Botão **Perfis**: card por pessoa com avatar (com lápis indicando que dá
  clique), cargo, **data de início** e **tempo de casa** (`calcTenure`), barra
  de proporção entregue/total e 4 métricas: Abertas, Entregues, Ganhas, Total.
  Mostra se a pessoa tem conta e, para administrador, o interruptor de papel.

  **Dois bugs corrigidos aqui, não regredir:**
  1. `onchange` chamava `renderProfiles()`, que refazia a grade e destruía o
     campo em uso — o foco pulava fora no meio da data e parecia que nada
     salvava. Agora `setStartDate()` atualiza só o texto de tempo de casa e
     `queueTeamSave()` adia a gravação 700 ms. **Nunca** re-renderizar a grade
     de dentro do handler de um campo.
  2. `#avOverlay` e `#profilesOverlay` tinham o mesmo `z-index` e Perfis vem
     depois no HTML, então o seletor de cor abria atrás. `#avOverlay` agora é
     `z-index:260` — é janela filha e sobe.
  3. O círculo inteiro era o botão e o lápis era enfeite por cima; no hover o
     círculo crescia e engolia o lápis. Agora o círculo é `<span>` decorativo
     e o **lápis é o único alvo**, 28×28, posicionado FORA do círculo
     (`.av-wrap` tem padding para isso). Não voltar a pôr o clique no círculo
     nem a sobrepor os dois.

### Workload
Botão **Workload**: barras horizontais por pessoa, ordenadas da maior carga
para a menor, com cores de calor (verde → amarelo → laranja → vermelho)
conforme a proporção em relação a quem tem mais. Mostra a média do time.
(O modo "por peso" e a legenda de cores foram **removidos** a pedido.)

### Log
Botão **Log**: histórico de ações com ponto colorido por tipo
(verde = criação, azul = edição, laranja = status, vermelho = exclusão,
roxo = time), mensagem e timestamp. Tem um botão discreto "Limpar histórico".

### Outros
- Título do app editável (ícone de lápis)
- Botão "Ocultar concluídas"
- **Tema**: um mecanismo só, o atributo `data-theme` no `<html>`. Em `auto`
  segue `prefers-color-scheme`, e respeita o carimbo de quem hospeda a página
  se houver um. A escolha manual (menu ⋯) vence o sistema nos dois sentidos e
  fica **só neste navegador** — tema e seções recolhidas não vão para o
  Firebase, senão a escolha de uma pessoa virava a de todo mundo
- Responsivo de 390px até desktop. Abaixo de 640px, "Carga" e "Perfis" descem
  para o menu ⋯ (classes `.wide-only` / `.narrow-only`)

---

## Dados

### 841 demandas reais (pauta de 22/09/2026)

Importadas da pauta em texto que o time mantém. 819 concluídas, 22 pendentes,
zero em andamento. Por casa: nSco. 767, nSeventos 46, cidade 28.

**Ferramenta:** `ferramentas/pauta-para-tarefas.py` faz a conversão inteira —
lê o texto da pauta e escreve o bloco `let tasks = [...]` do `app.js`,
casando com o que já existe para preservar id e título.

**Inferência de ano (o ponto delicado).** A pauta só traz dia/mês e atravessa
a virada de ano. A importação anterior errava isso: o começo da lista (22/05)
recebeu 2026 e o fim (18/07) recebeu 2025 — invertido, porque a lista é
cronológica. O gráfico de entregas por mês mostrou meses errados por rodadas,
parando em junho quando a pauta já ia até setembro.

A regra correta é uma passagem cronológica por seção, e a virada de ano só
conta quando o mês **despenca de out/nov/dez para jan/fev/mar**. Não dá para
virar o ano a cada mês que diminui: a pauta tem itens fora de ordem digitados
errado ("29/09" no meio de agosto, "28/12" no meio de novembro), e um deles
sozinho cascatearia o erro por centenas de linhas.

Hoje as datas cobrem 18 meses seguidos, de 2025-05 a 2026-10, sem buraco.

### Regra de mapeamento de pessoas (IMPORTANTE)
No PDF original, as tarefas marcadas como **"Eu"** ou **"Pedro"** foram todas
atribuídas ao perfil **"Pedro Melo"** (264 tarefas). Essa regra deve ser
mantida em qualquer reimportação.

### Time atual
Luiza, Vitão, Thiago, Marcela, Marcelo, Pedro Melo, Gabs, Cris, Vitor Chalezinho.

Aparecem também nos cards, sem serem membros formais (renderizam com cor
neutra cinza): "Ju", "Equipe" e "—" (quando não há responsável definido).

### Modelo de dados

```js
// tarefa
{id, title, category, description, responsible:[nomes],
 dueDate:'YYYY-MM-DD', presentDate:'YYYY-MM-DD',
 status:'pendente'|'em andamento'|'concluído',
 size:'P'|'M'|'G', won:boolean}

// membro do time
{name, color, svg:null, startDate:'YYYY-MM-DD', role:''}
```

---

## Firebase (sincronização em tempo real)

Configurado no topo do `assets/app.js`, no objeto `FIREBASE_CONFIG`.
Projeto: **ns-criacao**. Usa **Realtime Database**, no caminho `demandas`.

Comportamento da inicialização (`load()` → `initFirebase()`):
1. A tela **sempre renderiza primeiro** com os dados locais — nunca fica em branco
2. Depois conecta ao Firebase em segundo plano
3. Se o banco estiver **vazio**, ele é **semeado** automaticamente com as 841 demandas
4. Um listener `onValue` mantém tudo sincronizado ao vivo entre os usuários
5. Se o Firebase falhar, o app continua funcionando com `localStorage` e mostra
   "Sem sincronização" no indicador do canto inferior direito

> A chave de API do Firebase para web é pública por natureza (fica visível no
> navegador) e não é um segredo — a segurança vem das **regras** do Realtime
> Database. Ainda assim, vale conferir as regras antes de uso em produção.

### Estado do banco (22/09/2026)

Passei uma tarde achando que o modo de teste do Firebase tinha expirado: toda
leitura devolvia `401 Permission denied`. **A hipótese estava errada** — as
regras apareceram já abertas no console. Não sei qual era o estado anterior;
sei que depois de publicar `.read`/`.write` em `true` o acesso voltou.

Fica o registro: `401 Permission denied` no Realtime Database diz só "a regra
negou", não *por quê*. Só o console mostra a regra em vigor.

**O que foi feito com o banco nessa rodada:**

- Backup completo antes de qualquer escrita, em duas cópias: local e dentro do
  próprio banco, em `demandas/_backup/<carimbo>`, que sobrevive ao fim da
  sessão.
- O banco tinha 749 tarefas em **lista por posição** (schema 1), sem nó
  `users`, e com `dark` e `collapsed` gravados — preferência de cada pessoa,
  que hoje mora no navegador. Foi regravado como **mapa por id** (schema 2),
  que é o formato que o app usa, e as duas preferências saíram.
- 14 tarefas concluídas que só existiam no banco eram duplicatas da pauta
  (mesma demanda com limpeza de título diferente) e saíram.
- 5 tarefas **em aberto** só existiam no banco, criadas pelo time no app. Todas
  foram mantidas, cada uma com um aviso na `description` dizendo de onde veio.
  Três apontam a provável duplicata na pauta; as outras duas dizem o que são,
  porque chamá-las de duplicata seria falso.
- `team` (9 pessoas) e `log` preservados como estavam.

Resultado: **846 demandas no banco** contra 841 na semente do `app.js`. A
diferença são essas 5. Elas entram na semente sozinhas se forem acrescentadas
ao texto da pauta; forçar a igualdade na mão quebraria a idempotência da
ferramenta.

### ⚠ O banco está aberto para qualquer pessoa

As regras são `.read: true` e `.write: true`, e a URL está no `app.js` público.
Quem tiver o link do site lê tudo e **apaga tudo** com um comando. Foi uma
escolha consciente para destravar o time, e é temporária — o fechamento de
verdade é Firebase Auth com `auth != null`, receita no README. Enquanto não
for feito, o `_backup` no próprio banco é a rede de proteção.

---

## Hospedagem (decidido em set/2026)

O projeto saiu de `demandas/`, dentro do repo `thiagocastrofo/Claude`, e passou a
ter repo próprio e privado: **`criacao-nasala`**. A estrutura separa o que é
publicado do que é fonte:

```
site/    ← o ÚNICO diretório que vai ao ar (index.html + assets + robots.txt)
docs/    ← este arquivo
testes/  ← bateria Playwright + auditorias
```

Hospedeiro: **Render**, site estático grátis, deploy a cada push na `main`,
configurado pelo `render.yaml` da raiz. Não hiberna (isso vale para *web
services*). Descartados: GitHub Pages (exige repo público na conta free, e o
`app.js` carrega demanda real de cliente) e Vercel (plano grátis proíbe uso
comercial).

### `Cache-Control: no-cache` não pode sair do render.yaml

Não existe build, então `app.js` e `styles.css` nunca mudam de nome. Sem esse
header o navegador serve a versão antiga depois de um deploy e o time roda
código velho sem perceber. Isso não é hipótese: aconteceu no meu próprio
Chromium durante os testes desta sessão — a tela mostrou o layout anterior
porque o `app.js` veio do cache. "no-cache" não quer dizer "não guarde", quer
dizer "revalide antes de usar"; o custo é um 304 em 360 KB.

### Os testes rodam contra os headers de verdade

`testes/servir.mjs` **lê os headers do `render.yaml`** em vez de repetir a lista.
Assim não há deriva: mexeu no header do Render, a bateria passa a exercitar o
header novo sozinha. E `testes/executar.mjs` se recusa a rodar se houver outro
servidor na porta sem esses headers.

### Conte o código de saída, não as linhas de FAIL

O runner antigo contava `grep -c FAIL` na saída. Uma suíte que **quebra** não
imprime linha `FAIL` nenhuma, então crash virava "0 falhas". Foi assim que o
`auth.mjs` ficou rodadas inteiras quebrado (apontava para `#btnMore`, que virou
`#btnAccount` no redesenho) sendo reportado como verde. `executar.mjs` usa o
código de saída do processo.

---

## Preferências de trabalho

- Responder em **português do Brasil**
- Trabalhar nos **arquivos separados** (`site/index.html`, `site/assets/styles.css`,
  `site/assets/app.js`)
- Sempre rodar `node --check site/assets/app.js` e `node testes/executar.mjs`
  antes de entregar
- Manter a estética Apple já estabelecida e as sete regras da seção **Design**
