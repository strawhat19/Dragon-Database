from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND


art = Canvas(
    '00-overview', 1600, 1080,
    'Dragon Database — Obsidian and Armory hero mockups v2',
    'Obsidian Bestiary and Armory Directory shown on desktop and mobile. Both feature the unchanged selected Hybrid logo, Dragon Dictionary links, and illustrated dragon type cards. Obsidian uses the licensed original DragonSlapper font.'
)
art.rect(0, 0, 1600, 1080, '#101115')
art.text('DRAGON DATABASE', 48, 50, 17, '#ADB5C0', 'bold', 3)
art.text('Hero studies / Round 02', 48, 98, 37, '#EEF0F3', 'bold')
art.text('Dragon Dictionary + dragon type cards', 1552, 94, 21, '#ADB5C0', 'medium', 0, 'end')
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
    ('01', 'obsidian-bestiary', 'Obsidian Bestiary', 'DragonSlapper headlines · Charcoal and silver'),
    ('02', 'armory-directory', 'Armory Directory', 'Metal Mania headlines · Silver archive workspace'),
]
for index, (number, slug, title, detail) in enumerate(concepts):
    x = 48 + index * 780
    art.text(f'{number} / {title}', x, 158, 26, '#EEF0F3', 'bold')
    art.text(detail, x, 186, 18, '#ADB5C0')
    place(f'{number}-{slug}-desktop.svg', x, 208, 724 / 1440, f'overview-desktop-{number}')
    art.text('DESKTOP / 1440 × 900', x, 690, 12, '#ADB5C0', 'bold', 1.4)
    mobile_x = x + 44
    place(f'{number}-{slug}-mobile.svg', mobile_x, 716, 150 / 390, f'overview-mobile-{number}')
    art.text('MOBILE', x + 236, 757, 14, '#ADB5C0', 'bold', 2)
    art.text('390 × 844', x + 236, 787, 20, '#EEF0F3', 'medium')
    art.text('Visible Dictionary link', x + 236, 841, 20, '#EEF0F3')
    art.text('Two full dragon type cards', x + 236, 875, 20, '#EEF0F3')
    art.text('Public browsing first', x + 236, 909, 20, '#EEF0F3')

art.text('DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0 · Original font unchanged', 48, 1066, 14, '#ADB5C0')
art.save()
