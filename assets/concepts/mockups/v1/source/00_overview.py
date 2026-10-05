from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND


art = Canvas(
    '00-overview', 1600, 1060,
    'Dragon Database — landing page hero mockup comparison',
    'Three silver and black above-the-fold landing page directions, each shown as a desktop hero and mobile hero. All reuse the selected v7 Swordmaw Hybrid logo.'
)
art.rect(0, 0, 1600, 1060, '#101115')
art.text('DRAGON DATABASE', 48, 51, 17, '#ADB5C0', 'bold', 3)
art.text('Hero studies / Round 01', 48, 98, 37, '#EEF0F3', 'bold')
art.text('Swordmaw Hybrid identity · Silver and black · Desktop + mobile', 1552, 95, 18, '#ADB5C0', 'body', 0, 'end')
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
    ('01', 'obsidian-codex', 'Obsidian Codex', 'Dramatic split hero'),
    ('02', 'silver-atlas', 'Silver Atlas', 'Centered silver editorial'),
    ('03', 'the-armory', 'The Armory', 'Search-led archive workspace'),
]
for index, (number, slug, title, description) in enumerate(concepts):
    x = 48 + index * 520
    art.text(f'{number} / {title}', x, 156, 23, '#EEF0F3', 'bold')
    art.text(description, x, 181, 17, '#ADB5C0')
    place(f'{number}-{slug}-desktop.svg', x, 201, 464 / 1440, f'overview-desktop-{number}')
    art.text('DESKTOP / 1440 × 900', x, 520, 12, '#ADB5C0', 'bold', 1.4)
    mobile_x = x + (464 - 206) / 2
    place(f'{number}-{slug}-mobile.svg', mobile_x, 548, 206 / 390, f'overview-mobile-{number}')
    art.text('MOBILE / 390 × 844', x + 232, 1023, 12, '#ADB5C0', 'bold', 1.4, 'middle')

art.save()
