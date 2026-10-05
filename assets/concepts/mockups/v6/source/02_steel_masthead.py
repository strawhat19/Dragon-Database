from artwork import Canvas
from editorial import INK, MUTED, SILVER, heading
from materials import card, group, metal, browse, flames, header, search


ENTRIES = [
    ('wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.'),
    ('wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.'),
    ('drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.'),
]


def desktop():
    art = Canvas(
        '02-steel-masthead-desktop',
        1440,
        900,
        'Dragon Database — Steel Masthead Desktop Concept',
        'A centered silver-and-black archive hero with the unchanged Classic header logo and black Sign In button. A large clean The Scaling Collection title leads to a broad search field and public browsing action. A low brushed-steel band carries restrained black flame silhouettes and a modest unchanged DB dragon mark. Three readable steel-accented type cards and fine red active accents finish the composition.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    group(art, 'centered-masthead-hero', 'The Scaling Collection introduction')
    art.text('Dragon archive', 720, 183, 19, MUTED, anchor='middle')
    heading(art, 'The Scaling Collection', 720, 287, 100, 1160, 'display', INK, anchor='middle')
    art.text('Browse dragon forms, compare their traits, and follow the lore.', 720, 335, 25, MUTED, anchor='middle')
    search(art, 300, 372, 840, height=64, submit=True)
    browse(art, 607, 455, 226, height=52)
    art.add('</g>')

    group(art, 'steel-flame-band', 'Steel band with the archive mark and black flame silhouettes')
    metal(art, 80, 528, 1280, 121, name='masthead-brushed-steel')
    flames(art, 82, 591, 210, 56, opacity=0.94, name='left-engraved-black-flames')
    flames(art, 1148, 591, 210, 56, opacity=0.94, name='right-engraved-black-flames')
    band_copy_width = max(
        art.text_width('Forms, traits, and lore', 34, 'medium'),
        art.text_width('A starting point for exploring dragons.', 21, 'body'),
    )
    band_origin = 720 - (110 + 33 + band_copy_width) / 2
    art.logo(band_origin, 534, 110, mark=True)
    art.text('Forms, traits, and lore', band_origin + 143, 583, 34, INK, 'medium')
    art.text('A starting point for exploring dragons.', band_origin + 143, 616, 21, MUTED)
    art.add('</g>')

    group(art, 'steel-dragon-types', 'Dragon form catalog')
    heading(art, 'Dragon forms', 80, 697, 33, 700, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all types', 1211, 695, 21, INK, 'medium')
    art.icon('arrow', 1331, 677, 21, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES):
        card(art, kind, title, traits, description, 80 + index * 435, 717, width=410, height=166, steel=True)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '02-steel-masthead-mobile',
        390,
        844,
        'Dragon Database — Steel Masthead Mobile Concept',
        'A centered mobile archive design with the unchanged Classic logo and black Sign In button. Clean The Scaling Collection typography, a prominent search field, and public browsing action lead into a compact brushed-steel band with quiet black flame silhouettes and the original DB mark. Two readable steel-accented dragon type cards fit within the frame.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    group(art, 'centered-masthead-hero', 'The Scaling Collection mobile introduction')
    art.text('Dragon archive', 195, 133, 17, MUTED, anchor='middle')
    heading(art, 'The Scaling', 195, 179, 50, 342, 'display', INK, anchor='middle')
    heading(art, 'Collection', 195, 225, 50, 342, 'display', INK, anchor='middle')
    art.text('Forms, traits, and lore.', 195, 259, 20, MUTED, anchor='middle')
    search(art, 24, 278, 342, height=52, compact=True)
    browse(art, 82, 344, 226, height=48)
    art.add('</g>')

    group(art, 'steel-flame-band', 'Compact steel band with the archive mark')
    metal(art, 24, 407, 342, 77, name='masthead-brushed-steel')
    flames(art, 25, 453, 37, 30, opacity=0.94, name='left-engraved-black-flames')
    flames(art, 327, 453, 37, 30, opacity=0.94, name='right-engraved-black-flames')
    band_copy_width = max(
        art.text_width('Forms, traits, lore', 20, 'medium'),
        art.text_width('Explore the archive', 18, 'body'),
    )
    band_origin = 195 - (55 + 14 + band_copy_width) / 2
    art.logo(band_origin, 418, 55, mark=True)
    art.text('Forms, traits, lore', band_origin + 69, 440, 20, INK, 'medium')
    art.text('Explore the archive', band_origin + 69, 465, 18, MUTED)
    art.add('</g>')

    group(art, 'steel-dragon-types', 'Dragon form catalog')
    heading(art, 'Dragon forms', 24, 517, 28, 240, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all', 287, 515, 20, INK, 'medium')
    art.icon('arrow', 345, 498, 20, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES[:2]):
        card(art, kind, title, traits, description, 24, 534 + index * 156, width=342, height=141, mobile=True, steel=True)
    art.add('</g>')
    art.save()


desktop()
mobile()
