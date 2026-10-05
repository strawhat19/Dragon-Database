from artwork import Canvas
from editorial import INK, MUTED
from materials import group, metal


FLAME_OUTLINE = (
    'M0 84 '
    'C4 74 6 70 8 58 '
    'C11 68 14 74 18 78 '
    'C25 65 20 53 29 45 '
    'C42 34 46 27 41 18 '
    'C61 28 54 43 45 52 '
    'C35 63 43 73 48 78 '
    'C61 68 64 58 57 47 '
    'C47 32 50 17 66 8 '
    'C57 24 60 31 71 40 '
    'C90 56 71 69 76 78 '
    'C89 71 97 61 95 51 '
    'C91 38 81 38 86 24 '
    'C92 37 105 38 109 52 '
    'C115 67 104 73 112 79 '
    'C129 73 136 62 131 48 '
    'C126 34 132 16 152 0 '
    'C145 16 148 28 153 39 '
    'C164 59 147 70 154 78 '
    'C163 79 167 81 170 84 Z'
)

FLAME_CUTS = (
    'M37 48 C30 59 32 73 43 81 '
    'C37 69 37 60 42 53 C40 52 38 50 37 48 Z '
    'M63 38 C69 51 63 65 60 76 '
    'C74 63 78 51 63 38 Z '
    'M97 61 C95 71 101 79 108 82 '
    'C105 75 100 69 103 64 Z '
    'M148 27 C138 47 147 60 139 73 '
    'C156 61 156 44 148 27 Z'
)

FLYING_DRAGON_WINGS = (
    'M28 22 C23 13 19 7 5 1 '
    'L11 11 L9 20 L18 17 L22 27 Z '
    'M31 20 C35 10 43 4 55 2 '
    'L47 12 L50 20 L39 17 L34 26 Z'
)

FLYING_DRAGON_BODY = (
    'M27 22 C19 27 8 31 0 27 '
    'C7 27 15 24 23 18 '
    'L32 16 L37 14 L36 8 L43 12 '
    'L49 13 L54 17 L49 21 L43 20 '
    'L40 25 L34 26 L29 31 L26 28 Z'
)


def flame_cluster(art, name, x, y, width, height, mirrored=False):
    mask_id = f'{art.name}-{name}-silver-cuts-mask'
    art.defs[mask_id] = (
        f'<mask id="{mask_id}" x="0" y="0" width="170" height="84" '
        'maskUnits="userSpaceOnUse" style="mask-type: luminance">'
        '<rect x="0" y="0" width="170" height="84" fill="#FFFFFF"/>'
        f'<path fill="#000000" d="{FLAME_CUTS}"/>'
        '</mask>'
    )
    origin = x + width if mirrored else x
    horizontal_scale = -width / 170 if mirrored else width / 170
    art.add(
        f'<g id="{art.name}-{name}" class="curling-black-flames" '
        f'aria-hidden="true" transform="translate({origin:.4f} {y:.4f}) '
        f'scale({horizontal_scale:.6f} {height / 84:.6f})">'
        f'<path id="{art.name}-{name}-flowing-tongues" fill="{INK}" '
        f'mask="url(#{mask_id})" d="{FLAME_OUTLINE}"/>'
        '</g>'
    )


def flying_dragon(art, name, x, y, width, mirrored=False):
    origin = x + width if mirrored else x
    horizontal_scale = -width / 64 if mirrored else width / 64
    art.add(
        f'<g id="{art.name}-{name}" class="flying-dragon-silhouette" '
        f'aria-hidden="true" transform="translate({origin:.4f} {y:.4f}) '
        f'scale({horizontal_scale:.6f} {width / 64:.6f})" fill="{INK}">'
        f'<path id="{art.name}-{name}-swept-wings" d="{FLYING_DRAGON_WINGS}"/>'
        f'<path id="{art.name}-{name}-horned-head-long-tail" d="{FLYING_DRAGON_BODY}"/>'
        '</g>'
    )


def banner(art: Canvas, x, y, width, height, mobile=False):
    art.counter += 1
    name = f'wide-steel-banner-{art.counter}'
    group(art, name, 'Brushed steel archive banner with curling black flames and flying dragons')
    metal(art, x, y, width, height, name=f'{name}-brushed-steel')

    span = 40 if mobile else 170 + max(0, width - 1280) * 0.15
    flame_height = 48 if mobile else 84
    edge = 2 if mobile else 8
    flame_y = y + height - flame_height - 2
    positions = [('left', x + edge, False), ('right', x + width - edge - span, True)]

    for side, origin, mirrored in positions:
        flame_cluster(
            art,
            f'{name}-{side}-curling-flames',
            origin,
            flame_y,
            span,
            flame_height,
            mirrored=mirrored,
        )
        flights = [(0.52, -16, 15)] if mobile else [(0.16, -7, 28), (0.38, -23, 24), (0.78, -28, 26)]
        for index, (offset, vertical_offset, dragon_width) in enumerate(flights):
            flight_x = origin + span * (1 - offset) - dragon_width if mirrored else origin + span * offset
            flying_dragon(
                art,
                f'{name}-{side}-flying-dragon-{index}',
                flight_x,
                flame_y + vertical_offset,
                dragon_width,
                mirrored=mirrored,
            )

    mark_width = 55 if mobile else 110
    gap = 14 if mobile else 33
    title = 'Forms, traits, lore' if mobile else 'Forms, traits, and lore'
    subtitle = 'Explore the archive' if mobile else 'A starting point for exploring dragons.'
    title_size = 20 if mobile else 34
    subtitle_size = 18 if mobile else 21
    copy_width = max(
        art.text_width(title, title_size, 'medium'),
        art.text_width(subtitle, subtitle_size, 'body'),
    )
    origin = x + width / 2 - (mark_width + gap + copy_width) / 2
    art.logo(origin, y + (height - mark_width) / 2, mark_width, mark=True)
    art.text(title, origin + mark_width + gap, y + height / 2 - 6, title_size, INK, 'medium')
    art.text(subtitle, origin + mark_width + gap, y + height / 2 + (19 if mobile else 27), subtitle_size, MUTED)
    art.add('</g>')
