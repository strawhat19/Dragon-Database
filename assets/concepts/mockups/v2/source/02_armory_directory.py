from artwork import Canvas


INK = '#101115'
MUTED = '#5B626C'
CHROME = '#191B20'
SILVER = '#E4E7EB'
PAPER = '#F5F6F8'
STEEL = '#C5CBD3'
EDGE = '#B7BEC8'
IMAGE = '#D2D7DF'

TYPES = {
    'wyvern': {
        'name': 'Wyvern',
        'form': 'WINGED',
        'action': 'Explore Wyverns',
        'traits': ['Two legs', 'Winged'],
        'mobile_traits': 'Winged · Two legs',
        'description': ['A swift, winged silhouette', "with a hunter's instinct."],
        'mobile_description': ['Swift wings and a', "hunter's instinct."],
    },
    'wyrm': {
        'name': 'Wyrm',
        'form': 'SERPENTINE',
        'action': 'Explore Wyrms',
        'traits': ['Serpentine', 'Wingless'],
        'mobile_traits': 'Serpentine · Wingless',
        'description': ['An ancient, winding form', 'steeped in mystery and lore.'],
        'mobile_description': ['Ancient coils,', 'mystery, and lore.'],
    },
    'drake': {
        'name': 'Drake',
        'form': 'GROUNDED',
        'action': 'Explore Drakes',
        'traits': ['Four legs', 'Grounded'],
        'mobile_traits': 'Grounded · Four legs',
        'description': ['A powerful grounded dragon', 'built for rugged landscapes.'],
        'mobile_description': ['Grounded strength,', 'rugged landscapes.'],
    },
}


def dragon(canvas, kind, x, y, width):
    canvas.add(f'<g id="{canvas.name}-{kind}-dragon-illustration" transform="translate({x} {y}) scale({width / 180})" aria-label="Original {kind} dragon silhouette">')
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
        canvas.path('M74 65 L87 71 L82 83 L68 84 L70 72 Z M110 63 L128 66 L139 80 L130 86 L118 73 Z', INK)
        canvas.path('M124 57 C101 48 81 54 59 58 C35 63 24 50 12 49 C17 72 41 79 63 75 L70 87 L87 87 L83 72 L105 73 L113 88 L130 85 L125 70 L142 67 L151 74 L163 72 L156 61 L165 55 L177 57 L179 48 L166 39 L162 21 L153 34 L144 25 L144 47 Z', INK)
        canvas.path('M63 56 L75 43 L85 52 L96 38 L106 50 L117 41 L124 54 Z', INK)
        canvas.path('M155 44 L170 48 L158 51 Z', SILVER)
        canvas.path('M83 62 L112 58 L119 65 L91 69 Z', STEEL)
    canvas.add('</g>')


def trait(canvas, label, x, y, width):
    canvas.rect(x, y, width, 28, SILVER, 14)
    canvas.text(label, x + width / 2, y + 20, 18, MUTED, 'medium', anchor='middle')


def desktop_card(canvas, kind, x, y, width=368):
    details = TYPES[kind]
    canvas.add(f'<g id="{canvas.name}-{kind}-type-card" aria-label="Illustrative dragon type: {details["name"]}">')
    canvas.rect(x, y, width, 354, PAPER, 5, EDGE)
    canvas.rect(x, y, width, 132, IMAGE, 5)
    canvas.rect(x, y + 127, width, 5, IMAGE)
    canvas.text(details['form'], x + 20, y + 28, 17, MUTED, 'medium', spacing=1.2)
    canvas.circle(x + 253, y + 67, 52, stroke=EDGE)
    canvas.line(x + 181, y + 67, x + 328, y + 67, EDGE, opacity=0.5)
    dragon(canvas, kind, x + 139, y + 16, 200)
    canvas.text(details['name'], x + 20, y + 175, 38, INK, 'display')
    first_width = 112 if kind == 'wyrm' else 94
    trait(canvas, details['traits'][0], x + 20, y + 189, first_width)
    trait(canvas, details['traits'][1], x + 32 + first_width, y + 189, 102)
    canvas.text(details['description'][0], x + 20, y + 252, 23, MUTED)
    canvas.text(details['description'][1], x + 20, y + 279, 23, MUTED)
    canvas.rect(x + 20, y + 296, width - 40, 42, INK, 4)
    canvas.icon('compass', x + 33, y + 307, 21, SILVER)
    canvas.text(details['action'], x + 68, y + 324, 22, SILVER, 'bold')
    canvas.icon('arrow', x + width - 54, y + 307, 22, SILVER)
    canvas.add('</g>')


