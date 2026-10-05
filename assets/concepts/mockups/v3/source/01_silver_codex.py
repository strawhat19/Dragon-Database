from artwork import Canvas
from dragons import CHROME, EDGE, INK, MUTED, PALE, PAPER, STEEL, compact_card, heading, mobile_card


def desktop():
    art = Canvas(
        '01-silver-codex-desktop', 1440, 900,
        'Dragon Database — Silver Codex desktop hero',
        'An Obsidian Codex editorial split hero using the Armory silver and black palette, the exact selected Swordslapper Classic underline logo, a large framed dragon crest, and three illustrated dragon type cards.'
    )
    art.rect(0, 0, 1440, 900, PALE)
    art.rect(0, 0, 1440, 128, CHROME)
    art.logo(64, 14, 264)
    for label, x in [('Dragons', 743), ('Collections', 878), ('Lore', 1058)]:
        art.text(label, x, 76, 23, PALE if label == 'Dragons' else STEEL, 'bold' if label == 'Dragons' else 'medium')
    art.rect(1201, 42, 175, 49, 'none', 4, '#555A64')
    art.icon('sword', 1220, 55, 22, STEEL)
    art.text('Sign In', 1257, 75, 22, PALE, 'medium')
    art.line(64, 127, 1376, 127, '#363A42')

    art.text('THE PUBLIC DRAGON ARCHIVE', 72, 208, 15, MUTED, 'bold', 2.7)
    heading(art, 'Every dragon.', 68, 315, 110, 760)
    heading(art, 'One archive.', 68, 412, 110, 760)
    art.text('Explore dragon forms, discover their stories,', 72, 471, 25, MUTED)
    art.text('and build a collection worthy of legend.', 72, 504, 25, MUTED)
    art.rect(72, 541, 285, 60, INK, 4)
    art.icon('compass', 93, 559, 24, PALE)
    art.text('Browse Dragons', 133, 582, 24, PALE, 'bold')
    art.icon('arrow', 312, 560, 24, STEEL)
    art.icon('book', 395, 559, 24, INK)
    art.text('Explore Lore', 435, 581, 23, INK, 'medium')

    art.circle(1118, 371, 239, stroke=EDGE, opacity=.6)
    art.line(864, 371, 885, 371, EDGE)
    art.line(1350, 371, 1371, 371, EDGE)
    art.path('M921 168H1315L1331 184V572L1315 588H921L905 572V184Z', CHROME)
    art.path('M931 178H1305L1321 194V562L1305 578H931L915 562V194Z', PAPER)
    art.text('THE ARCHIVE SEAL', 1118, 211, 12, MUTED, 'bold', 2.4, 'middle')
    art.logo(960, 227, 316, mark=True)
    art.text('FOR THE LEGENDS YOU COLLECT', 1118, 559, 12, MUTED, 'bold', 1.5, 'middle')

    art.line(72, 632, 1368, 632, EDGE)
    heading(art, 'Start with a dragon type', 72, 675, 42, 820)
    art.text('Find your next favorite', 1368, 671, 21, MUTED, 'medium', anchor='end')
    cards = [
        ('wyvern', 'Wyvern', 'Winged · Two legs', ['Wings and wild horizons.', 'Discover the sky-bound legends.']),
        ('wyrm', 'Wyrm', 'Serpentine · Wingless', ['Ancient coils and quiet power.', 'Follow their winding stories.']),
        ('drake', 'Drake', 'Grounded · Four legs', ['Strength close to the earth.', 'Meet the dragons of land and stone.']),
    ]
    for index, (kind, title, traits, lines) in enumerate(cards):
        compact_card(art, kind, title, traits, lines, 72 + index * 440, 694, 416, 184)
    art.save()


def mobile():
    art = Canvas(
        '01-silver-codex-mobile', 390, 844,
        'Dragon Database — Silver Codex mobile hero',
        'A mobile silver editorial hero with the exact Swordslapper Classic underline logo, bold DragonSlapper display text, public browse and lore actions, and two illustrated dragon type cards.'
    )
    art.rect(0, 0, 390, 844, PALE)
    art.rect(0, 0, 390, 98, CHROME)
    art.logo(18, 10, 198)
    art.icon('menu', 338, 37, 24, PALE)
    art.line(18, 97, 372, 97, '#363A42')
    art.text('THE DRAGON ARCHIVE', 24, 136, 12, MUTED, 'bold', 2.2)
    heading(art, 'Every dragon.', 23, 194, 68, 344)
    heading(art, 'One archive.', 23, 252, 68, 344)
    art.text('Discover forms, stories, and the', 24, 290, 21, MUTED)
    art.text('dragons worth collecting.', 24, 319, 21, MUTED)
    art.rect(24, 343, 342, 54, INK, 4)
    art.icon('compass', 43, 359, 23, PALE)
    art.text('Browse Dragons', 83, 380, 23, PALE, 'bold')
    art.icon('arrow', 323, 359, 23, STEEL)
    art.icon('book', 111, 418, 21, INK)
    art.text('Explore Lore', 148, 438, 20, INK, 'medium')
    art.line(24, 463, 366, 463, EDGE)
    heading(art, 'Dragon types', 24, 501, 40, 304)
    mobile_card(art, 'wyvern', 'Wyvern', 'Winged · Two legs', 'Wings and wild horizons.', 24, 521, height=145)
    mobile_card(art, 'wyrm', 'Wyrm', 'Serpentine · Wingless', 'Ancient coils and lore.', 24, 680, height=145)
    art.save()


desktop()
mobile()
