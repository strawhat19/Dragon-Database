from artwork import Canvas
from editorial import EDGE, INK, MUTED, PAPER, SILVER, heading
from materials import (
    RED,
    PALE,
    card,
    group,
    metal,
    browse,
    flames,
    header,
    search,
)


def desktop_art(art):
    group(art, 'offset-foundry-slab', 'Brushed steel dragon artwork with black flames')
    art.rect(964, 202, 374, 403, PALE, 2)
    metal(art, 943, 177, 380, 410, name='hero-brushed-steel')
    flames(art, 943, 458, 380, 129, name='slab-black-flames')
    art.logo(1001, 217, 266, mark=True)
    art.line(943, 177, 943, 226, RED, 3)
    art.text('Dragon Database', 968, 569, 23, PAPER, 'medium')
    art.add('</g>')


def mobile_art(art):
    group(art, 'compact-foundry-slab', 'Compact brushed steel dragon artwork with black flames')
    metal(art, 24, 422, 342, 65, name='mobile-brushed-steel')
    flames(art, 286, 428, 80, 59, name='mobile-black-flames')
    art.logo(30, 424, 60, mark=True)
    art.line(24, 422, 24, 441, RED, 2)
    art.text('The dragon archive', 108, 449, 20, INK, 'medium')
    art.text('Forms, traits, and lore', 108, 474, 18, MUTED)
    art.add('</g>')


def desktop():
    art = Canvas(
        '01-crimson-foundry-desktop',
        1440,
        900,
        'Crimson Foundry — Dragon Database Desktop Concept',
        'An elegant asymmetric public dragon archive with a generous silver hero, large clean The Scaling Collection heading, prominent search, and an offset brushed-steel art slab. The unchanged selected dragon mark sits above a black flame silhouette; restrained oxblood details accent the active navigation and catalog cards. Three quiet dragon type entries remain visible in the desktop viewport.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    group(art, 'scaling-collection-hero', 'The Scaling Collection public archive introduction')
    art.text('Dragon archive', 82, 194, 23, MUTED, 'medium')
    heading(art, 'The Scaling', 82, 285, 88, 774)
    heading(art, 'Collection', 82, 379, 88, 774)
    art.text('Explore dragon forms, compare their traits,', 82, 432, 26, MUTED)
    art.text('and follow the lore.', 82, 467, 26, MUTED)
    search(art, 82, 492, 738, height=62, submit=True)
    browse(art, 82, 573, width=238, height=50)
    art.text('Public browsing. Save collections with an account.', 348, 605, 21, MUTED)
    art.add('</g>')
    desktop_art(art)
    group(art, 'dragon-form-catalog', 'Dragon form catalog')
    art.line(80, 649, 1360, 649, EDGE)
    art.text('Dragon forms', 82, 692, 34, INK, 'medium')
    art.text('Start with a form.', 335, 689, 23, MUTED)
    art.begin_link('view-all-types', 'View all dragon types', '/dragons')
    art.text('View all types', 1211, 689, 21, INK, 'medium')
    art.icon('arrow', 1331, 672, 21, INK)
    art.end_link()
    card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.', 82, 716, width=412, height=165)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.', 514, 716, width=412, height=165)
    card(art, 'drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.', 946, 716, width=412, height=165)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '01-crimson-foundry-mobile',
        390,
        844,
        'Crimson Foundry — Dragon Database Mobile Concept',
        'A mature mobile public archive with the unchanged selected Classic logo, black secondary Sign In control, clean The Scaling Collection heading, prominent search and browse controls, and a compact brushed-steel artwork strip with the unchanged dragon mark and black flames. Restrained oxblood details accompany two readable dragon type cards within the viewport.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    group(art, 'scaling-collection-hero', 'The Scaling Collection public archive introduction')
    art.text('Dragon archive', 24, 143, 18, MUTED, 'medium')
    heading(art, 'The Scaling', 24, 202, 51, 342)
    heading(art, 'Collection', 24, 255, 51, 342)
    art.text('Explore forms, traits, and lore.', 24, 286, 21, MUTED)
    search(art, 24, 308, 342, height=48, compact=True)
    browse(art, 24, 368, width=342, height=48)
    art.add('</g>')
    mobile_art(art)
    group(art, 'dragon-form-catalog', 'Dragon form catalog')
    art.text('Dragon forms', 24, 523, 29, INK, 'medium')
    art.begin_link('view-all-types', 'View all dragon types', '/dragons')
    art.text('View all', 288, 520, 20, INK, 'medium')
    art.icon('arrow', 345, 504, 20, INK)
    art.end_link()
    card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.', 24, 543, width=342, height=140, mobile=True)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.', 24, 699, width=342, height=140, mobile=True)
    art.add('</g>')
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