def mobile_card(canvas, kind, x, y):
    details = TYPES[kind]
    canvas.add(f'<g id="{canvas.name}-{kind}-type-card" aria-label="Illustrative dragon type: {details["name"]}">')
    canvas.rect(x, y, 358, 162, PAPER, 5, EDGE)
    canvas.rect(x, y, 116, 162, IMAGE, 5)
    canvas.rect(x + 111, y, 5, 162, IMAGE)
    canvas.circle(x + 58, y + 78, 44, stroke=EDGE)
    dragon(canvas, kind, x - 1, y + 38, 119)
    canvas.text(details['name'], x + 132, y + 34, 33, INK, 'display')
    canvas.text(details['mobile_traits'], x + 132, y + 58, 19, MUTED, 'medium')
    canvas.text(details['mobile_description'][0], x + 132, y + 88, 20, MUTED)
    canvas.text(details['mobile_description'][1], x + 132, y + 112, 20, MUTED)
    canvas.rect(x + 132, y + 125, 210, 29, INK, 4)
    canvas.text(details['action'], x + 145, y + 146, 21, SILVER, 'bold')
    canvas.icon('arrow', x + 318, y + 129, 20, SILVER)
    canvas.add('</g>')


def desktop():
    canvas = Canvas(
        '02-armory-directory-desktop',
        1440,
        900,
        'Armory Directory — Dragon Database Desktop Concept',
        'A public dragon directory in a dark application shell and silver workspace. Three substantial original Wyvern, Wyrm, and Drake type cards show illustrative traits, descriptions, and Explore actions. Dragon Dictionary is visible in navigation and in a linked explanatory rail panel targeting /dragon-dictionary. The chosen Swordmaw Hybrid logo remains unchanged.',
    )
    canvas.rect(0, 0, 1440, 900, INK)
    canvas.rect(0, 0, 1440, 112, CHROME)
    canvas.logo(24, 10, 245)
    canvas.text('Dragons', 583, 64, 24, SILVER, 'bold')
    canvas.text('Collections', 707, 64, 24, STEEL, 'medium')
    canvas.begin_link('dragon-dictionary-nav', 'Open Dragon Dictionary', '/dragon-dictionary')
    canvas.icon('book', 882, 44, 24, STEEL)
    canvas.text('Dragon Dictionary', 922, 64, 23, STEEL, 'medium')
    canvas.end_link()
    canvas.text('Lore', 1148, 64, 24, STEEL, 'medium')
    canvas.rect(1262, 32, 130, 48, 'none', 5, '#555A64')
    canvas.icon('sword', 1277, 45, 21, SILVER)
    canvas.text('Sign In', 1310, 63, 23, SILVER, 'medium')
    canvas.line(583, 83, 651, 83, SILVER, 2)
    canvas.line(0, 112, 1440, 112, '#363A42')

    canvas.add('<g id="02-armory-directory-desktop-browse-rail" aria-label="Archive navigation">')
    canvas.text('THE ARMORY', 24, 171, 18, STEEL, 'medium', spacing=1.7)
    canvas.rect(16, 196, 184, 48, '#30343C', 5)
    canvas.icon('compass', 29, 208, 24, SILVER)
    canvas.text('Browse Dragons', 64, 230, 21, SILVER, 'bold')
    canvas.icon('bookmark', 29, 264, 22, STEEL)
    canvas.text('Collections', 64, 286, 22, STEEL)
    canvas.icon('book', 29, 320, 23, STEEL)
    canvas.text('Dragon Lore', 64, 342, 22, STEEL)
    canvas.begin_link('dragon-dictionary', 'Open Dragon Dictionary', '/dragon-dictionary')
    canvas.rect(16, 377, 184, 177, '#292D34', 5, '#424852')
    canvas.icon('book', 32, 393, 27, SILVER)
    canvas.icon('arrow', 155, 394, 24, SILVER)
    canvas.text('Dragon', 32, 454, 31, SILVER, 'display')
    canvas.text('Dictionary', 32, 484, 31, SILVER, 'display')
    canvas.text('Names, forms,', 32, 516, 20, STEEL)
    canvas.text('and lore.', 32, 539, 20, STEEL)
    canvas.end_link()
    canvas.line(24, 697, 192, 697, '#343840')
    canvas.icon('sword', 29, 720, 23, STEEL)
    canvas.text('Sign In', 65, 742, 23, STEEL, 'medium')
    canvas.text('Browse first.', 28, 805, 20, STEEL)
    canvas.text('Collect your favorites.', 28, 832, 19, STEEL)
    canvas.add('</g>')

    canvas.add('<g id="02-armory-directory-desktop-silver-workspace" aria-label="Dragon type directory">')
    canvas.rect(216, 112, 1224, 788, SILVER)
    canvas.line(216, 112, 216, 900, '#515762')
    canvas.text('THE PUBLIC DRAGON ARCHIVE', 258, 166, 18, MUTED, 'medium', spacing=1.6)
    canvas.logo(1243, 141, 109, mark=True, opacity=0.12)
    canvas.text('Find your next legend.', 258, 243, 63, INK, 'display')
    canvas.text('Explore dragon forms, learn their traits, and find a favorite.', 258, 283, 26, MUTED)
    canvas.rect(258, 311, 861, 62, PAPER, 5, EDGE)
    canvas.icon('search', 278, 331, 25, MUTED)
    canvas.text('Search dragons, traits, or lore', 321, 351, 24, MUTED)
    canvas.rect(1137, 311, 261, 62, INK, 5)
    canvas.icon('compass', 1155, 330, 25, SILVER)
    canvas.text('Browse Dragons', 1195, 351, 23, SILVER, 'bold')
    canvas.icon('arrow', 1363, 330, 24, SILVER)
    canvas.rect(258, 394, 116, 35, INK, 18)
    canvas.text('All types', 316, 418, 21, SILVER, 'bold', anchor='middle')
    for label, x, width in [('Winged', 386, 107), ('Serpentine', 505, 139), ('Grounded', 656, 131)]:
        canvas.rect(x, 394, width, 35, 'none', 18, EDGE)
        canvas.text(label, x + width / 2, 418, 21, INK, 'medium', anchor='middle')
    canvas.text('The dragon types', 258, 472, 40, INK, 'display')
    canvas.text('Start with a silhouette. Follow the lore.', 1070, 469, 22, MUTED, anchor='middle')
    desktop_card(canvas, 'wyvern', 258, 489)
    desktop_card(canvas, 'wyrm', 644, 489)
    desktop_card(canvas, 'drake', 1030, 489)
    canvas.begin_link('dragon-dictionary-reference', 'Learn dragon forms in Dragon Dictionary', '/dragon-dictionary')
    canvas.icon('book', 260, 866, 20, MUTED)
    canvas.text('The Dragon Dictionary explains the names behind each form.', 295, 884, 22, MUTED)
    canvas.end_link()
    canvas.add('</g>')
    canvas.save()


