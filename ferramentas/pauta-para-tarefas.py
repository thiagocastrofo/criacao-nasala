#!/usr/bin/env python3
"""
Converte a pauta em texto nas demandas do `site/assets/app.js`.

    python3 ferramentas/pauta-para-tarefas.py pauta.txt            # só relatório
    python3 ferramentas/pauta-para-tarefas.py pauta.txt --aplicar  # escreve

A pauta é aquele texto com `- [x]` / `- [ ]` agrupado em EQUIPE, STAND BY,
CONTÍNUOS, CIDADE e EVENTOS. Três coisas que o script resolve e que são fáceis
de errar na mão:

1. **Ano.** A pauta só tem dia/mês e atravessa a virada de ano. A passagem é
   cronológica por seção, e a virada só conta quando o mês despenca de
   out/nov/dez para jan/fev/mar. Virar a cada mês que diminui não funciona: a
   pauta tem itens fora de ordem digitados errado, e um deles sozinho
   cascatearia o erro por centenas de linhas.

2. **Responsável.** O parêntese final vem cheio de ruído real ("Cardápio - Eu +
   Vitão", "Ana Vi pediu que fosse Marcelo", "Luiza cobrindo Marcelo"). Em vez
   de tentar entender a gramática de cada caso, varre a linha atrás de nomes
   conhecidos. "Eu" e "Pedro" são a mesma pessoa, Pedro Melo — regra antiga do
   projeto, não mexa.

3. **Não trocar tudo à toa.** Casa cada linha com a demanda que já existe no
   `app.js` por uma chave tolerante (ignora hora, parêntese e apóstrofo curvo)
   e, quando casa, mantém o id e o título de lá. O que atualiza é situação,
   data, responsável e categoria.

Depois de aplicar, rode `node testes/executar.mjs`.
"""
import json, re, sys, unicodedata
from collections import Counter
from pathlib import Path

HORA = re.compile(
    r'\s*[-–]?\s*(at[ée]\s+)?(meio-?dia|fim do dia|\d{1,2}\s*h(\d{2})?|\d{1,2}:\d{2})\s*$',
    re.I)


def chave(t):
    """Chave de casamento: o que sobra depois de tirar a variação de digitação."""
    t = t.replace('’', "'").replace('‘', "'")
    t = re.sub(r'\([^()]*\)', ' ', t)   # "(1o) + (2o)", "(10 modelos)"
    t = re.sub(r'\([^()]*$', ' ', t)     # parêntese que a origem não fechou
    for _ in range(3):
        t = HORA.sub('', t)
    t = unicodedata.normalize('NFD', t)
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn').lower()
    t = re.sub(r'[^a-z0-9]+', '', t)
    return t



SECOES = {
    'EQUIPE': 'NSCO', 'STAND BY': 'NSCO', 'CONTÍNUOS': 'NSCO',
    'CIDADE': 'CIDADE', 'EVENTOS': 'EVENTOS',
}

# Regra do CONTEXTO: "Eu" e "Pedro" são a mesma pessoa, Pedro Melo.
APELIDOS = {
    'eu': 'Pedro Melo', 'pedro': 'Pedro Melo', 'pedro melo': 'Pedro Melo',
    'lu': 'Luiza', 'luiza': 'Luiza',
    'vitão': 'Vitão', 'vitao': 'Vitão',
    'thiago': 'Thiago', 'marcela': 'Marcela', 'marcelo': 'Marcelo',
    'gabs': 'Gabs', 'cris': 'Cris',
    'vitor chalezinho': 'Vitor Chalezinho', 'vitor chalé': 'Vitor Chalezinho',
    'vitor chale': 'Vitor Chalezinho',
    # Aparecem nos cards sem serem membros formais (CONTEXTO)
    'ju': 'Ju', 'equipe': 'Equipe',
}
# Mais longos primeiro: "Vitor Chalezinho" antes de "Vitor".
NOMES = sorted(APELIDOS, key=len, reverse=True)


def sem_acento(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
                   if unicodedata.category(c) != 'Mn').lower()


def pessoas(trecho):
    """Procura nomes conhecidos no trecho inteiro, não só no formato esperado.

    O parêntese final vem cheio de ruído real: "Cardápio - Eu + Vitão",
    "Ana Vi pediu que fosse Marcelo", "Vitão Apresentação | Gabs Mockups",
    "Luiza cobrindo Marcelo". Varrer por nome conhecido aguenta tudo isso;
    tentar entender a gramática de cada caso, não.
    """
    t = sem_acento(trecho)
    achados, usado = [], [False] * len(t)
    for nome in NOMES:
        n = sem_acento(nome)
        for m in re.finditer(r'(?<![a-z0-9])' + re.escape(n) + r'(?![a-z0-9])', t):
            if any(usado[m.start():m.end()]):
                continue
            for i in range(m.start(), m.end()):
                usado[i] = True
            achados.append((m.start(), APELIDOS[nome]))
    vistos, saida = set(), []
    for _, nome in sorted(achados):
        if nome not in vistos:
            vistos.add(nome)
            saida.append(nome)
    return saida


