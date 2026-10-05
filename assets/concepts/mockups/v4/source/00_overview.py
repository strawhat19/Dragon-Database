from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND
from editorial import EDGE, INK, MUTED, PAPER, SILVER


art = Canvas(
    '00-overview', 1600, 1080,
    'Dragon Database — Silver Codex refined, mockup comparison v4',
    'Three professional desktop and mobile hero concepts refine Silver Codex with restrained typography, matte silver surfaces, fine rules, understated dragon cards, and the selected Swordslapper Classic logo.'
)
art.rect(0, 0, 1600, 1080, SILVER)
art.text('DRAGON DATABASE / ROUND 04', 48, 50, 17, MUTED, 'medium', 2)
art.text('Silver Codex, refined.', 48, 98, 42, INK, 'medium')
art.text('Matte silver · Clean typography · Quiet detail', 1552, 94, 19, MUTED, 'body', anchor='end')
art.line(48, 119, 1552, 119, EDGE)


def place(filename, x, y, scale, prefix):
    root = ET.parse(ROUND / filename).getroot()
    markup = ''.join(ET.tostring(deepcopy(item), encoding='unicode') for item in root)
    ids = set(re.findall(r'\bid="([^"]+)"', markup))
    replacements = {old: f'{prefix}-{old}' for old in ids}
    pattern = re.compile('|'.join(re.escape(old) for old in sorted(ids, key=len, reverse=True)))
    markup = pattern.sub(lambda match: replacements[match.group()], markup)
    art.add(f'<g transform="translate({x} {y}) scale({scale})">{markup}</g>')


concepts = [
    ('01', 'codex-editorial', 'Codex Editorial', 'Clear hierarchy, open space, restrained cards'),
    ('02', 'codex-folio', 'Codex Folio', 'Literary serif, quiet rules, generous margins'),
    ('03', 'codex-studio', 'Codex Studio', 'Modern catalog, compact brand, precise grid'),
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
art.text('Logo: DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0. UI: Alegreya Sans / Grenze Regular · SIL OFL.', 48, 1066, 14, MUTED)
art.save()
