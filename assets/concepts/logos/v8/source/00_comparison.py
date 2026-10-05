from copy import deepcopy
import re
import xml.etree.ElementTree as ET

from artwork import Canvas, ROUND


art = Canvas(
    '00-concept-sheet', 1200, 1120,
    'Dragon Database — DragonSlapper sword logo concepts v8',
    'Two black and silver Dragon Database logo concepts: DragonSlapper with the original sword underline, and a variation with a sword-shaped T integrated into Database. Both preserve the selected Swordmaw Hybrid dragon art.'
)
art.rect(0, 0, 1200, 1120, '#101115')
art.text('DRAGON DATABASE / LOGO ROUND 08', 72, 45, 14, '#ADB5C0', 'bold', 2.2)
art.text('DragonSlapper sword wordmarks', 72, 93, 42, '#E4E7EB', 'bold')
art.text('Your selected dragon art, paired with the original CC BY-SA DragonSlapper release.', 72, 125, 20, '#ADB5C0')


def place(filename, x, y, scale, prefix):
    root = ET.parse(ROUND / filename).getroot()
    markup = ''.join(ET.tostring(deepcopy(item), encoding='unicode') for item in root)
    ids = set(re.findall(r'\bid="([^"]+)"', markup))
    replacements = {old: f'{prefix}-{old}' for old in ids}
    pattern = re.compile('|'.join(re.escape(old) for old in sorted(ids, key=len, reverse=True)))
    markup = pattern.sub(lambda match: replacements[match.group()], markup)
    art.add(f'<g transform="translate({x} {y}) scale({scale})">{markup}</g>')


art.text('01 / Swordslapper Classic — original sword underline', 72, 166, 22, '#E4E7EB', 'medium')
place('01-db-swordslapper-classic.svg', 72, 182, 1.1, 'comparison-classic')
art.text('02 / Sword-T — a sword inside “Database”', 72, 622, 22, '#E4E7EB', 'medium')
place('02-db-swordslapper-sword-t.svg', 72, 638, 1.1, 'comparison-sword-t')

art.text('DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0', 72, 1072, 18, '#ADB5C0')
art.text('Font file unchanged. Outlined lettering and its adaptations retain CC BY-SA 3.0.', 72, 1097, 15, '#ADB5C0')
art.save()