# 22/05 · 20.06 · 22 /10 · 2407 · 12-15/06 (pega o último dia do intervalo)
DATA = re.compile(r'(\d{1,2})\s*[/.]\s*(\d{1,2})(?!\d)')


def data_crua(texto):
    achadas = DATA.findall(texto)
    if achadas:
        d, m = achadas[-1]
        d, m = int(d), int(m)
        if 1 <= d <= 31 and 1 <= m <= 12:
            return d, m
    # "Michelob Cenografia 2407" — dia e mês colados, sem separador
    m4 = re.search(r'(?<!\d)(\d{2})(\d{2})(?!\d)', texto)
    if m4:
        d, m = int(m4.group(1)), int(m4.group(2))
        if 1 <= d <= 31 and 1 <= m <= 12:
            return d, m
    return None


def limpa_titulo(bruto):
    """Tira só o parêntese final de responsáveis; mantém a data e o resto.

    Segue a convenção que já está no banco: "Bernoulli | Moyra 22/05 (Vitão)"
    virou "Bernoulli | Moyra 22/05".
    """
    t = bruto.strip()
    t = re.sub(r'\s*\*[^*]*\*\s*$', '', t)          # *Cancelado*, *Contínuo*
    while True:
        # Pega o ÚLTIMO parêntese e o que vier depois dele. Três linhas da pauta
        # põem uma anotação no fim ("(Vitão) alteração", "(Vitão) * Alterações"):
        # o rabo é anotação, não nome da demanda, e sai junto.
        m = None
        for m in re.finditer(r'\(([^()]*)\)\s*\*?\s*[^()]{0,24}$', t):
            pass
        if not m:
            break
        dentro = m.group(1)
        # Só descarta o parêntese se ele for sobre gente. "(10 modelos)" fica.
        if not pessoas(dentro) and not re.search(r'esperando|equipe', dentro, re.I):
            break
        t = t[:m.start()].rstrip()
    t = re.sub(r'\s*\*\s*$', '', t)
    t = re.sub(r'\s+', ' ', t).strip().rstrip(',')
    return t


def ler(caminho):
    linhas = open(caminho, encoding='utf-8').read().split('\n')
    secao, itens = None, []
    for ln in linhas:
        cab = re.match(r'^([A-ZÀ-Ú][A-ZÀ-Ú ]*):\s*$', ln.strip())
        if cab:
            secao = cab.group(1).strip()
            continue
        m = re.match(r'^-\s*\[( |x|X)\]\s*(.+?)\s*$', ln)
        if not m or secao is None:
            continue
        feito, bruto = m.group(1).lower() == 'x', m.group(2)
        itens.append({
            'secao': secao,
            'category': SECOES.get(secao, 'OUTROS'),
            'title': limpa_titulo(bruto),
            'responsible': pessoas(bruto) or ['—'],
            'status': 'concluído' if feito else 'pendente',
            'dm': data_crua(bruto),
            'bruto': bruto,
        })
    return itens


def com_anos(itens, ano_final):
    """Atribui o ano numa passagem cronológica.

    A lista é cronológica, mas tem itens fora de ordem digitados errado
    ("29/09" no meio de agosto, "28/12" no meio de novembro). Por isso a
    virada de ano só conta quando o mês despenca de out/nov/dez para
    jan/fev/mar — que é uma virada de verdade, não um dedo trocado.
    """
    viradas = []
    ant = None
    for i, it in enumerate(itens):
        if not it['dm']:
            continue
        m = it['dm'][1]
        if ant is not None and ant >= 10 and m <= 3:
            viradas.append(i)
        ant = m
    ano = ano_final - len(viradas)
    v = set(viradas)
    for i, it in enumerate(itens):
        if i in v:
            ano += 1
        if it['dm']:
            d, m = it['dm']
            it['dueDate'] = f'{ano:04d}-{m:02d}-{d:02d}'
        else:
            it['dueDate'] = ''
    return itens, viradas


# ═══════════════════════════════════════════════════
#  APLICAÇÃO
# ═══════════════════════════════════════════════════
RAIZ = Path(__file__).resolve().parent.parent
APP  = RAIZ / 'site' / 'assets' / 'app.js'
ANO_FINAL = 2026          # ano do último item datado da pauta


