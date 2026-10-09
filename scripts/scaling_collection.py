from html import escape
from lettering import INK, _scale_details
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen


def scaled_heading(art, value, x, y, size, width, anchor='middle'):
    size = min(size, size * width / art.text_width(value, size, 'slapper'))
    font, glyphs, mapping = art.face('slapper')
    scale = size / font['head'].unitsPerEm
    text_width = art.text_width(value, size, 'slapper')
    origin = x - (text_width if anchor == 'end' else text_width / 2 if anchor == 'middle' else 0)
    art.counter += 1
    heading_id = f'{art.name}-scaled-heading-{art.counter}'
    scale_index = value.find('Scaling')
    art.add(
        f'<g id="{heading_id}" class="steel-scaled-heading" role="img" aria-label="{escape(value, quote=True)}" data-text="{escape(value, quote=True)}" aria-labelledby="{heading_id}-title" fill="{INK}" transform="translate({origin:.4f} {y}) scale({scale:.6f} {-scale:.6f})">'
        f'<title id="{heading_id}-title">{escape(value)}</title>'
    )
    cursor = 0
    for index, character in enumerate(value):
        glyph = glyphs[mapping.get(ord(character), '.notdef')]
        glyph_id = f'{heading_id}-glyph-{index}-{ord(character)}'
        outline = SVGPathPen(glyphs)
        glyph.draw(outline)
        art.defs[glyph_id] = f'<path id="{glyph_id}" data-license="https://creativecommons.org/licenses/by-sa/3.0/" data-author="Allison James" d="{outline.getCommands()}"/>'
        art.add(f'<use href="#{glyph_id}" transform="translate({cursor:.4f} 0)"/>')
        if index == scale_index:
            bounds = BoundsPen(glyphs)
            glyph.draw(bounds)
            if bounds.bounds:
                _scale_details(art, glyph_id, heading_id, index, bounds.bounds, cursor)
                art.parts[-1] = art.parts[-1].replace('#C5CBD3', '#8d3038')
        cursor += glyph.width
    art.add('</g>')
