from artwork import Canvas


INK = '#101115'
PALE = '#E4E7EB'
RULE = '#3B404A'
MUTED = '#ADB5C0'
STEEL = '#C5CBD3'
PANEL = '#1B1E24'
DISPLAY = 'slapper'
DICTIONARY = '/dragon-dictionary'


def heading(art, value, x, y, size, width):
    fitted = min(size, size * width / art.text_width(value, size, DISPLAY))
    art.text(value, x, y, fitted, PALE, DISPLAY)


def creature(art, kind, x, y, width):
    art.add(f'<g transform="translate({x} {y}) scale({width / 180})" aria-label="Original {kind} silhouette">')
    if kind == 'wyvern':
        art.path('M113 62 L94 13 L90 38 L24 19 L42 46 L19 61 L51 59 L44 82 L85 69 L107 80 Z', STEEL)
        art.path('M109 62 C84 77 61 86 44 68 C31 56 29 48 22 51 C16 68 33 91 62 93 C84 95 104 87 120 72 L130 69 L132 79 L146 82 L151 72 L141 63 L151 59 L163 61 L173 53 L160 41 L151 39 L149 20 L139 33 L130 26 L130 46 Z', STEEL)
        art.path('M40 31 L87 49 L97 66 L71 56 Z', PANEL)
        art.path('M141 46 L157 49 L146 52 Z', INK)
    elif kind == 'wyrm':
        art.path('M145 39 C120 20 81 24 63 47 C45 71 26 77 18 61 C7 42 33 25 46 34 C59 43 54 66 71 75 C96 88 126 71 115 51 C103 29 87 56 98 64', stroke=STEEL, sw=13)
        art.path('M132 40 L143 25 L136 13 L153 24 L155 16 L164 33 L178 37 L170 46 L158 46 L154 57 L143 54 Z', STEEL)
        art.path('M151 35 L166 39 L154 42 Z', INK)
    else:
        art.path('M124 57 C101 48 81 54 59 58 C35 63 24 50 12 49 C17 72 41 79 63 75 L70 87 L87 87 L83 72 L105 73 L113 88 L130 85 L125 70 L142 67 L151 74 L163 72 L156 61 L165 55 L177 57 L179 48 L166 39 L162 21 L153 34 L144 25 L144 47 Z', STEEL)
        art.path('M63 56 L75 43 L85 52 L96 38 L106 50 L117 41 L124 54 Z', STEEL)
        art.path('M155 44 L170 48 L158 51 Z', INK)
    art.add('</g>')


def dictionary_link(art, x, y, mobile=False):
    art.begin_link('dictionary-link', 'Open Dragon Dictionary', DICTIONARY)
    if not mobile:
        art.rect(x, y, 286, 60, PANEL, 3, RULE)
    art.icon('book', x + (0 if mobile else 20), y + (0 if mobile else 18), 24, STEEL)
    art.text('Dragon Dictionary', x + (37 if mobile else 59), y + (21 if mobile else 39), 21, PALE, 'medium')
    art.icon('arrow', x + (308 if mobile else 243), y + (0 if mobile else 19), 22, STEEL)
    art.end_link()


def type_card(art, kind, title, tag, lines, x, y, width, mobile=False):
    height = 174 if mobile else 225
    art.add(f'<g id="{art.name}-dragon-type-card-{kind}" aria-label="{title} dragon type card">')
    art.rect(x, y, width, height, PANEL, 4, RULE)
    if mobile:
        art.rect(x + 12, y + 13, 104, 146, '#252A33', 2)
        art.circle(x + 64, y + 70, 44, stroke=RULE)
        creature(art, kind, x + 14, y + 35, 101)
        art.text(tag, x + 64, y + 144, 11, MUTED, 'bold', 1.4, 'middle')
        fitted = min(28, 28 * 185 / art.text_width(title, 28, DISPLAY))
        art.text(title, x + 134, y + 41, fitted, PALE, DISPLAY)
        for index, line in enumerate(lines):
            art.text(line, x + 134, y + 75 + index * 23, 18, MUTED)
        art.text('Explore Type', x + 134, y + 145, 18, PALE, 'bold')
        art.icon('arrow', x + width - 36, y + 127, 20, STEEL)
    else:
        art.text(title, x + 24, y + 42, 34, PALE, DISPLAY)
        art.text(tag, x + 24, y + 72, 12, MUTED, 'bold', 1.8)
        art.circle(x + width - 97, y + 67, 46, stroke=RULE)
        creature(art, kind, x + width - 180, y + 27, 165)
        art.line(x + 24, y + 109, x + width - 24, y + 109, RULE)
        for index, line in enumerate(lines):
            art.text(line, x + 24, y + 141 + index * 25, 20, MUTED)
        art.text(f'Explore {title}s', x + 24, y + 204, 18, PALE, 'bold')
        art.icon('arrow', x + width - 49, y + 187, 23, STEEL)
    art.add('</g>')


