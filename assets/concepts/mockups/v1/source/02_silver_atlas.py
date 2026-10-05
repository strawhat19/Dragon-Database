from artwork import Canvas


INK = '#101115'
MUTED = '#555D68'
SILVER = '#DDE2E8'
EDGE = '#ADB5C0'
PAPER = '#EEF0F3'


def desktop():
    art = Canvas(
        '02-silver-atlas-desktop', 1440, 900,
        'Dragon Database — Silver Atlas desktop hero',
        'A centered silver landing page with the unchanged Swordmaw Hybrid logo, a bold fantasy headline, prominent search, and category shortcuts. Above-the-fold concept at 1440 by 900.'
    )
    art.add('<defs><linearGradient id="silver-atlas-ground" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#EEF0F3"/><stop offset=".5" stop-color="#DDE2E8"/><stop offset="1" stop-color="#C5CBD3"/></linearGradient></defs>')
    art.rect(0, 0, 1440, 900, 'url(#silver-atlas-ground)')
    art.rect(0, 0, 1440, 112, PAPER)
    art.logo(64, 10, 88, mark=True)
    art.text('Dragon Database', 164, 66, 27, INK, 'bold')
    for label, x in [('Dragons', 645), ('Collections', 761), ('Lore', 913)]:
        art.text(label, x, 63, 21, MUTED, 'medium')
    art.rect(1230, 30, 146, 50, INK, 4)
    art.text('Sign In', 1286, 61, 20, PAPER, 'medium')
    art.icon('arrow', 1249, 43, 22, PAPER)
    art.line(64, 112, 1376, 112, EDGE)

    art.text('THE DRAGON ARCHIVE', 720, 153, 15, MUTED, 'bold', 3.2, 'middle')
    art.line(282, 184, 282, 641, EDGE)
    art.line(1158, 184, 1158, 641, EDGE)
    art.line(254, 184, 310, 184, EDGE)
    art.line(1130, 184, 1186, 184, EDGE)
    art.line(254, 641, 310, 641, EDGE)
    art.line(1130, 641, 1186, 641, EDGE)
    art.text('FOLIO', 137, 238, 15, MUTED, 'bold', 2.5, 'middle')
    art.text('01', 137, 283, 46, INK, 'display', 0, 'middle')
    art.text('An atlas of', 1300, 257, 17, MUTED, 'body', 0, 'middle')
    art.text('the legendary', 1300, 281, 17, MUTED, 'body', 0, 'middle')
    art.icon('compass', 1280, 305, 40, MUTED)

    art.rect(404, 181, 632, 242, '#C5CBD3', 0, '#69727E')
    art.logo(414, 187, 612)
    for x, direction in [(397, 1), (1043, -1)]:
        art.path(f'M{x} 192v-18h{18 * direction}M{x} 412v18h{18 * direction}', stroke=INK, sw=2)
    art.text('Legends, catalogued.', 720, 505, 83, INK, 'display', 0, 'middle')
    art.text('Explore dragon lineages, uncover their lore,', 720, 551, 23, MUTED, 'body', 0, 'middle')
    art.text('and build a collection worthy of legend.', 720, 580, 23, MUTED, 'body', 0, 'middle')

    art.rect(368, 615, 704, 66, PAPER, 4, EDGE)
    art.icon('search', 391, 636, 24, MUTED)
    art.text('Search dragons, lineages, or lore...', 432, 656, 21, MUTED)
    art.rect(900, 623, 164, 50, INK, 3)
    art.text('Explore', 920, 655, 20, PAPER, 'bold')
    art.icon('arrow', 1024, 637, 22, PAPER)
    art.text('Browse by lineage', 536, 720, 17, MUTED, 'medium', 0, 'end')
    for index, (label, x, width) in enumerate([('Wyverns', 559, 102), ('Wyrms', 675, 92), ('Drakes', 781, 92)]):
        art.rect(x, 696, width, 36, '#D4DAE2', 2, EDGE)
        art.text(label, x + width / 2, 720, 17, INK, 'medium', 0, 'middle')

    art.line(64, 772, 1376, 772, EDGE)
    for x, number, heading, body, icon in [
        (92, '01', 'Discover dragons', 'Follow the lineages.', 'compass'),
        (535, '02', 'Keep a collection', 'Gather your favorites.', 'bookmark'),
        (978, '03', 'Read their stories', 'Go beyond the scales.', 'book'),
    ]:
        art.text(number, x, 812, 14, MUTED, 'bold', 1.5)
        art.icon(icon, x + 42, 787, 26, INK)
        art.text(heading, x + 82, 815, 23, INK, 'bold')
        art.text(body, x + 82, 844, 19, MUTED)
    art.save()


def mobile():
    art = Canvas(
        '02-silver-atlas-mobile', 390, 844,
        'Dragon Database — Silver Atlas mobile hero',
        'A mobile silver hero that brings the unchanged logo above a stacked fantasy headline, public search and browse actions, and lineage shortcuts.'
    )
    art.add('<defs><linearGradient id="silver-atlas-mobile-ground" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#EEF0F3"/><stop offset="1" stop-color="#C5CBD3"/></linearGradient></defs>')
    art.rect(0, 0, 390, 844, 'url(#silver-atlas-mobile-ground)')
    art.rect(0, 0, 390, 82, PAPER)
    art.logo(17, 11, 60, mark=True)
    art.text('Dragon Database', 87, 48, 22, INK, 'bold')
    art.icon('menu', 340, 29, 25, INK)
    art.line(24, 82, 366, 82, EDGE)

    art.text('THE DRAGON ARCHIVE', 195, 120, 13, MUTED, 'bold', 2.3, 'middle')
    art.rect(24, 144, 342, 144, '#C5CBD3', 0, '#69727E')
    art.logo(33, 157, 324)
    art.path('M20 155v-15h15M370 278v15h-15', stroke=INK, sw=2)
    art.text('Legends,', 195, 355, 56, INK, 'display', 0, 'middle')
    art.text('catalogued.', 195, 417, 56, INK, 'display', 0, 'middle')
    art.text('A field guide to dragons,', 195, 462, 21, MUTED, 'body', 0, 'middle')
    art.text('their lineages, and their lore.', 195, 489, 21, MUTED, 'body', 0, 'middle')

    art.rect(24, 521, 342, 58, PAPER, 3, EDGE)
    art.icon('search', 42, 539, 22, MUTED)
    art.text('Search dragons...', 79, 558, 20, MUTED)
    art.rect(24, 592, 342, 56, INK, 3)
    art.text('Browse Dragons', 195, 627, 22, PAPER, 'bold', 0, 'middle')
    art.icon('arrow', 319, 609, 22, PAPER)
    for label, x, width in [('Wyverns', 24, 108), ('Wyrms', 145, 102), ('Drakes', 260, 106)]:
        art.rect(x, 665, width, 38, '#D4DAE2', 2, EDGE)
        art.text(label, x + width / 2, 691, 18, INK, 'medium', 0, 'middle')

    art.line(24, 740, 366, 740, EDGE)
    art.text('YOUR NEXT CHAPTER', 24, 770, 12, MUTED, 'bold', 2)
    art.icon('book', 26, 788, 25, INK)
    art.text('Explore the lore', 66, 812, 25, INK, 'bold')
    art.icon('arrow', 338, 791, 24, INK)
    art.save()


desktop()
mobile()
