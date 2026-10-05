from fontTools.pens.boundsPen import BoundsPen

from artwork import Canvas
from wordmark import (
    outline,
    cropped_wordmark,
    underline_sword,
    transparent_copy,
    silver_background,
)


def sword_t(art):
    font, glyphs, cmap = art.face('slapper')
    glyph = glyphs[cmap[ord('t')]]
    bounds = BoundsPen(glyphs)
    glyph.draw(bounds)
    cap = bounds.bounds[3]
    width = glyph.width
    center = width / 2

    def point(x, y):
        return f'{center + x * width:.4f} {y * cap:.4f}'

    def polygon(points):
        return 'M' + ' L'.join(point(x, y) for x, y in points) + ' Z'

    blade = polygon([
        (-0.15, 0.77),
        (0.15, 0.77),
        (0.15, 0.16),
        (0, -0.075),
        (-0.15, 0.16),
    ])
    fuller = polygon([
        (-0.047, 0.73),
        (0.047, 0.73),
        (0.047, 0.15),
        (0, 0.055),
        (-0.047, 0.15),
    ])
    grip = polygon([
        (-0.07, 0.785),
        (0.07, 0.785),
        (0.07, 0.92),
        (-0.07, 0.92),
    ])
    guard = polygon([
        (-0.5, 0.825),
        (-0.32, 0.825),
        (-0.245, 0.8),
        (0.245, 0.8),
        (0.32, 0.825),
        (0.5, 0.825),
        (0.45, 0.735),
        (0.275, 0.75),
        (-0.275, 0.75),
        (-0.45, 0.735),
    ])
    guard_inlay = polygon([
        (-0.425, 0.79),
        (-0.25, 0.782),
        (0.25, 0.782),
        (0.425, 0.79),
        (0.4, 0.773),
        (0.24, 0.772),
        (-0.24, 0.772),
        (-0.4, 0.773),
    ])
    pommel = polygon([
        (0, 1),
        (0.112, 0.95),
        (0.07, 0.91),
        (-0.07, 0.91),
        (-0.112, 0.95),
    ])
    pommel_face = polygon([
        (0, 0.983),
        (0.047, 0.95),
        (0.031, 0.928),
        (-0.031, 0.928),
        (-0.047, 0.95),
    ])
    wraps = []
    for bottom in [0.82, 0.855, 0.89]:
        wraps.append(polygon([
            (-0.055, bottom),
            (0.055, bottom + 0.011),
            (0.055, bottom + 0.022),
            (-0.055, bottom + 0.011),
        ]))

    prefix = f'{art.name}-database-sword-t'
    markup = (
        f'<g id="{prefix}" aria-label="t represented by a medieval sword">'
        f'<path id="{prefix}-stout-blade" d="{blade}"/>'
        f'<path id="{prefix}-pale-fuller" fill="#E4E7EB" d="{fuller}"/>'
        f'<path id="{prefix}-grip" d="{grip}"/>'
        f'<path id="{prefix}-wrapped-grip" fill="#C5CBD3" d="{" ".join(wraps)}"/>'
        f'<path id="{prefix}-t-crossguard" d="{guard}"/>'
        f'<path id="{prefix}-crossguard-inlay" fill="#C5CBD3" d="{guard_inlay}"/>'
        f'<path id="{prefix}-diamond-pommel" d="{pommel}"/>'
        f'<path id="{prefix}-pommel-face" fill="#E4E7EB" d="{pommel_face}"/>'
        '</g>'
    )
    return {
        'bounds': (0, -0.075 * cap, width, cap),
        'advance': glyph.width,
        'markup': markup,
    }


def main():
    name = '02-db-swordslapper-sword-t'
    art = Canvas(
        name,
        960,
        360,
        'Dragon Database — DragonSlapper Sword-T',
        'The unchanged selected Swordmaw Hybrid dragon, DB monogram, and crossed swords pair with original DragonSlapper lettering. Dragon and Database each retain original uniform glyph proportions and span the existing horizontal underline sword. Only the lowercase t in Database becomes an original medieval sword-shaped T with a diamond pommel, wrapped grip, broad crossguard, stout pointed blade, and pale silver fuller. The Database spelling remains labeled for accessibility.',
    )
    silver_background(art)
    art.logo(0, 0, 360, mark=True)
    outline(art, 'Dragon', 401, 55, 517, 124)
    outline(art, 'Database', 401, 205, 517, 86, overrides={2: sword_t(art)}, label='Database')
    underline_sword(art)
    art.save()
    cropped_wordmark(name, '04-sword-t-wordmark', 'Dragon Database — DragonSlapper Sword-T Wordmark')
    transparent_copy(name)


if __name__ == '__main__':
    main()
