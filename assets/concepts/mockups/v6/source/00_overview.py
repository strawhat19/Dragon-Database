from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND
from editorial import EDGE, INK, MUTED, PAPER, SILVER
from materials import RED


art = Canvas(
    '00-overview', 1600, 1080,
    'Dragon Database — The Scaling Collection material studies v6',
    'Three new desktop and mobile hero layouts explore silver and black with subtle oxblood red, black flame silhouettes, and brushed steel. Crimson Foundry, Steel Masthead, and Obsidian Ledger preserve the selected Dragon Database logo and The Scaling Collection heading.'
)
art.rect(0, 0, 1600, 1080, SILVER)
art.text('DRAGON DATABASE / ROUND 06', 48, 50, 17, MUTED, 'medium', 2)
art.text('The Scaling Collection', 48, 98, 42, INK, 'medium')
art.text('Silver · Black flames · Brushed steel · Oxblood accents', 1552, 94, 19, MUTED, 'body', anchor='end')
art.line(48, 119, 1552, 119, EDGE)
art.line(48, 119, 122, 119, RED, 2)


def place(filename, x, y, scale, prefix):
    root = ET.parse(ROUND / filename).getroot()
    markup = ''.join(ET.tostring(deepcopy(item), encoding='unicode') for item in root)
    ids = set(re.findall(r'\bid="([^"]+)"', markup))
    replacements = {old: f'{prefix}-{old}' for old in ids}
    pattern = re.compile('|'.join(re.escape(old) for old in sorted(ids, key=len, reverse=True)))
    markup = pattern.sub(lambda match: replacements[match.group()], markup)
    art.add(f'<g transform="translate({x} {y}) scale({scale})">{markup}</g>')


concepts = [
    ('01', 'crimson-foundry', 'Crimson Foundry', 'Open silver hero / offset steel artwork'),
    ('02', 'steel-masthead', 'Steel Masthead', 'Centered editorial / horizontal metal band'),
    ('03', 'obsidian-ledger', 'Obsidian Ledger', 'Charcoal hero / silver catalog'),
]
for index, (number, slug, title, detail) in enumerate(concepts):
    x = 48 + index * 520
    art.text(f'{number} / {title}', x, 160, 25, INK, 'medium')
    art.text(detail, x, 186, 17, MUTED)
    art.rect(x, 207, 464, 290, PAPER, stroke=EDGE)
    place(f'{number}-{slug}-desktop.svg', x, 207, 464 / 1440, f'overview-desktop-{number}')
    art.text('DESKTOP / 1440 × 900', x, 524, 12, MUTED, 'medium', 1.2)
    art.rect(x + 129, 550, 206, 446, PAPER, stroke=EDGE)
    place(f'{number}-{slug}-mobile.svg', x + 129, 550, 206 / 390, f'overview-mobile-{number}')
    art.text('MOBILE / 390 × 844', x + 232, 1024, 12, MUTED, 'medium', 1.2, 'middle')

art.line(48, 1043, 1552, 1043, EDGE)
art.text('Logo: DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0. Hero and UI: Alegreya Sans · SIL OFL.', 48, 1066, 14, MUTED)
art.save()
