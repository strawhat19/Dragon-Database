from copy import deepcopy
from html import escape
from pathlib import Path
import re
import xml.etree.ElementTree as ET

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont


ROUND = Path(__file__).resolve().parents[1]
BRAND = Path(__file__).resolve().parents[3] / 'logos' / 'v7'
LOGO = BRAND / '01-db-swordmaw-hybrid.svg'
FONTS = {
    'body': BRAND / 'fonts/alegreya-sans/AlegreyaSans-Regular.ttf',
    'bold': BRAND / 'fonts/alegreya-sans/AlegreyaSans-Bold.ttf',
    'medium': BRAND / 'fonts/alegreya-sans/AlegreyaSans-Medium.ttf',
    'display': BRAND / 'fonts/metal-mania/MetalMania-Regular.ttf',
    'slapper': Path(__file__).resolve().parents[4] / 'fonts/dragon-slapper-fontstruct/dragonslapper.ttf',
}
ET.register_namespace('', 'http://www.w3.org/2000/svg')


class Canvas:
    def __init__(self, name, width, height, title, description):
        self.name = name
        self.width = width
        self.height = height
        self.title = title
        self.description = description
        self.parts = []
        self.defs = {}
        self.faces = {}
        self.counter = 0

    def add(self, markup):
        self.parts.append(markup)

    def begin_link(self, name, label, href):
        self.add(f'<a id="{self.name}-{escape(name, quote=True)}" href="{escape(href, quote=True)}" aria-label="{escape(label, quote=True)}"><title>{escape(label)}</title>')

    def end_link(self):
        self.add('</a>')

    def face(self, family):
        if family not in self.faces:
            font = TTFont(FONTS[family])
            self.faces[family] = (font, font.getGlyphSet(), font.getBestCmap())
        return self.faces[family]

    def text_width(self, value, size=20, family='body', spacing=0):
        font, glyphs, cmap = self.face(family)
        scale = size / font['head'].unitsPerEm
        return sum(glyphs[cmap.get(ord(c), '.notdef')].width * scale for c in value) + max(0, len(value) - 1) * spacing

    def text(self, value, x, y, size=20, fill='#E4E7EB', family='body', spacing=0, anchor='start', opacity=1):
        font, glyphs, cmap = self.face(family)
        scale = size / font['head'].unitsPerEm
        width = self.text_width(value, size, family, spacing)
        origin = x - (width if anchor == 'end' else width / 2 if anchor == 'middle' else 0)
        self.counter += 1
        uses = []
        cursor = 0
        for char in value:
            glyph_name = cmap.get(ord(char), '.notdef')
            glyph_id = f'{self.name}-{family}-glyph-{ord(char)}'
            if glyph_id not in self.defs:
                pen = SVGPathPen(glyphs)
                glyphs[glyph_name].draw(pen)
                license_data = ' data-license="https://creativecommons.org/licenses/by-sa/3.0/" data-author="Allison James"' if family == 'slapper' else ''
                self.defs[glyph_id] = f'<path id="{glyph_id}"{license_data} d="{pen.getCommands()}"/>'
            uses.append(f'<use href="#{glyph_id}" transform="translate({cursor:.4f} 0)"/>')
            cursor += glyphs[glyph_name].width + spacing / scale
        self.add(f'<g id="{self.name}-text-{self.counter}" role="img" aria-label="{escape(value, quote=True)}" data-text="{escape(value, quote=True)}" fill="{fill}" opacity="{opacity}" transform="translate({origin:.4f} {y}) scale({scale:.6f} {-scale:.6f})">{"".join(uses)}</g>')

    def rect(self, x, y, w, h, fill, radius=0, stroke='none', sw=1, opacity=1):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>')

    def line(self, x1, y1, x2, y2, stroke='#464950', sw=1, opacity=1):
        self.add(f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>')

    def path(self, d, fill='none', stroke='none', sw=1, opacity=1):
        self.add(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round" opacity="{opacity}"/>')

    def circle(self, x, y, radius, fill='none', stroke='none', sw=1, opacity=1):
        self.add(f'<circle cx="{x}" cy="{y}" r="{radius}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>')

    def icon(self, kind, x, y, size=20, color='#E4E7EB'):
        icons = {
            'arrow': 'M3 12h18m-6-6 6 6-6 6',
            'search': 'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
            'chevron': 'M8 5l7 7-7 7',
            'menu': 'M3 6h18M3 12h18M3 18h18',
            'book': 'M12 5v16M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Z',
            'sword': 'M7 17 18 6l4-4-2 6L9 19M3 14l7 7M3 22l4-4',
            'bookmark': 'M6 3h12v19l-6-4-6 4Z',
            'compass': 'M17 7l-3 7-7 3 3-7ZM23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0',
        }
        self.add(f'<g transform="translate({x} {y}) scale({size / 24})" stroke="{color}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none"><path d="{icons[kind]}"/></g>')

    def logo(self, x, y, width, mark=False, opacity=1):
        source = ET.parse(LOGO).getroot()
        if mark:
            items = [next(element for element in source if element.get('id') == 'db-swordmaw-hybrid-mark')]
            unit_width = 360
        else:
            items = list(source)
            unit_width = 960
        self.counter += 1
        prefix = f'{self.name}-logo-{self.counter}'
        markup = ''.join(ET.tostring(deepcopy(element), encoding='unicode') for element in items)
        ids = re.findall(r'\bid="([^"]+)"', markup)
        replacements = {old: f'{prefix}-{old}' for old in set(ids)}
        pattern = re.compile('|'.join(re.escape(old) for old in sorted(replacements, key=len, reverse=True)))
        markup = pattern.sub(lambda match: replacements[match.group()], markup)
        self.add(f'<g aria-label="Dragon Database Swordmaw Hybrid logo" transform="translate({x} {y}) scale({width / unit_width:.6f})" opacity="{opacity}">{markup}</g>')

    def save(self):
        font_credit = ' DragonSlapper by Allison James (NAL), copyright 2013, via https://www.fontstruct.com/fontstructions/show/830154/dragonslapper; CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/. Original font file unchanged; the outlined glyphs included here remain under CC BY-SA 3.0.' if 'slapper' in self.faces else ''
        markup = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.width} {self.height}" role="img" aria-labelledby="{self.name}-title {self.name}-description"><title id="{self.name}-title">{escape(self.title)}</title><desc id="{self.name}-description">{escape(self.description)}</desc><metadata>Design concept. Illustrative copy and categories. Original v7 Swordmaw Hybrid logo reused with unchanged artwork. Metal Mania and Alegreya Sans are licensed in logos/v7/fonts.{font_credit} Not an implemented application.</metadata><defs>{"".join(self.defs.values())}</defs>{"".join(self.parts)}</svg>'
        (ROUND / f'{self.name}.svg').write_text(markup)
        print(f'Saved {self.name}.svg')
