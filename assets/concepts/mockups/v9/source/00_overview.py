from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND
from editorial import EDGE, INK, MUTED, PAPER, SILVER
from materials import RED


art = Canvas(
    '00-overview', 1600, 1040,
    'Dragon Database — Search in Steel refined v9',
    'The focused Search in Steel desktop and mobile concept uses DragonSlapper for the main Dragon Database heading, The Scaling Collection as a decorated subheading, angular black flames, larger flying dragons, and title-and-symbol dragon cards.'
)
art.rect(0, 0, 1600, 1040, SILVER)
art.text('DRAGON DATABASE / ROUND 09', 48, 50, 17, MUTED, 'medium', 2)
art.text('Search in Steel / Refined', 48, 98, 42, INK, 'medium')
art.text('DragonSlapper H1 · Scaled S / g eye · Symbol cards', 1552, 94, 19, MUTED, 'body', anchor='end')
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


art.text('Desktop / Dragon Database on one line', 48, 166, 24, INK, 'medium')
place('01-search-in-steel-desktop.svg', 48, 192, 1080 / 1440, 'overview-desktop')
art.text('DESKTOP / 1440 × 900', 48, 899, 13, MUTED, 'medium', 1.2)
art.text('Mobile / Stacked H1', 1236, 166, 24, INK, 'medium')
place('01-search-in-steel-mobile.svg', 1218, 192, 334 / 390, 'overview-mobile')
art.text('MOBILE / 390 × 844', 1385, 954, 13, MUTED, 'medium', 1.2, 'middle')
art.line(48, 1003, 1552, 1003, EDGE)
art.text('Logo / H1: DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0. Subheading / UI: Alegreya Sans · SIL OFL.', 48, 1026, 14, MUTED)
art.save()
