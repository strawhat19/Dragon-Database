from artwork import Canvas
from editorial import MUTED, SILVER, heading
from hybrid import (
    group,
    browse,
    search,
    folio_badge,
    mobile_header,
    desktop_header,
    mobile_entries,
    desktop_entries,
)


def desktop():
    art = Canvas(
        '01-explore-dragons-desktop',
        1440,
        900,
        'Explore Dragons — Dragon Database Desktop Concept',
        'A static public archive concept combining a restrained Editorial header, underlined desktop navigation, Studio browsing and search controls, and the unchanged Folio emblem panel. Large clean Alegreya Sans Medium lettering reads Explore Dragons. Three quiet catalog entries show original dragon silhouettes, traits, descriptions, and Explore actions. The selected Classic logo foreground and sword underline remain unchanged.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    desktop_header(art)
    group(art, 'archive-hero', 'Explore Dragons introduction')
    art.text('Dragon archive', 82, 199, 23, MUTED, 'medium')
    heading(art, 'Explore', 82, 294, 88, 780)
    heading(art, 'Dragons', 82, 389, 88, 780)
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
        '01-explore-dragons-mobile',
        390,
        844,
        'Explore Dragons — Dragon Database Mobile Concept',
        'A static mobile public archive concept with the unchanged selected Classic logo, restrained Editorial header, black secondary Sign In control, and large clean Alegreya Sans Medium Explore Dragons heading. Studio search and browse controls lead into two readable catalog entries with original dragon silhouettes, traits, descriptions, and actions.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    mobile_header(art)
    group(art, 'archive-hero', 'Explore Dragons introduction')
    art.text('Dragon archive', 24, 143, 18, MUTED, 'medium')
    heading(art, 'Explore', 23, 201, 54, 342)
    heading(art, 'Dragons', 23, 254, 54, 342)
    art.text('Explore forms, traits, and lore.', 24, 289, 21, MUTED)
    search(art, 24, 310, 342, mobile=True)
    browse(art, 24, 370, 342, mobile=True)
    art.add('</g>')
    mobile_entries(art)
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