LINHA = re.compile(
    r'\{id:(?P<id>\d+),title:"(?P<title>(?:[^"\\\\]|\\\\.)*)",category:"(?P<category>[^"]*)",'
    r'description:"(?P<description>(?:[^"\\\\]|\\\\.)*)",responsible:\[(?P<resp>[^\]]*)\],'
    r'dueDate:"(?P<dueDate>[^"]*)",presentDate:"(?P<presentDate>[^"]*)",'
    r'status:"(?P<status>[^"]*)",size:"(?P<size>[^"]*)",won:(?P<won>true|false)\}')


def tarefas_atuais(texto):
    """Lê o bloco `let tasks = [...]` linha a linha.

    Não tenta reinterpretar JavaScript: o bloco é escrito por esta mesma
    ferramenta, num formato fixo de uma tarefa por linha. Converter para JSON
    na marra tropeça em título com dois-pontos ("Dominguinho: copo, tirante").
    """
    i = texto.index('let tasks = [')
    j = texto.index('\n];', i)
    bruto = texto[i:j]
    saida = []
    for m in LINHA.finditer(bruto):
        d = m.groupdict()
        resp = re.findall(r'"((?:[^"\\\\]|\\\\.)*)"', d.pop('resp'))
        desesc = lambda x: x.replace('\\"', '"').replace('\\\\', '\\')
        saida.append({'id': int(d['id']), 'title': desesc(d['title']),
                      'category': d['category'], 'description': desesc(d['description']),
                      'responsible': [desesc(r) for r in resp],
                      'dueDate': d['dueDate'], 'presentDate': d['presentDate'],
                      'status': d['status'], 'size': d['size'],
                      'won': d['won'] == 'true'})
    if not saida:
        sys.exit('não consegui ler as tarefas do app.js — o formato do bloco mudou?')
    return saida, i, j


def montar(caminho_pauta):
    itens = ler(caminho_pauta)
    por_secao = {}
    for it in itens:
        por_secao.setdefault(it['secao'], []).append(it)
    novas = []
    for secao, lista in por_secao.items():
        lista, viradas = com_anos(lista, ANO_FINAL)
        if viradas:
            print(f'  {secao}: virada de ano em "{lista[viradas[0]]["title"][:40]}"')
        novas += lista

    texto = APP.read_text(encoding='utf-8')
    atuais, i, j = tarefas_atuais(texto)
    livres = {}
    for t in atuais:
        livres.setdefault(chave(t['title']), []).append(t)

    proximo = max(t['id'] for t in atuais) + 1
    final, criadas = [], 0
    mudou = Counter()
    for n in novas:
        k = chave(n['title'])
        velha = livres[k].pop(0) if livres.get(k) else None
        if velha:
            for campo in ('status', 'dueDate', 'responsible'):
                if velha[campo] != n[campo]:
                    mudou[campo] += 1
            final.append({**velha, 'category': n['category'],
                          'responsible': n['responsible'],
                          'dueDate': n['dueDate'], 'status': n['status']})
        else:
            criadas += 1
            final.append({'id': proximo, 'title': n['title'], 'category': n['category'],
                          'description': '', 'responsible': n['responsible'],
                          'dueDate': n['dueDate'], 'presentDate': '',
                          'status': n['status'], 'size': 'M', 'won': False})
            proximo += 1
    sobraram = [t for v in livres.values() for t in v]
    return final, criadas, sobraram, mudou, texto, i, j


def escrever(final, texto, i, j):
    esc = lambda s: s.replace('\\', '\\\\').replace('"', '\\"')
    linhas = []
    for t in final:
        resp = ','.join(f'"{esc(x)}"' for x in t['responsible'])
        linhas.append(
            f'  {{id:{t["id"]},title:"{esc(t["title"])}",category:"{t["category"]}",'
            f'description:"{esc(t.get("description", ""))}",responsible:[{resp}],'
            f'dueDate:"{t["dueDate"]}",presentDate:"{t.get("presentDate", "")}",'
            f'status:"{t["status"]}",size:"{t.get("size", "M")}",'
            f'won:{str(t.get("won", False)).lower()}}},')
    novo = texto[:i] + 'let tasks = [\n' + '\n'.join(linhas).rstrip(',') + texto[j:]
    APP.write_text(novo, encoding='utf-8')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    final, criadas, sobraram, mudou, texto, i, j = montar(sys.argv[1])
    print(f'\n{len(final)} demandas · {criadas} novas · {len(sobraram)} saíram')
    print('  por casa:  ', dict(Counter(t['category'] for t in final)))
    print('  situação:  ', dict(Counter(t['status'] for t in final)))
    print('  mudaram:   ', dict(mudou) or 'nada')
    meses = sorted({t['dueDate'][:7] for t in final if t['dueDate']})
    print(f'  meses:      {meses[0]} → {meses[-1]} ({len(meses)} meses)')
    if '--aplicar' in sys.argv:
        escrever(final, texto, i, j)
        print(f'\nescrito em {APP}. Rode: node testes/executar.mjs')
    else:
        print('\n(nada foi escrito — use --aplicar)')
