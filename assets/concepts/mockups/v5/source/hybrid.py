from dragons import dragon
from editorial import EDGE, INK, MUTED, PAPER, SILVER, heading


FOLIO = '#E0E5EB'
ENTRIES = [
    ('wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.'),
    ('wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.'),
    ('drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.'),
]


def group(art, name, label):
    art.add(f'<g id="{art.name}-{name}" class="{name}" aria-label="{label}">')


def sign_in(art, x, y, width=128, height=45, mobile=False):
    art.begin_link('header-sign-in', 'Sign In', '/sign-in')
    art.rect(x, y, width, height, INK, 2)
    if mobile:
        art.text('Sign In', x + width / 2, y + 24, 18, PAPER, 'medium', anchor='middle')
    else:
        art.text('Sign In', x + 21, y + 29, 20, PAPER, 'medium')
        art.icon('arrow', x + width - 36, y + 12, 20, PAPER)
    art.end_link()


def desktop_header(art):
    group(art, 'sticky-header', 'Primary header')
    art.begin_link('header-home', 'Dragon Database Home', '/')
    art.logo(80, 13, 224)
    art.end_link()
    for label, x, route in [
        ('Dragons', 836, '/dragons'),
        ('Collections', 949, '/collections'),
        ('Lore', 1100, '/lore'),
    ]:
        active = label == 'Dragons'
        art.begin_link(f'header-{label.lower()}', label, route)
        art.text(label, x, 64, 20, INK if active else MUTED, 'medium')
        width = art.text_width(label, 20, 'medium')
        art.line(x, 80, x + width, 80, INK if active else EDGE, 1.5 if active else 1)
        art.end_link()
    sign_in(art, 1232, 36)
    art.line(80, 116, 1360, 116, EDGE)
    art.add('</g>')


def mobile_header(art):
    group(art, 'sticky-header', 'Primary mobile header')
    art.begin_link('header-home', 'Dragon Database Home', '/')
    art.logo(20, 12, 194)
    art.end_link()
    sign_in(art, 240, 30, 74, 36, mobile=True)
    art.add(f'<g id="{art.name}-header-menu" role="img" aria-label="Open menu"><title>Open menu</title>')
    art.icon('menu', 340, 38, 23, INK)
    art.add('</g>')
    art.line(24, 100, 366, 100, EDGE)
    art.add('</g>')


def folio_badge(art):
    group(art, 'folio-emblem-panel', 'Dragon Database archive emblem')
    art.rect(910, 168, 428, 442, FOLIO)
    art.text('Dragon Database', 938, 207, 18, MUTED, 'medium')
    art.line(938, 224, 1310, 224, EDGE)
    art.logo(1000, 253, 247, mark=True)
    art.line(938, 526, 1310, 526, EDGE)
    heading(art, 'The archive emblem', 1124, 563, 28, 370, 'editorial', INK, anchor='middle')
    art.text('Forms, origins, and traditions.', 1124, 590, 17, MUTED, anchor='middle')
    art.add('</g>')


def search(art, x, y, width, mobile=False):
    group(art, 'hero-search-field', 'Search the dragon archive')
    height = 48 if mobile else 52
    size = 21 if mobile else 24
    art.rect(x, y, width, height, PAPER, 2, EDGE)
    art.icon('search', x + 16, y + 14, 22, MUTED)
    art.text('Search names or traits' if mobile else 'Search names, forms, or traits', x + 52, y + 33, size, MUTED)
    art.add('</g>')


def browse(art, x, y, width=226, mobile=False):
    height = 48 if mobile else 52
    art.begin_link('hero-browse-dragons', 'Browse Dragons', '/dragons')
    art.rect(x, y, width, height, INK, 2)
    art.text('Browse Dragons', x + 21, y + 33, 23 if mobile else 24, PAPER, 'medium')
    art.icon('arrow', x + width - 40, y + 14, 23, PAPER)
    art.end_link()


def desktop_entries(art):
    group(art, 'dragon-form-catalog', 'Dragon form catalog')
    art.line(80, 639, 1360, 639, EDGE)
    art.text('Dragon forms', 82, 687, 34, INK, 'medium')
    art.text('Start with a type and explore its traits.', 368, 684, 22, MUTED)
    art.begin_link('view-all-types', 'View all dragon types', '/dragons')
    art.text('View all types', 1211, 684, 21, INK, 'medium')
    art.icon('arrow', 1331, 667, 21, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES):
        x = 82 + index * 432
        y = 713
        width = 412
        group(art, f'{kind}-catalog-entry', f'{title} dragon form')
        art.rect(x, y, width, 168, PAPER)
        art.line(x, y, x + width, y, EDGE)
        dragon(art, kind, x + 22, y + 22, 58, MUTED, PAPER)
        art.text(title, x + 98, y + 42, 29, INK, 'medium')
        art.text(traits, x + 98, y + 67, 19, MUTED)
        art.text(description, x + 22, y + 103, 21, MUTED)
        art.begin_link(f'{kind}-explore', f'Explore {title} Type', f'/dragons?type={kind}')
        art.text('Explore type', x + 22, y + 145, 20, INK, 'medium')
        art.icon('arrow', x + width - 44, y + 128, 21, INK)
        art.end_link()
        art.line(x, y + 168, x + width, y + 168, EDGE)
        art.add('</g>')
    art.add('</g>')


def mobile_entries(art):
    group(art, 'dragon-form-catalog', 'Dragon form catalog')
    art.text('Dragon forms', 24, 467, 29, INK, 'medium')
    art.begin_link('view-all-types', 'View all dragon types', '/dragons')
    art.text('View all', 288, 464, 20, INK, 'medium')
    art.icon('arrow', 345, 448, 20, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES[:2]):
        x = 24
        y = 489 + index * 160
        width = 342
        group(art, f'{kind}-catalog-entry', f'{title} dragon form')
        art.rect(x, y, width, 142, PAPER)
        art.line(x, y, x + width, y, EDGE)
        dragon(art, kind, x + 18, y + 21, 52, MUTED, PAPER)
        art.text(title, x + 94, y + 39, 26, INK, 'medium')
        art.text(traits, x + 94, y + 63, 18, MUTED)
        art.text(description, x + 18, y + 94, 20, MUTED)
        art.begin_link(f'{kind}-explore', f'Explore {title} Type', f'/dragons?type={kind}')
        art.text('Explore type', x + 18, y + 124, 20, INK, 'medium')
        art.icon('arrow', x + width - 39, y + 108, 20, INK)
        art.end_link()
        art.line(x, y + 142, x + width, y + 142, EDGE)
        art.add('</g>')
    art.add('</g>')
