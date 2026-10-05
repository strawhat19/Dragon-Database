from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND


art = Canvas(
    '00-overview', 1600, 1080,
    'Dragon Database — Silver Codex hero mockup comparison v3',
    'Three desktop and mobile hero concepts combine the selected Swordslapper Classic underline logo, Armory silver-and-black colors, Obsidian Codex editorial layout, and illustrated dragon type cards.'
)
art.rect(0, 0, 1600, 1080, '#101115')
art.text('DRAGON DATABASE / ROUND 03', 48, 50, 17, '#ADB5C0', 'bold', 3)
art.text('Silver, steel, and dragon lore.', 48, 97, 38, '#E4E7EB', 'bold')
art.text('Classic underline logo · Armory palette · Codex composition', 1552, 95, 19, '#ADB5C0', 'medium', anchor='end')
art.line(48, 116, 1552, 116, '#444B55')


def place(filename, x, y, scale, prefix):
    root = ET.parse(ROUND / filename).getroot()
    markup = ''.join(ET.tostring(deepcopy(item), encoding='unicode') for item in root)
    ids = set(re.findall(r'\bid="([^"]+)"', markup))
    replacements = {old: f'{prefix}-{old}' for old in ids}
    pattern = re.compile('|'.join(re.escape(old) for old in sorted(ids, key=len, reverse=True)))
    markup = pattern.sub(lambda match: replacements[match.group()], markup)
    art.add(f'<g transform="translate({x} {y}) scale({scale})">{markup}</g>')


concepts = [
    ('01', 'silver-codex', 'Silver Codex', 'Pale silver editorial hero'),
    ('02', 'ironbound-archive', 'Ironbound Archive', 'Layered silver on charcoal'),
    ('03', 'splitsteel-bestiary', 'Splitsteel Bestiary', 'Asymmetric silver and black'),
]
for index, (number, slug, title, detail) in enumerate(concepts):
    x = 48 + index * 520
    art.text(f'{number} / {title}', x, 156, 23, '#E4E7EB', 'bold')
    art.text(detail, x, 181, 17, '#ADB5C0')
    place(f'{number}-{slug}-desktop.svg', x, 201, 464 / 1440, f'overview-desktop-{number}')
    art.text('DESKTOP / 1440 × 900', x, 520, 12, '#ADB5C0', 'bold', 1.4)
    place(f'{number}-{slug}-mobile.svg', x + 129, 548, 206 / 390, f'overview-mobile-{number}')
    art.text('MOBILE / 390 × 844', x + 232, 1023, 12, '#ADB5C0', 'bold', 1.4, 'middle')

art.text('DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0 · Original font unchanged', 48, 1063, 14, '#ADB5C0')
art.save()
