from artwork import Canvas


INK = '#101115'
MUTED = '#5B626C'
CHROME = '#191B20'
SILVER = '#E4E7EB'
PAPER = '#F5F6F8'
STEEL = '#C5CBD3'
EDGE = '#B7BEC8'


def species(canvas, kind, x, y, width):
    scale = width / 180
    canvas.add(f'<g id="{canvas.name}-{kind}-illustration" transform="translate({x} {y}) scale({scale})" aria-label="Illustrative {kind} silhouette">')
    if kind == 'wyvern':
        canvas.path('M113 62 L94 13 L90 38 L24 19 L42 46 L19 61 L51 59 L44 82 L85 69 L107 80 Z', INK)
        canvas.path('M109 62 C84 77 61 86 44 68 C31 56 29 48 22 51 C16 68 33 91 62 93 C84 95 104 87 120 72 L130 69 L132 79 L146 82 L151 72 L141 63 L151 59 L163 61 L173 53 L160 41 L151 39 L149 20 L139 33 L130 26 L130 46 Z', INK)
        canvas.path('M40 31 L87 49 L97 66 L71 56 Z', STEEL)
        canvas.path('M141 46 L157 49 L146 52 Z', SILVER)
    elif kind == 'wyrm':
        canvas.path('M145 39 C120 20 81 24 63 47 C45 71 26 77 18 61 C7 42 33 25 46 34 C59 43 54 66 71 75 C96 88 126 71 115 51 C103 29 87 56 98 64', stroke=INK, sw=13)
        canvas.path('M132 40 L143 25 L136 13 L153 24 L155 16 L164 33 L178 37 L170 46 L158 46 L154 57 L143 54 Z', INK)
        canvas.path('M151 35 L166 39 L154 42 Z', SILVER)
        canvas.path('M159 47 L166 45 L161 53 Z', STEEL)
    else:
        canvas.path('M124 57 C101 48 81 54 59 58 C35 63 24 50 12 49 C17 72 41 79 63 75 L70 87 L87 87 L83 72 L105 73 L113 88 L130 85 L125 70 L142 67 L151 74 L163 72 L156 61 L165 55 L177 57 L179 48 L166 39 L162 21 L153 34 L144 25 L144 47 Z', INK)
        canvas.path('M63 56 L75 43 L85 52 L96 38 L106 50 L117 41 L124 54 Z', INK)
        canvas.path('M155 44 L170 48 L158 51 Z', SILVER)
        canvas.path('M83 62 L112 58 L119 65 L91 69 Z', STEEL)
    canvas.add('</g>')


def directory_card(canvas, kind, x, y, width, mobile=False):
    height = 168 if mobile else 220
    image_height = 105 if mobile else 125
    title = {'wyvern': 'Wyvern', 'wyrm': 'Wyrm', 'drake': 'Drake'}[kind]
    category = {'wyvern': 'WINGED', 'wyrm': 'SERPENTINE', 'drake': 'GROUNDED'}[kind]
    description = {
        'wyvern': 'Wings and wild horizons',
        'wyrm': 'Ancient coils and quiet power',
        'drake': 'Strength close to the earth',
    }[kind]
    canvas.add(f'<g id="{canvas.name}-{kind}-directory-card" aria-label="Example archive card: {title}">')
    canvas.rect(x, y, width, height, PAPER, 5, EDGE)
    canvas.rect(x, y, width, image_height, '#D2D7DF', 5)
    canvas.rect(x, y + image_height - 5, width, 5, '#D2D7DF')
    if mobile:
        canvas.circle(x + width / 2, y + 52, 39, stroke=EDGE)
        species(canvas, kind, x + 13, y + 17, width - 26)
        canvas.text(title, x + 14, y + 133, 28, INK, 'display')
        short_description = 'Winged creature' if kind == 'wyvern' else 'Serpentine form'
        canvas.text(short_description, x + 14, y + 156, 18, MUTED)
    else:
        canvas.text(category, x + 20, y + 28, 16, MUTED, 'medium', spacing=1.4)
        canvas.circle(x + width * 0.68, y + 64, 48, stroke=EDGE)
        species(canvas, kind, x + width * 0.35, y + 20, width * 0.54)
        canvas.line(x + 20, y + image_height, x + width - 20, y + image_height, EDGE)
        canvas.text(title, x + 20, y + 162, 32, INK, 'display')
        canvas.text(description, x + 20, y + 191, 21, MUTED)
        canvas.icon('chevron', x + width - 45, y + 139, 25, INK)
    canvas.add('</g>')


