#!/usr/bin/env python3
"""
Converte um letreiro em .ai (ou .pdf) num SVG inline pronto para o `MARKS`
do app.js: um só sistema de coordenadas, viewBox colado na arte, sem `fill`
por forma — quem tinge é o `currentColor` do `<svg>`, para a marca acender
junto com o estado do controle.

    pip install pymupdf
    python3 ferramentas/ai-para-svg.py logo.ai > marca.svg

Por que PyMuPDF e não Inkscape: um .ai da Adobe é PDF por dentro, e o
`get_drawings()` devolve os itens já em coordenadas de página com y para
baixo — a mesma orientação do SVG. Dá para achatar tudo num `d` único, sem
`transform` por forma, que é o que deixa a marca pequena e legível no código.

Depois de gerar, sobra o trabalho que nenhum script faz: **recalibrar a
altura ótica**. `MARK_H` e `MARK_H2` no app.js são por marca justamente
porque as proporções são muito diferentes entre si. Compare a marca nova ao
lado das outras duas na gaveta de casas antes de dar por pronto.
"""
import sys

CASAS = 2   # precisão suficiente para um letreiro de ~15px de altura


def n(v):
    s = f"{round(v, CASAS):.{CASAS}f}".rstrip('0').rstrip('.')
    return s if s not in ('', '-0') else '0'


def ponto(p):
    return f"{n(p.x)},{n(p.y)}"


def caminho(itens):
    """Itens do PyMuPDF → um atributo `d` contínuo."""
    d, atual = [], None
    for it in itens:
        if it[0] == 'l':
            a, b = it[1], it[2]
            if atual is None or abs(a.x - atual.x) > 1e-6 or abs(a.y - atual.y) > 1e-6:
                d.append(f"M{ponto(a)}")
            d.append(f"L{ponto(b)}")
            atual = b
        elif it[0] == 'c':
            a, c1, c2, b = it[1], it[2], it[3], it[4]
            if atual is None or abs(a.x - atual.x) > 1e-6 or abs(a.y - atual.y) > 1e-6:
                d.append(f"M{ponto(a)}")
            d.append(f"C{ponto(c1)} {ponto(c2)} {ponto(b)}")
            atual = b
        elif it[0] == 're':
            r = it[1]
            d.append(f"M{n(r.x0)},{n(r.y0)}H{n(r.x1)}V{n(r.y1)}H{n(r.x0)}Z")
            atual = None
        elif it[0] == 'qu':
            q = it[1]
            d.append(f"M{ponto(q.ul)}L{ponto(q.ur)}L{ponto(q.lr)}L{ponto(q.ll)}Z")
            atual = None
    return ''.join(d) + 'Z'


def main(origem):
    import pymupdf
    pagina = pymupdf.open(origem)[0]
    desenhos = pagina.get_drawings()
    if not desenhos:
        sys.exit('nenhum vetor encontrado — o arquivo é imagem rasterizada?')

    xs, ys = [], []
    for dr in desenhos:
        r = dr['rect']
        xs += [r.x0, r.x1]
        ys += [r.y0, r.y1]
    x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
    vb = f"{n(x0)} {n(y0)} {n(x1 - x0)} {n(y1 - y0)}"

    formas = ''.join(f'<path d="{caminho(dr["items"])}"/>' for dr in desenhos)
    print(f'<svg fill="currentColor" aria-hidden="true" focusable="false" '
          f'viewBox="{vb}">{formas}</svg>')

    prop = (x1 - x0) / (y1 - y0)
    print(f'\n<!-- {len(desenhos)} formas · proporção {prop:.2f} (largura/altura) -->',
          file=sys.stderr)
    print(f'<!-- a 15px de altura a marca mede {15 * prop:.0f}px de largura -->',
          file=sys.stderr)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
