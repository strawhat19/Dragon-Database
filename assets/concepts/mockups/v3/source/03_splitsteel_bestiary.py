from artwork import Canvas
from dragons import (
    INK,
    EDGE,
    PALE,
    IMAGE,
    MUTED,
    PAPER,
    STEEL,
    CHROME,
    dragon,
    compact_card,
)
from fontTools.pens.boundsPen import BoundsPen


def display_fit(art, value, x, top, width, height, fill=INK):
    font, glyphs, cmap = art.face('display')
    cursor = 0
    positions = []
    for char in value:
        glyph = glyphs[cmap.get(ord(char), '.notdef')]
        pen = BoundsPen(glyphs)
        glyph.draw(pen)
        if pen.bounds:
            left, bottom, right, ceiling = pen.bounds
            positions.append((left + cursor, bottom, right + cursor, ceiling))
        cursor += glyph.width
    left = min(position[0] for position in positions)
    right = max(position[2] for position in positions)
    bottom = min(position[1] for position in positions)
    ceiling = max(position[3] for position in positions)
    scale = min(width / (right - left), height / (ceiling - bottom))
    size = scale * font['head'].unitsPerEm
    art.text(value, x - left * scale, top + ceiling * scale, size, fill, 'display')


def navigation(art, mobile=False):
    if mobile:
        art.rect(0, 0, 390, 151, CHROME)
        art.logo(10, 9, 232)
        art.rect(278, 30, 96, 42, 'none', 3, '#555A64')
        art.icon('menu', 288, 41, 20, PALE)
        art.text('Menu', 319, 59, 20, PALE, 'medium')
        art.line(18, 109, 372, 109, '#363A42')
        art.text('Dragons', 18, 139, 21, PALE, 'bold')
        art.text('Collections', 134, 139, 21, STEEL, 'medium')
        art.text('Lore', 307, 139, 21, STEEL, 'medium')
        art.line(18, 148, 91, 148, PALE, 2)
    else:
        art.rect(0, 0, 1440, 122, CHROME)
        art.logo(32, 13, 256)
        art.text('Dragons', 919, 74, 24, PALE, 'bold')
        art.text('Collections', 1041, 74, 24, STEEL, 'medium')
        art.text('Lore', 1207, 74, 24, STEEL, 'medium')
        art.rect(1309, 41, 91, 44, 'none', 3, '#555A64')
        art.icon('sword', 1319, 53, 19, PALE)
        art.text('Sign In', 1345, 70, 20, PALE, 'medium')
        art.line(919, 92, 988, 92, PALE, 2)
        art.line(0, 122, 1440, 122, '#363A42')


def browse_actions(art, mobile=False):
    if mobile:
        art.rect(18, 329, 222, 48, INK, 3)
        art.icon('compass', 32, 343, 21, PALE)
        art.text('Browse Dragons', 66, 361, 22, PALE, 'bold')
        art.rect(254, 329, 118, 48, 'none', 3, EDGE)
        art.icon('search', 267, 344, 20, INK)
        art.text('Search', 297, 361, 21, INK, 'medium')
    else:
        art.rect(64, 516, 286, 56, INK, 3)
        art.icon('compass', 86, 531, 25, PALE)
        art.text('Browse Dragons', 132, 553, 25, PALE, 'bold')
        art.icon('arrow', 306, 532, 24, PALE)
        art.rect(368, 516, 233, 56, 'none', 3, EDGE)
        art.icon('search', 389, 532, 24, INK)
        art.text('Search the archive', 430, 553, 23, INK, 'medium')


def crest_panel(art, mobile=False):
    art.add(f'<g id="{art.name}-silver-crest-feature" aria-label="Selected dragon crest on a silver plaque">')
    if mobile:
        art.rect(0, 396, 390, 89, CHROME)
        art.rect(18, 402, 78, 78, PAPER, 1, STEEL)
        art.rect(22, 406, 70, 70, 'none', 0, EDGE)
        art.logo(21, 405, 72, mark=True)
        display_fit(art, 'A mark for the bold.', 117, 411, 250, 27, PALE)
        art.text('An archive for every explorer.', 117, 469, 19, STEEL)
    else:
        art.rect(920, 122, 520, 474, CHROME)
        art.line(949, 205, 1392, 577, STEEL, 1, 0.08)
        art.line(1392, 205, 949, 577, STEEL, 1, 0.08)
        art.text('THE DRAGON CREST', 958, 164, 18, STEEL, 'medium', spacing=1.8)
        art.rect(1022, 192, 316, 286, PAPER, 1, STEEL, 2)
        art.rect(1034, 204, 292, 262, 'none', 0, EDGE)
        art.logo(1040, 194, 282, mark=True)
        display_fit(art, 'A mark for the bold.', 958, 514, 427, 35, PALE)
        art.text('Public knowledge. Legendary creatures.', 958, 580, 23, STEEL)
    art.add('</g>')


