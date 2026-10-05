from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND
from editorial import EDGE, INK, MUTED, PAPER, SILVER
from materials import RED


art = Canvas(
    '00-overview', 1600, 1280,
    'Dragon Database — Steel Masthead banner refinements v7',
    'Inset and full-bleed top-banner variations of Steel Masthead. Both move the steel banner beneath the header and add curling black flames, subtle flying dragon silhouettes, scales on the Scaling S, and dragon eyes inside the two Collection o letters.'
)
art.rect(0, 0, 1600, 1280, SILVER)
art.text('DRAGON DATABASE / ROUND 07', 48, 50, 17, MUTED, 'medium', 2)
art.text('Steel Masthead / Banner studies', 48, 98, 42, INK, 'medium')
art.text('Curling flames · Flying silhouettes · Dragon lettering', 1552, 94, 18, MUTED, 'body', anchor='end')
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
    ('01', 'steel-masthead-inset', 'Inset Banner', 'Top banner aligned to the content margins'),
    ('02', 'steel-masthead-fullbleed', 'Full-Bleed Banner', 'Top banner extending from edge to edge'),
]
for index, (number, slug, title, detail) in enumerate(concepts):
    x = 48 + index * 784
    art.text(f'{number} / {title}', x, 161, 29, INK, 'medium')
    art.text(detail, x, 188, 18, MUTED)
    art.rect(x, 211, 720, 450, PAPER, stroke=EDGE)
    place(f'{number}-{slug}-desktop.svg', x, 211, 720 / 1440, f'overview-desktop-{number}')
    art.text('DESKTOP / 1440 × 900', x, 688, 13, MUTED, 'medium', 1.2)
    art.rect(x + 247, 711, 226, 226 * 844 / 390, PAPER, stroke=EDGE)
    place(f'{number}-{slug}-mobile.svg', x + 247, 711, 226 / 390, f'overview-mobile-{number}')
    art.text('MOBILE / 390 × 844', x + 360, 1224, 13, MUTED, 'medium', 1.2, 'middle')

art.line(48, 1242, 1552, 1242, EDGE)
art.text('Logo: DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0. UI and decorated heading: Alegreya Sans · SIL OFL.', 48, 1265, 14, MUTED)
art.save()
