"""Monta o payload do banco e escreve, com backup dentro do próprio banco.

A lista final é a pauta (841) mais as 5 demandas em aberto que só existiam no
banco. Cada uma das 5 leva um aviso na descrição dizendo de onde veio — três
apontam a provável duplicata na pauta, e as outras duas dizem o que são de
verdade, porque chamá-las de duplicada seria falso.
"""
import json, glob, re, importlib.util, urllib.request, sys
from collections import Counter

S = '/tmp/claude-0/-home-user-Claude/2cea2333-aead-5cb1-bbf9-06214c5f6c0b/scratchpad'
BASE = 'https://ns-criacao-default-rtdb.firebaseio.com'
RAIZ = '/home/user/criacao-nasala'

spec = importlib.util.spec_from_file_location('ft', RAIZ + '/ferramentas/pauta-para-tarefas.py')
ft = importlib.util.module_from_spec(spec); spec.loader.exec_module(ft)

backup_path = sorted(glob.glob(S + '/backup-*.json'))[-1]
antigo = json.load(open(backup_path))
banco = [x for x in antigo['tasks'] if x]
pauta, _, _ = ft.tarefas_atuais(open(RAIZ + '/site/assets/app.js', encoding='utf-8').read())

def nu(t): return re.sub(r'\d', '', ft.chave(t))
na_pauta = {nu(p['title']) for p in pauta}
orfas = [b for b in banco if nu(b['title']) not in na_pauta]
pendentes = [b for b in orfas if b['status'] != 'concluído']

# O aviso é por demanda, porque as cinco não são a mesma coisa.
AVISOS = {
    'Superminas':
        'Veio do banco, não está na pauta. Possível duplicata de '
        '"Xeque Mate SuperMinas" (STAND BY).',
    'Natal Parque Villa Lobos Até Dezembro':
        'Veio do banco, não está na pauta. Possível duplicata de '
        '"Natal Até Dezembro" (CONTÍNUOS).',
    'naSala + nSeventos + nSessions KV Guide 30/07':
        'Veio do banco, não está na pauta. Possível duplicata de '
        '"naSala e nSeventos KV" (STAND BY).',
    'O Boticário C14 13/07 Planejamento Touchpoint + Moodboard':
        'Veio do banco, não está na pauta. Não encontrei par — parece demanda '
        'própria, criada no app.',
    'DEMANDA TESTE':
        'Veio do banco, não está na pauta. Parece entrada de teste; pode apagar.',
}

proximo = max(p['id'] for p in pauta) + 1
final = list(pauta)
for b in pendentes:
    final.append({
        'id': proximo,
        'title': b['title'],
        'category': b.get('category', 'NSCO'),
        'description': AVISOS.get(b['title'], 'Veio do banco, não está na pauta.'),
        'responsible': b.get('responsible') or ['—'],
        'dueDate': b.get('dueDate', ''),
        'presentDate': b.get('presentDate', ''),
        'status': b.get('status', 'pendente'),
        'size': b.get('size', 'M'),
        'won': bool(b.get('won', False)),
    })
    proximo += 1

assert len({t['id'] for t in final}) == len(final), 'id repetido'

# O app grava as tarefas como mapa por id; o banco ainda estava em lista por
# posição, de antes dessa mudança. Gravar no formato que o app usa hoje.
payload = {
    'tasks': {str(t['id']): t for t in final},
    'team': antigo.get('team', []),
    'appTitle': antigo.get('appTitle', 'Gestão de Demandas'),
    'log': antigo.get('log', []),
    'schema': 2,
    # `dark` e `collapsed` não voltam: são preferência de cada pessoa e hoje
    # moram no navegador — no banco, a escolha de um virava a de todos.
}

print(f'lista final: {len(final)} demandas')
print('  por casa:', dict(Counter(t['category'] for t in final)))
print('  situação:', dict(Counter(t['status'] for t in final)))
print(f'  vindas do banco com aviso: {len(pendentes)}')
print(f'  saem (concluídas duplicadas): {len(orfas) - len(pendentes)}')
print(f'  time preservado: {len(payload["team"])} pessoas · log: {len(payload["log"])} entradas')

if '--escrever' not in sys.argv:
    print('\n(nada foi gravado — use --escrever)')
    sys.exit()

def put(caminho, dados):
    req = urllib.request.Request(f'{BASE}/{caminho}.json', method='PUT',
                                 data=json.dumps(dados, ensure_ascii=False).encode(),
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.status

# 1. backup dentro do próprio banco, para sobreviver ao fim desta sessão
carimbo = re.search(r'backup-(\d{8}T\d{6}Z)', backup_path).group(1)
print(f'\ngravando backup em demandas/_backup/{carimbo} …', end=' ', flush=True)
print(put(f'demandas/_backup/{carimbo}', antigo))

# 2. a lista nova
for no, dados in payload.items():
    print(f'gravando demandas/{no} …', end=' ', flush=True)
    print(put(f'demandas/{no}', dados))

# 3. tirar as preferências pessoais que não deviam estar no banco
for no in ('dark', 'collapsed'):
    req = urllib.request.Request(f'{BASE}/demandas/{no}.json', method='DELETE')
    with urllib.request.urlopen(req, timeout=60) as r:
        print(f'removendo demandas/{no} …', r.status)