def mobile_type_card(art, kind, title, traits, description, x, y):
    art.add(f'<g id="{art.name}-{kind}-type-card" aria-label="Illustrative {title} dragon type card">')
    art.rect(x, y, 354, 134, PAPER, 3, EDGE)
    art.rect(x + 10, y + 10, 97, 114, IMAGE, 1)
    art.circle(x + 58.5, y + 65, 38, stroke=EDGE)
    dragon(art, kind, x + 10, y + 35, 96)
    display_fit(art, title, x + 124, y + 13, 206, 29)
    art.text(traits, x + 124, y + 58, 19, MUTED, 'medium')
    art.text(description, x + 124, y + 83, 20, MUTED)
    art.rect(x + 124, y + 95, 214, 29, INK, 3)
    art.text(f'Explore {title}s', x + 136, y + 116, 20, PALE, 'bold')
    art.icon('arrow', x + 309, y + 99, 20, PALE)
    art.add('</g>')


def desktop():
    art = Canvas(
        '03-splitsteel-bestiary-desktop',
        1440,
        900,
        'Splitsteel Bestiary — Dragon Database Desktop Concept',
        'An asymmetric editorial landing page with a large silver hero on the left, a charcoal crest feature on the right, and three substantial illustrated dragon type cards below. Public browsing and search lead the page. The selected Swordslapper Classic full logo, original dragon mark, and horizontal wordmark sword remain unchanged. Display lettering uses original DragonSlapper outlines with Alegreya Sans body and controls.',
    )
    art.rect(0, 0, 1440, 900, PALE)
    navigation(art)
    art.add('<g id="03-splitsteel-bestiary-desktop-silver-hero" aria-label="Public dragon archive hero">')
    art.text('THE DRAGON ARCHIVE', 64, 174, 19, MUTED, 'medium', spacing=1.9)
    display_fit(art, 'Find your', 64, 200, 792, 93)
    display_fit(art, 'legend.', 64, 307, 750, 109)
    art.text('Enter a world of wings, scales, and ancient lore.', 64, 461, 27, MUTED)
    art.text('Find a form. Follow its story. Make it your own.', 64, 491, 27, MUTED)
    browse_actions(art)
    art.add('</g>')
    crest_panel(art)
    art.line(0, 596, 1440, 596, INK, 2)
    display_fit(art, 'Choose a dragon form', 40, 623, 540, 37)
    art.text('Start with the silhouette. Follow the story.', 663, 649, 24, MUTED)
    art.text('View all', 1278, 649, 23, INK, 'medium')
    art.icon('arrow', 1371, 629, 24, INK)
    compact_card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', ['A winged hunter with', 'a sharp, restless spirit.'], 40, 680, 438)
    compact_card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', ['A winding dragon of', 'mystery and ancient lore.'], 501, 680, 438)
    compact_card(art, 'drake', 'Drake', 'Four legs · Grounded', ['A grounded form built', 'for rugged landscapes.'], 962, 680, 438)
    art.save()


def mobile():
    art = Canvas(
        '03-splitsteel-bestiary-mobile',
        390,
        844,
        'Splitsteel Bestiary — Dragon Database Mobile Concept',
        'A mobile editorial dragon archive with an unchanged Swordslapper Classic logo, visible public navigation, a silver fantasy hero and Browse Dragons action, a compact charcoal crest feature, and two clear original Wyvern and Wyrm type cards with traits and Explore actions. The composition is designed for mobile reading rather than scaled from the desktop.',
    )
    art.rect(0, 0, 390, 844, PALE)
    navigation(art, mobile=True)
    display_fit(art, 'Find your', 18, 172, 354, 47)
    display_fit(art, 'legend.', 18, 227, 300, 53)
    art.text('Dragon forms, traits, and ancient lore.', 18, 311, 22, MUTED)
    browse_actions(art, mobile=True)
    crest_panel(art, mobile=True)
    display_fit(art, 'Dragon forms', 18, 501, 231, 28)
    art.text('View all', 296, 525, 20, INK, 'medium')
    art.icon('arrow', 351, 509, 20, INK)
    mobile_type_card(art, 'wyvern', 'Wyvern', 'Winged · Two legs', 'Swift aerial hunter.', 18, 543)
    mobile_type_card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Ancient winding form.', 18, 691)
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
