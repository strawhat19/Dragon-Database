from artwork import Canvas
from lettering import scaled_heading
from banner_stage import steel_stage
from editorial import INK, MUTED, SILVER
from materials import RED, browse, card, group, header, search


def desktop():
    art = Canvas(
        '03-search-in-steel-desktop',
        1440,
        900,
        'Dragon Database — Search in Steel Desktop Concept',
        'The preserved silver Editorial header and unchanged Swordslapper Classic logo sit above a tall full-width brushed-steel hero. The Scaling Collection title, with scales on its S and slit-pupil eyes in its two Collection o letters, is contained inside the steel together with a prominent search field and Browse Dragons action. Curling black flame clusters and subtle flying dragons stay at the lower outer edges. Three readable steel-topped dragon type cards form a clean silver catalog below.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    steel_stage(art, 0, 144, 1440, 420, span=188, flame_height=120)

    group(art, 'search-in-steel-hero-content', 'The Scaling Collection title and archive controls inside brushed steel')
    art.line(696, 182, 744, 182, RED, 2)
    art.text('Dragon archive', 720, 212, 20, MUTED, anchor='middle')
    scaled_heading(art, 'The Scaling Collection', 720, 298, 90, 1056)
    art.text('Explore dragon forms, compare their traits, and follow the lore.', 720, 346, 25, MUTED, anchor='middle')
    search(art, 290, 385, 612, 60, submit=True)
    browse(art, 924, 385, 226, 60)
    art.add('</g>')

    group(art, 'dragon-forms-catalog', 'Illustrated dragon type catalog')
    art.text('Explore dragon forms', 82, 625, 32, INK, 'medium')
    art.begin_link('all-dragon-forms', 'Browse all dragon forms', '/dragons')
    art.text('Browse all forms', 1358, 622, 20, INK, 'medium', anchor='end')
    art.end_link()
    card(art, 'wyvern', 'Wyvern', 'Two legs · Broad wings', 'Winged hunters of open skies.', 82, 651, 408, 172, steel=True)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Ancient forms with winding bodies.', 516, 651, 408, 172, steel=True)
    card(art, 'drake', 'Drake', 'Four legs · Wingless', 'Grounded dragons built for strength.', 950, 651, 408, 172, steel=True)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '03-search-in-steel-mobile',
        390,
        844,
        'Dragon Database — Search in Steel Mobile Concept',
        'The preserved silver mobile header retains the unchanged Swordslapper Classic logo and black Sign In button. A full-width brushed-steel banner contains the two-line Scaling Collection title, custom scales and dragon-eye details, supporting copy, search, and a Browse Dragons action. Small corrected curling black flames and flying dragon silhouettes occupy its lower corners without covering the controls. Two steel-topped dragon type cards fit fully within the silver catalog below.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    steel_stage(art, 0, 116, 390, 385, mobile=True, span=42, flame_height=66)

    group(art, 'search-in-steel-hero-content', 'The Scaling Collection title and mobile archive controls inside brushed steel')
    art.line(174, 148, 216, 148, RED, 2)
    art.text('Dragon archive', 195, 180, 18, MUTED, anchor='middle')
    scaled_heading(art, 'The Scaling', 195, 235, 51, 342)
    scaled_heading(art, 'Collection', 195, 285, 51, 342)
    art.text('Forms, traits, and lore.', 195, 313, 20, MUTED, anchor='middle')
    search(art, 24, 330, 342, 50, compact=True)
    browse(art, 54, 397, 282, 52)
    art.add('</g>')

    group(art, 'dragon-forms-catalog', 'Illustrated mobile dragon type catalog')
    art.text('Explore dragon forms', 24, 535, 27, INK, 'medium')
    card(art, 'wyvern', 'Wyvern', 'Two legs · Broad wings', 'Winged hunters of open skies.', 24, 552, 342, 138, mobile=True, steel=True)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Ancient, winding dragon forms.', 24, 702, 342, 138, mobile=True, steel=True)
    art.add('</g>')
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