def filter_chip(canvas, label, x, y, width, mobile=False):
    canvas.rect(x, y, width, 36, 'none', 18, EDGE)
    canvas.text(label, x + width / 2, y + 24, 20 if mobile else 19, INK, 'medium', anchor='middle')


def desktop():
    canvas = Canvas(
        '03-the-armory-desktop',
        1440,
        900,
        'The Armory — Dragon Database Desktop Concept',
        'A public dragon archive with dark navigation chrome, a generous silver workspace, practical search, and three original illustrated directory cards. The chosen Swordmaw Hybrid logo is reused unchanged. Desktop landing-page concept, not a working application.',
    )
    canvas.rect(0, 0, 1440, 900, INK)
    canvas.rect(0, 0, 1440, 112, CHROME)
    canvas.logo(24, 10, 245)
    canvas.text('Dragons', 744, 64, 24, SILVER, 'bold')
    canvas.text('Collections', 860, 64, 24, STEEL, 'medium')
    canvas.text('Lore', 1018, 64, 24, STEEL, 'medium')
    canvas.line(744, 83, 812, 83, SILVER, 2)
    canvas.rect(1216, 32, 176, 48, 'none', 5, '#555A64')
    canvas.icon('sword', 1235, 45, 22, SILVER)
    canvas.text('Sign In', 1274, 63, 23, SILVER, 'medium')
    canvas.line(0, 112, 1440, 112, '#363A42')

    canvas.add('<g id="03-the-armory-desktop-browse-rail" aria-label="Archive navigation">')
    canvas.text('THE ARMORY', 28, 172, 17, STEEL, 'medium', spacing=2)
    canvas.rect(16, 193, 192, 48, '#30343C', 5)
    canvas.icon('compass', 31, 205, 24, SILVER)
    canvas.text('Browse Dragons', 68, 226, 21, SILVER, 'bold')
    canvas.icon('bookmark', 31, 261, 22, STEEL)
    canvas.text('Collections', 68, 282, 21, STEEL)
    canvas.icon('book', 31, 317, 23, STEEL)
    canvas.text('Dragon Lore', 68, 338, 21, STEEL)
    canvas.line(28, 374, 196, 374, '#343840')
    canvas.text('Explore by form', 28, 422, 21, SILVER, 'medium')
    canvas.rect(16, 450, 3, 30, SILVER, 1)
    canvas.text('All Dragons', 32, 472, 22, SILVER, 'bold')
    canvas.text('Winged', 32, 515, 22, STEEL)
    canvas.text('Serpentine', 32, 558, 22, STEEL)
    canvas.text('Grounded', 32, 601, 22, STEEL)
    canvas.line(28, 772, 196, 772, '#343840')
    canvas.icon('book', 30, 809, 24, STEEL)
    canvas.text('Open to every', 68, 818, 18, STEEL)
    canvas.text('explorer.', 68, 841, 18, STEEL)
    canvas.add('</g>')

    canvas.add('<g id="03-the-armory-desktop-silver-workspace" aria-label="Public archive hero and directory teaser">')
    canvas.rect(224, 112, 1216, 788, SILVER)
    canvas.line(224, 112, 224, 900, '#515762')
    canvas.text('Library  /  Dragon archive', 274, 163, 19, MUTED)
    canvas.icon('compass', 1242, 144, 18, MUTED)
    canvas.text('Public archive', 1273, 163, 19, MUTED, 'medium')
    canvas.circle(1221, 294, 132, stroke=EDGE, sw=1, opacity=0.5)
    canvas.circle(1221, 294, 109, stroke=EDGE, sw=1, opacity=0.5)
    canvas.line(1070, 294, 1372, 294, EDGE, opacity=0.45)
    canvas.line(1221, 143, 1221, 425, EDGE, opacity=0.45)
    canvas.logo(1102, 174, 240, mark=True, opacity=0.1)
    canvas.text('Find your next', 274, 253, 76, INK, 'display')
    canvas.text('legend.', 274, 328, 76, INK, 'display')
    canvas.text('Discover dragons by form, origin, and lore.', 274, 373, 25, MUTED)
    canvas.text('Build a collection of the creatures that call to you.', 274, 403, 25, MUTED)
    canvas.rect(274, 436, 827, 68, PAPER, 5, EDGE)
    canvas.icon('search', 297, 458, 26, MUTED)
    canvas.text('Search dragons, traits, or lore', 341, 480, 24, MUTED)
    canvas.rect(1049, 453, 34, 32, SILVER, 4, EDGE)
    canvas.text('/', 1066, 476, 21, MUTED, 'medium', anchor='middle')
    canvas.rect(1117, 436, 271, 68, INK, 5)
    canvas.icon('compass', 1137, 456, 26, SILVER)
    canvas.text('Browse Dragons', 1180, 480, 24, SILVER, 'bold')
    canvas.icon('arrow', 1346, 458, 25, SILVER)
    canvas.text('Start with a form', 274, 552, 21, MUTED)
    filter_chip(canvas, 'Winged', 441, 528, 113)
    filter_chip(canvas, 'Serpentine', 566, 528, 141)
    filter_chip(canvas, 'Grounded', 719, 528, 133)
    canvas.text('From the archive', 274, 606, 40, INK, 'display')
    canvas.text('View the directory', 1180, 603, 22, INK, 'medium')
    canvas.icon('arrow', 1362, 583, 25, INK)
    directory_card(canvas, 'wyvern', 274, 630, 358)
    directory_card(canvas, 'wyrm', 652, 630, 358)
    directory_card(canvas, 'drake', 1030, 630, 358)
    canvas.add('</g>')
    canvas.save()


