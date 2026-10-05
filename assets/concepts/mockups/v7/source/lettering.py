import re
from html import escape
from editorial import INK
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen


STEEL = '#C5CBD3'


def _scale_details(art, glyph_id, heading_id, index, bounds, cursor):
    x_min, y_min, x_max, y_max = bounds
    width = x_max - x_min
    height = y_max - y_min
    clip_id = f'{heading_id}-scaling-s-clip-{index}'
    art.defs[clip_id] = f'<clipPath id="{clip_id}" clipPathUnits="userSpaceOnUse"><use href="#{glyph_id}"/></clipPath>'
    details = []
    cell_width = width / 2.35
    cell_height = height / 7.4
    for row in range(6):
        row_y = y_min + height * .09 + row * cell_height
        for column in range(3):
            center_x = x_min + column * cell_width + (cell_width * .5 if row % 2 else 0)
            left = center_x - cell_width * .47
            right = center_x + cell_width * .47
            control_y = row_y - cell_height * .76
            details.append(
                f'<path d="M{left:.4f} {row_y:.4f} Q{center_x:.4f} {control_y:.4f} {right:.4f} {row_y:.4f}" fill="none" stroke="{STEEL}" stroke-width="{width * .025:.4f}" stroke-linecap="round" opacity="0.84"/>'
            )
    art.add(
        f'<g id="{heading_id}-scaling-s-details-{index}" class="scaling-s-steel-scales" aria-hidden="true" transform="translate({cursor:.4f} 0)" clip-path="url(#{clip_id})">{"".join(details)}</g>'
    )


def _dragon_eye(art, heading_id, index, bounds, cursor):
    x_min, y_min, x_max, y_max = bounds
    width = x_max - x_min
    height = y_max - y_min
    center_x = (x_min + x_max) / 2
    center_y = (y_min + y_max) / 2
    half_width = width * .305
    half_height = height * .12
    pupil_half_width = width * .033
    pupil_half_height = half_height * .87
    left = center_x - half_width
    right = center_x + half_width
    upper_control = center_y + half_height * 2
    lower_control = center_y - half_height * 2
    eye_path = (
        f'M{left:.4f} {center_y:.4f} '
        f'Q{center_x:.4f} {upper_control:.4f} {right:.4f} {center_y:.4f} '
        f'Q{center_x:.4f} {lower_control:.4f} {left:.4f} {center_y:.4f} Z'
    )
    pupil_path = (
        f'M{center_x:.4f} {center_y + pupil_half_height:.4f} '
        f'Q{center_x + pupil_half_width:.4f} {center_y + pupil_half_height * .45:.4f} {center_x + pupil_half_width:.4f} {center_y:.4f} '
        f'Q{center_x + pupil_half_width:.4f} {center_y - pupil_half_height * .45:.4f} {center_x:.4f} {center_y - pupil_half_height:.4f} '
        f'Q{center_x - pupil_half_width:.4f} {center_y - pupil_half_height * .45:.4f} {center_x - pupil_half_width:.4f} {center_y:.4f} '
        f'Q{center_x - pupil_half_width:.4f} {center_y + pupil_half_height * .45:.4f} {center_x:.4f} {center_y + pupil_half_height:.4f} Z'
    )
    lid_path = f'M{left:.4f} {center_y:.4f} Q{center_x:.4f} {upper_control:.4f} {right:.4f} {center_y:.4f}'
    art.add(
        f'<g id="{heading_id}-collection-eye-{index}" class="collection-dragon-eye" aria-hidden="true" transform="translate({cursor:.4f} 0)">'
        f'<path d="{eye_path}" fill="{STEEL}"/>'
        f'<path d="{pupil_path}" fill="{INK}"/>'
        f'<path d="{lid_path}" fill="none" stroke="{INK}" stroke-width="{width * .025:.4f}" stroke-linecap="round"/>'
        '</g>'
    )


def scaled_heading(art, value, x, y, size, width, anchor='middle'):
    size = min(size, size * width / art.text_width(value, size, 'display'))
    font, glyphs, mapping = art.face('display')
    scale = size / font['head'].unitsPerEm
    text_width = art.text_width(value, size, 'display')
    origin = x - (text_width if anchor == 'end' else text_width / 2 if anchor == 'middle' else 0)
    art.counter += 1
    heading_id = f'{art.name}-scaled-heading-{art.counter}'
    scaling = re.search(r'\bScaling\b', value)
    collection = re.search(r'\bCollection\b', value)
    scale_index = scaling.start() if scaling else None
    eye_indices = {
        collection.start() + index
        for index, character in enumerate(collection.group())
        if character == 'o'
    } if collection else set()
    full_label = 'The Scaling Collection' if scaling or collection else value
    art.add(
        f'<g id="{heading_id}" class="steel-scaled-heading" role="img" aria-label="{escape(full_label, quote=True)}" data-text="{escape(value, quote=True)}" aria-labelledby="{heading_id}-title" fill="{INK}" transform="translate({origin:.4f} {y}) scale({scale:.6f} {-scale:.6f})">'
        f'<title id="{heading_id}-title">{escape(full_label)}</title>'
    )
    cursor = 0
    for index, character in enumerate(value):
        glyph_name = mapping.get(ord(character), '.notdef')
        glyph = glyphs[glyph_name]
        glyph_id = f'{heading_id}-glyph-{index}-{ord(character)}'
        outline = SVGPathPen(glyphs)
        glyph.draw(outline)
        art.defs[glyph_id] = f'<path id="{glyph_id}" d="{outline.getCommands()}"/>'
        art.add(f'<use href="#{glyph_id}" transform="translate({cursor:.4f} 0)"/>')
        if index == scale_index or index in eye_indices:
            bounds_pen = BoundsPen(glyphs)
            glyph.draw(bounds_pen)
            if bounds_pen.bounds:
                if index == scale_index:
                    _scale_details(art, glyph_id, heading_id, index, bounds_pen.bounds, cursor)
                if index in eye_indices:
                    _dragon_eye(art, heading_id, index, bounds_pen.bounds, cursor)
        cursor += glyph.width
    art.add('</g>')