def desktop():
    art = Canvas(
        '01-obsidian-bestiary-desktop', 1440, 900,
        'Dragon Database — Obsidian Bestiary desktop hero',
        'A continuation of Obsidian Codex with the original Hybrid logo, a DragonSlapper headline, a prominent Dragon Dictionary link, a silver dragon crest, and three illustrated dragon type cards.'
    )
    art.rect(0, 0, 1440, 900, INK)
    art.logo(64, 14, 264)
    for label, x in [('Dragons', 710), ('Collections', 822)]:
        art.text(label, x, 73, 21, PALE, 'medium')
    art.begin_link('dictionary-navigation', 'Open Dragon Dictionary', DICTIONARY)
    art.icon('book', 988, 53, 20, STEEL)
    art.text('Dragon Dictionary', 1020, 73, 19, PALE, 'medium')
    art.end_link()
    art.rect(1230, 39, 146, 48, PANEL, 3, RULE)
    art.text('Sign In', 1264, 70, 20, PALE, 'medium')
    art.icon('arrow', 1336, 52, 22, STEEL)
    art.line(64, 126, 1376, 126, RULE)

    art.text('THE DRAGON BESTIARY', 72, 194, 15, STEEL, 'bold', 3)
    heading(art, 'Every dragon.', 68, 289, 86, 780)
    heading(art, 'Has a story.', 68, 374, 86, 780)
    art.text('Discover the forms, legends, and lineages', 72, 423, 25, MUTED)
    art.text('behind your next favorite dragon.', 72, 456, 25, MUTED)
    art.rect(72, 486, 282, 60, PALE, 3)
    art.icon('compass', 92, 504, 24, INK)
    art.text('Browse Dragons', 133, 526, 23, INK, 'bold')
    art.icon('arrow', 310, 505, 22, INK)
    dictionary_link(art, 373, 486)

    art.circle(1121, 367, 218, stroke='#292D35')
    art.path('M921 163H1321L1337 179V548L1321 564H921L905 548V179Z', STEEL)
    art.path('M929 174H1313L1326 187V539L1313 552H929L916 539V187Z', stroke='#9DA7B5')
    art.text('THE ARCHIVE SEAL', 1121, 198, 12, INK, 'bold', 2.5, 'middle')
    art.logo(971, 214, 300, mark=True)
    art.text('FOR THE LEGENDS YOU COLLECT', 1121, 537, 11, INK, 'bold', 1.5, 'middle')

    art.line(72, 591, 1368, 591, RULE)
    heading(art, 'Choose a dragon type', 72, 633, 37, 774)
    art.text('Explore the lineages', 1182, 629, 20, MUTED, 'medium')
    art.icon('arrow', 1343, 610, 24, STEEL)
    cards = [
        ('wyvern', 'Wyvern', 'WINGED / TWO-LEGGED', ['Wings built for wild horizons.', 'Discover the sky-bound legends.']),
        ('wyrm', 'Wyrm', 'SERPENTINE / ANCIENT', ['Coiled forms and deep-rooted lore.', 'Follow the winding stories.']),
        ('drake', 'Drake', 'GROUNDED / POWERFUL', ['Strength close to the earth.', 'Meet the dragons of land and stone.']),
    ]
    for index, (kind, title, tag, lines) in enumerate(cards):
        type_card(art, kind, title, tag, lines, 72 + index * 440, 650, 416)
    art.save()


def mobile():
    art = Canvas(
        '01-obsidian-bestiary-mobile', 390, 844,
        'Dragon Database — Obsidian Bestiary mobile hero',
        'A charcoal mobile hero with DragonSlapper display text, the unchanged Hybrid logo, a visible linked Dragon Dictionary action, and two substantial dragon type cards above the fold.'
    )
    art.rect(0, 0, 390, 844, INK)
    art.logo(18, 10, 184)
    art.icon('menu', 338, 34, 24, PALE)
    art.line(18, 92, 372, 92, RULE)
    art.text('THE DRAGON BESTIARY', 24, 127, 12, STEEL, 'bold', 2.1)
    heading(art, 'Every dragon.', 23, 186, 48, 344)
    heading(art, 'Has a story.', 23, 240, 48, 344)
    art.text('Explore their forms, origins, and lore.', 24, 281, 19, MUTED)
    art.rect(24, 306, 342, 54, PALE, 3)
    art.icon('compass', 42, 322, 23, INK)
    art.text('Browse Dragons', 82, 342, 22, INK, 'bold')
    art.icon('arrow', 323, 322, 23, INK)
    dictionary_link(art, 24, 379, mobile=True)
    art.line(24, 427, 366, 427, RULE)
    heading(art, 'Choose a type', 24, 460, 30, 280)
    type_card(art, 'wyvern', 'Wyvern', 'WINGED', ['Wings and wild', 'horizons.'], 24, 480, 342, mobile=True)
    type_card(art, 'wyrm', 'Wyrm', 'SERPENTINE', ['Ancient coils and', 'winding stories.'], 24, 666, 342, mobile=True)
    art.save()


desktop()
mobile()