def mobile():
    canvas = Canvas(
        '03-the-armory-mobile',
        390,
        844,
        'The Armory — Dragon Database Mobile Concept',
        'A public dragon archive on mobile with the unchanged chosen Swordmaw Hybrid logo, visible navigation, large readable search and browse controls, and original Wyvern and Wyrm illustration cards. Mobile landing-page concept, not a working application.',
    )
    canvas.rect(0, 0, 390, 844, SILVER)
    canvas.rect(0, 0, 390, 160, CHROME)
    canvas.logo(16, 15, 224)
    canvas.rect(274, 37, 100, 44, 'none', 5, '#555A64')
    canvas.icon('menu', 285, 48, 21, SILVER)
    canvas.text('Menu', 316, 66, 21, SILVER, 'medium')
    canvas.line(16, 111, 374, 111, '#363A42')
    canvas.text('Dragons', 20, 142, 22, SILVER, 'bold')
    canvas.text('Collections', 143, 142, 22, STEEL, 'medium')
    canvas.text('Lore', 298, 142, 22, STEEL, 'medium')
    canvas.line(20, 154, 96, 154, SILVER, 2)
    canvas.text('THE PUBLIC ARCHIVE', 20, 198, 17, MUTED, 'medium', spacing=1.6)
    canvas.text('Find your next', 20, 259, 54, INK, 'display')
    canvas.text('legend.', 20, 321, 70, INK, 'display')
    canvas.text('Discover dragons by form,', 20, 366, 23, MUTED)
    canvas.text('origin, and lore.', 20, 394, 23, MUTED)
    canvas.rect(20, 422, 350, 56, PAPER, 5, EDGE)
    canvas.icon('search', 36, 439, 23, MUTED)
    canvas.text('Search dragons or lore', 77, 458, 22, MUTED)
    canvas.rect(20, 490, 350, 54, INK, 5)
    canvas.icon('compass', 37, 505, 24, SILVER)
    canvas.text('Browse Dragons', 79, 526, 24, SILVER, 'bold')
    canvas.icon('arrow', 331, 505, 24, SILVER)
    filter_chip(canvas, 'Winged', 20, 562, 94, mobile=True)
    filter_chip(canvas, 'Serpentine', 125, 562, 126, mobile=True)
    filter_chip(canvas, 'Grounded', 262, 562, 108, mobile=True)
    canvas.text('From the archive', 20, 640, 36, INK, 'display')
    canvas.text('View all', 291, 637, 21, INK, 'medium')
    directory_card(canvas, 'wyvern', 20, 657, 166, mobile=True)
    directory_card(canvas, 'wyrm', 204, 657, 166, mobile=True)
    canvas.save()


if __name__ == '__main__':
    desktop()
    mobile()
