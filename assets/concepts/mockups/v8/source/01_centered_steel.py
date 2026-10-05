from artwork import Canvas
from lettering import scaled_heading
from banner_stage import steel_stage
from editorial import INK, MUTED, SILVER, heading
from materials import card, group, browse, header, search


ENTRIES = [
    ('wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.'),
    ('wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.'),
    ('drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.'),
]


def desktop():
    art = Canvas(
        '01-centered-steel-desktop',
        1440,
        900,
        'Centered Steel — Dragon Database Desktop Concept',
        'A full-width brushed-steel hero sits below the selected Classic header with a quiet gap. The unchanged DB dragon mark is centered above The Scaling Collection title and supporting copy, all contained inside the banner. The custom heading keeps scale details in the Scaling S and dragon eyes in the Collection o letters. Curled black flame tongues and original small flying dragon silhouettes remain at the outer edges. Public search, Browse Dragons, black secondary Sign In, and three steel-accented type cards complete the static concept.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    steel_stage(art, 0, 144, 1440, 334)
    group(art, 'centered-steel-banner-content', 'The Scaling Collection steel banner introduction')
    art.logo(665, 166, 110, mark=True)
    scaled_heading(art, 'The Scaling Collection', 720, 366, 86, 1000)
    art.text('Browse dragon forms, compare their traits, and follow the lore.', 720, 420, 25, MUTED, anchor='middle')
    art.add('</g>')

    group(art, 'public-archive-controls', 'Public archive search and browsing')
    search(art, 300, 509, 840, height=64, submit=True)
    browse(art, 607, 591, 226, height=52)
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
        '01-centered-steel-mobile',
        390,
        844,
        'Centered Steel — Dragon Database Mobile Concept',
        'A full-width brushed-steel mobile hero sits beneath the selected Classic header with a quiet gap. A small unchanged DB mark, two-line The Scaling Collection heading, and neutral supporting copy are contained inside the banner. The scale-decorated S and dragon-eye o details remain in the custom title. Curled black flames and tiny original flying dragons stay at the edges. Search and Browse Dragons sit below the banner, followed by two complete steel-accented dragon type cards.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    steel_stage(art, 0, 116, 390, 252, mobile=True)
    group(art, 'centered-steel-banner-content', 'The Scaling Collection mobile steel banner introduction')
    art.logo(167.5, 133, 55, mark=True)
    scaled_heading(art, 'The Scaling', 195, 243, 46, 294)
    scaled_heading(art, 'Collection', 195, 290, 46, 294)
    art.text('Forms, traits, and lore.', 195, 339, 20, MUTED, anchor='middle')
    art.add('</g>')

    group(art, 'public-archive-controls', 'Public archive search and browsing')
    search(art, 24, 388, 342, height=48, compact=True)
    browse(art, 82, 450, 226, height=46)
    art.add('</g>')
    group(art, 'steel-dragon-types', 'Dragon form catalog')
    heading(art, 'Dragon forms', 24, 530, 28, 240, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all', 287, 528, 20, INK, 'medium')
    art.icon('arrow', 345, 511, 20, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES[:2]):
        card(art, kind, title, traits, description, 24, 547 + index * 152, width=342, height=138, mobile=True, steel=True)
    art.add('</g>')
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
