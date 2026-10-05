from copy import deepcopy
from html import escape
import re
import xml.etree.ElementTree as ET

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen

from artwork import LOGO


INK = '#101115'
PALE = '#E4E7EB'
STEEL = '#C5CBD3'
LICENSE = 'https://creativecommons.org/licenses/by-sa/3.0/'


def silver_background(art):
    gradient = f'{art.name}-silver-background'
    art.defs[gradient] = f'<linearGradient id="{gradient}" x1="0" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#B9C1CC"/><stop offset="0.5" stop-color="#E4E7EB"/><stop offset="1" stop-color="#C5CBD3"/></linearGradient>'
    art.rect(0, 0, art.width, art.height, f'url(#{gradient})')


def underline_sword(art):
    root = ET.parse(LOGO).getroot()
    sword = next(element for element in root.iter() if element.get('id') == 'db-swordmaw-hybrid-wordmark-sword')
    markup = ET.tostring(deepcopy(sword), encoding='unicode')
    ids = set(re.findall(r'\bid="([^"]+)"', markup))
    pattern = re.compile('|'.join(re.escape(old) for old in sorted(ids, key=len, reverse=True)))
    markup = pattern.sub(lambda match: f'{art.name}-{match.group()}', markup)
    art.add(markup)


def outline(art, value, x, top, width, height, overrides=None, label=None):
    font, glyphs, cmap = art.face('slapper')
    overrides = overrides or {}
    records = []
    cursor = 0
    for index, char in enumerate(value):
        if index in overrides:
            record = overrides[index].copy()
        else:
            glyph = glyphs[cmap.get(ord(char), '.notdef')]
            bounds = BoundsPen(glyphs)
            glyph.draw(bounds)
            pen = SVGPathPen(glyphs)
            glyph.draw(pen)
            record = {'bounds': bounds.bounds, 'advance': glyph.width, 'markup': f'<path d="{pen.getCommands()}"/>'}
        record['cursor'] = cursor
        records.append(record)
        cursor += record['advance']
    left = min(record['bounds'][0] + record['cursor'] for record in records if record['bounds'])
    right = max(record['bounds'][2] + record['cursor'] for record in records if record['bounds'])
    bottom = min(record['bounds'][1] for record in records if record['bounds'])
    ceiling = max(record['bounds'][3] for record in records if record['bounds'])
    scale = min(height / (ceiling - bottom), width / (right - left))
    spacing = (width - (right - left) * scale) / max(1, len(records) - 1)
    art.counter += 1
    group_id = f'{art.name}-word-{art.counter}'
    art.add(f'<g id="{group_id}" role="img" aria-label="{escape(label or value, quote=True)}" data-font="DragonSlapper" data-license="{LICENSE}" data-ink-left="{x}" data-ink-right="{x + width}" fill="{INK}" transform="translate({x - left * scale:.6f} {top + ceiling * scale:.6f}) scale({scale:.8f} {-scale:.8f})">')
    for index, record in enumerate(records):
        position = record['cursor'] + index * spacing / scale
        art.add(f'<g id="{group_id}-letter-{index}" transform="translate({position:.6f} 0)">{record["markup"]}</g>')
    art.add('</g>')


def cropped_wordmark(full_name, out_name, title):
    from artwork import ROUND
    namespace = '{http://www.w3.org/2000/svg}'
    root = ET.parse(ROUND / f'{full_name}.svg').getroot()
    root.set('viewBox', '376 28 548 320')
    root.set('aria-labelledby', f'{out_name}-title {out_name}-description')
    for element in list(root):
        if element.tag == f'{namespace}title':
            element.set('id', f'{out_name}-title')
            element.text = title
        elif element.tag == f'{namespace}desc':
            element.set('id', f'{out_name}-description')
            element.text = 'DragonSlapper Dragon Database wordmark with sword details, black on silver. Derived lettering retains CC BY-SA 3.0 attribution and license in metadata.'
        elif element.get('aria-label') == 'Dragon Database Swordmaw Hybrid logo':
            root.remove(element)
    (ROUND / f'{out_name}.svg').write_text(ET.tostring(root, encoding='unicode'))
    print(f'Saved {out_name}.svg')


def transparent_copy(full_name):
    from artwork import ROUND
    root = ET.parse(ROUND / f'{full_name}.svg').getroot()
    for element in list(root):
        if element.tag.endswith('rect') and element.get('x') == '0' and element.get('y') == '0' and element.get('width') == '960':
            root.remove(element)
    (ROUND / f'{full_name}-transparent.svg').write_text(ET.tostring(root, encoding='unicode'))
    print(f'Saved {full_name}-transparent.svg')
