from artwork import Canvas
from banner_stage import steel_stage
from lettering import scaled_heading
from editorial import INK, EDGE, MUTED, SILVER, heading
from materials import card, group, browse, header, search


ENTRIES = [
    ('wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.'),
    ('wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.'),
    ('drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.'),
]


def desktop():
    art = Canvas(
        '02-emblem-title-desktop',
        1440,
        900,
        'Dragon Database — Emblem & Title Desktop Concept',
        'A full-width brushed-steel banner contains the complete The Scaling Collection hero title, with a prominent unchanged DB dragon mark on the left and custom two-line lettering on the right. Steel scales remain inside Scaling’s capital S and silver slit-pupil eyes remain inside Collection’s two lowercase o counters. Curling black flames and small flying dragon silhouettes stay at the banner edges. A separate search and public browsing row leads into three readable steel-accented dragon type cards. The selected Classic header logo and black Sign In button remain unchanged.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    steel_stage(art, 0, 144, 1440, 300, span=178, flame_height=112)
    group(art, 'banner-emblem-and-title', 'The Scaling Collection banner title and original dragon emblem')
    art.logo(247, 171, 245, mark=True)
    art.text('Dragon archive', 591, 184, 18, MUTED, 'medium')
    scaled_heading(art, 'The Scaling', 587, 269, 99, 660, anchor='start')
    scaled_heading(art, 'Collection', 587, 363, 99, 660, anchor='start')
    art.text('Explore dragon forms, their traits, and lore.', 591, 408, 23, MUTED)
    art.add('</g>')

    group(art, 'below-banner-search-and-browse', 'Search and browse the dragon archive')
    search(art, 80, 483, 1000, height=58)
    browse(art, 1100, 483, 260, height=58)
    art.add('</g>')

    group(art, 'steel-dragon-form-catalog', 'Dragon form catalog')
    art.line(80, 590, 1360, 590, EDGE)
    heading(art, 'Dragon forms', 80, 640, 33, 650, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all types', 1211, 638, 21, INK, 'medium')
    art.icon('arrow', 1331, 620, 21, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES):
        card(art, kind, title, traits, description, 80 + index * 435, 663, width=410, height=181, steel=True)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '02-emblem-title-mobile',
        390,
        844,
        'Dragon Database — Emblem & Title Mobile Concept',
        'The complete The Scaling Collection title sits inside a full-width steel mobile banner beside a compact unchanged DB dragon mark. Scaling’s S retains its steel-scale detail and both o counters in Collection retain silver dragon eyes. Black curling flames and small flying dragons remain at the banner edges. Search and public browsing controls appear below the banner, followed by two complete readable steel-accented dragon type cards. The selected Classic mobile header logo and black Sign In button remain unchanged.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    steel_stage(art, 0, 116, 390, 250, mobile=True, span=41, flame_height=66)
    group(art, 'banner-emblem-and-title', 'The Scaling Collection mobile banner title and original dragon emblem')
    art.logo(22, 174, 100, mark=True)
    art.text('Dragon archive', 135, 158, 17, MUTED, 'medium')
    scaled_heading(art, 'The Scaling', 132, 207, 45, 235, anchor='start')
    scaled_heading(art, 'Collection', 132, 257, 45, 235, anchor='start')
    art.text('Dragon forms, traits, and lore.', 195, 316, 20, MUTED, anchor='middle')
    art.add('</g>')

    group(art, 'below-banner-search-and-browse', 'Search and browse the dragon archive')
    search(art, 24, 383, 342, height=52, compact=True)
    browse(art, 24, 447, 342, height=48)
    art.add('</g>')

    group(art, 'steel-dragon-form-catalog', 'Dragon form catalog')
    heading(art, 'Dragon forms', 24, 526, 28, 240, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all', 287, 524, 20, INK, 'medium')
    art.icon('arrow', 345, 507, 20, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES[:2]):
        card(art, kind, title, traits, description, 24, 541 + index * 155, width=342, height=141, mobile=True, steel=True)
    art.add('</g>')
    art.save()


desktop()
mobile()
