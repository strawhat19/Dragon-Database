from banner import flying_dragon
from editorial import INK
from materials import group, metal


ANGULAR_FLAME_OUTLINE = (
    'M0 100 L4 92 L12 83 L10 68 L20 78 L25 91 '
    'L33 76 L29 58 L34 39 L43 17 L42 45 L50 61 L51 74 L45 91 '
    'L62 77 L65 60 L58 42 L65 20 L78 0 L74 26 L82 48 L79 65 L78 79 '
    'L93 90 L105 75 L101 58 L109 33 L111 55 L123 70 L125 91 '
    'L143 78 L148 57 L139 38 L144 29 L154 20 L150 39 L157 54 L155 68 L169 92 '
    'L181 80 L176 65 L185 44 L188 62 L195 76 L194 90 L200 100 Z'
)

ANGULAR_FLAME_CUTS = (
    'M36 61 L41 76 L36 94 L31 96 L35 84 L33 72 Z '
    'M68 45 L74 59 L70 81 L61 91 L66 72 L64 57 Z '
    'M147 49 L150 63 L147 80 L156 94 L145 87 L141 72 L143 58 Z'
)


def angular_flames(art, name, x, y, width, height, mirrored=False):
    mask_id = f'{art.name}-{name}-narrow-steel-cuts-mask'
    art.defs[mask_id] = (
        f'<mask id="{mask_id}" x="0" y="0" width="200" height="100" '
        'maskUnits="userSpaceOnUse" style="mask-type: luminance">'
        '<rect x="0" y="0" width="200" height="100" fill="#FFFFFF"/>'
        f'<path fill="#000000" d="{ANGULAR_FLAME_CUTS}"/>'
        '</mask>'
    )
    origin = x + width if mirrored else x
    horizontal_scale = -width / 200 if mirrored else width / 200
    art.add(
        f'<g id="{art.name}-{name}" class="angular-black-flame-tongues" '
        f'aria-hidden="true" transform="translate({origin:.4f} {y:.4f}) '
        f'scale({horizontal_scale:.6f} {height / 100:.6f})">'
        f'<path id="{art.name}-{name}-tapered-silhouette" fill="{INK}" '
        f'mask="url(#{mask_id})" d="{ANGULAR_FLAME_OUTLINE}"/>'
        '</g>'
    )


def steel_stage(art, x, y, width, height, mobile=False, span=None, flame_height=None):
    art.counter += 1
    name = f'fullbleed-steel-hero-{art.counter}'
    group(art, name, 'Steel hero banner with restrained angular black flames and larger flying dragons')
    metal(art, x, y, width, height, name=f'{name}-brushed-steel')
    span = span if span is not None else 42 if mobile else 200
    flame_height = flame_height if flame_height is not None else 52 if mobile else 100
    flame_y = y + height - flame_height - 2
    for side, origin, mirrored in [
        ('left', x + 2, False),
        ('right', x + width - span - 2, True),
    ]:
        angular_flames(art, f'{name}-{side}-angular-flames', origin, flame_y, span, flame_height, mirrored=mirrored)
        if mobile:
            dragon_width = 34
            flight_x = origin + span - dragon_width - 3 if mirrored else origin + 3
            flying_dragon(
                art,
                f'{name}-{side}-flying-dragon-0',
                flight_x,
                flame_y - 31,
                dragon_width,
                mirrored=mirrored,
            )
        else:
            for index, (offset, vertical_offset, dragon_width) in enumerate([(0.15, -50, 60), (0.62, -62, 56)]):
                flight_x = origin + span * (1 - offset) - dragon_width if mirrored else origin + span * offset
                flying_dragon(
                    art,
                    f'{name}-{side}-flying-dragon-{index}',
                    flight_x,
                    flame_y + vertical_offset,
                    dragon_width,
                    mirrored=mirrored,
                )
    art.add('</g>')
