from artwork import Canvas
from editorial import INK, MUTED, SILVER, heading
from hybrid import (
    group,
    browse,
    search,
    folio_badge,
    mobile_header,
    mobile_entries,
    desktop_header,
    desktop_entries,
)


def desktop():
    art = Canvas(
        '02-scaling-collection-desktop',
        1440,
        900,
        'Dragon Database — The Scaling Collection Desktop Concept',
        'A professional matte-silver dragon archive concept with the unchanged Swordslapper Classic logo, a restrained editorial header, underlined desktop navigation, a black Sign In button, and a clean Alegreya Sans heading reading The Scaling Collection. A public Browse Dragons action and search field accompany the established Folio emblem panel and three quiet dragon type entries.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    desktop_header(art)
    group(art, 'scaling-collection-hero-copy', 'The Scaling Collection archive introduction')
    art.text('Dragon archive', 82, 199, 20, MUTED)
    heading(art, 'The Scaling', 82, 294, 88, 780, 'display', INK)
    heading(art, 'Collection', 82, 389, 88, 780, 'display', INK)
    art.text('Browse dragon forms, compare their traits,', 82, 443, 25, MUTED)
    art.text('and follow the lore.', 82, 477, 25, MUTED)
    browse(art, 82, 519)
    search(art, 330, 519, 532)
    art.add('</g>')
    folio_badge(art)
    desktop_entries(art)
    art.save()


def mobile():
    art = Canvas(
        '02-scaling-collection-mobile',
        390,
        844,
        'Dragon Database — The Scaling Collection Mobile Concept',
        'A restrained matte-silver mobile dragon archive with the unchanged Swordslapper Classic header logo, a black Sign In button, and a clean Alegreya Sans heading reading The Scaling Collection. A readable search field and full-width public Browse Dragons action lead into two quiet dragon type entries within the mobile frame.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    mobile_header(art)
    group(art, 'scaling-collection-hero-copy', 'The Scaling Collection mobile archive introduction')
    art.text('Dragon archive', 24, 143, 18, MUTED)
    heading(art, 'The Scaling', 23, 201, 54, 342, 'display', INK)
    heading(art, 'Collection', 23, 254, 54, 342, 'display', INK)
    art.text('Explore forms, traits, and lore.', 24, 289, 21, MUTED)
    search(art, 24, 310, 342, mobile=True)
    browse(art, 24, 370, 342, mobile=True)
    art.add('</g>')
    mobile_entries(art)
    art.save()


desktop()
mobile()