def mobile():
    canvas = Canvas(
        '02-armory-directory-mobile',
        390,
        844,
        'Armory Directory — Dragon Database Mobile Concept',
        'A public mobile dragon directory with the unchanged chosen Swordmaw Hybrid logo, visible Dragons and Collections navigation, and a linked Dragon Dictionary panel targeting /dragon-dictionary. Search and browse controls lead into two substantial original Wyvern and Wyrm cards with traits, descriptions, and clear Explore actions.',
    )
    canvas.rect(0, 0, 390, 844, SILVER)
    canvas.rect(0, 0, 390, 150, CHROME)
    canvas.logo(12, 10, 208)
    canvas.rect(274, 30, 100, 44, 'none', 5, '#555A64')
    canvas.icon('menu', 285, 41, 21, SILVER)
    canvas.text('Menu', 316, 59, 21, SILVER, 'medium')
    canvas.line(16, 102, 374, 102, '#363A42')
    canvas.text('Dragons', 16, 134, 22, SILVER, 'bold')
    canvas.text('Collections', 137, 134, 22, STEEL, 'medium')
    canvas.text('Lore', 300, 134, 22, STEEL, 'medium')
    canvas.line(16, 146, 94, 146, SILVER, 2)
    canvas.begin_link('dragon-dictionary', 'Open Dragon Dictionary', '/dragon-dictionary')
    canvas.rect(0, 150, 390, 65, '#292D34')
    canvas.icon('book', 17, 169, 25, SILVER)
    canvas.text('Dragon Dictionary', 55, 178, 23, SILVER, 'bold')
    canvas.text('Understand the names behind the forms.', 55, 201, 18, STEEL)
    canvas.icon('arrow', 349, 169, 24, SILVER)
    canvas.end_link()
    canvas.text('Find your legend.', 16, 264, 44, INK, 'display')
    canvas.text('Discover forms, traits, and lore.', 16, 293, 22, MUTED)
    canvas.rect(16, 311, 358, 50, PAPER, 5, EDGE)
    canvas.icon('search', 32, 326, 22, MUTED)
    canvas.text('Search dragons or lore', 72, 344, 22, MUTED)
    canvas.rect(16, 373, 207, 38, INK, 4)
    canvas.icon('compass', 28, 383, 20, SILVER)
    canvas.text('Browse Dragons', 58, 400, 22, SILVER, 'bold')
    canvas.rect(237, 373, 137, 38, 'none', 19, EDGE)
    canvas.text('All types', 305.5, 400, 22, INK, 'medium', anchor='middle')
    canvas.text('Dragon types', 16, 446, 32, INK, 'display')
    canvas.text('Explore a form', 255, 445, 20, MUTED)
    mobile_card(canvas, 'wyvern', 16, 464)
    mobile_card(canvas, 'wyrm', 16, 642)
    canvas.text('View all dragon types', 16, 834, 23, INK, 'medium')
    canvas.icon('arrow', 343, 814, 24, INK)
    canvas.save()


if __name__ == '__main__':
    desktop()
    mobile()
