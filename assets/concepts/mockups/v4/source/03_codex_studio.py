from artwork import Canvas
from dragons import dragon
from editorial import (
    INK,
    EDGE,
    MUTED,
    PAPER,
    SILVER,
    heading,
)


ENTRIES = {
    'wyvern': {
        'title': 'Wyvern',
        'traits': 'Two legs · Winged',
        'action': 'Explore Wyverns',
        'body': ['A two-legged, winged form.', 'Explore its defining traits.'],
    },
    'wyrm': {
        'title': 'Wyrm',
        'traits': 'Wingless · Serpentine',
        'action': 'Explore Wyrms',
        'body': ['A long, winding dragon form.', 'Follow its shape and lore.'],
    },
    'drake': {
        'title': 'Drake',
        'traits': 'Four legs · Grounded',
        'action': 'Explore Drakes',
        'body': ['A grounded, four-legged form.', 'Compare its structure and traits.'],
    },
}


def desktop_header(art):
    art.add(f'<g id="{art.name}-navigation" aria-label="Main navigation">')
    art.logo(64, 12, 222)
    art.text('Dragons', 826, 64, 23, INK, 'medium')
    art.text('Collections', 957, 64, 23, MUTED)
    art.text('Lore', 1121, 64, 23, MUTED)
    art.text('Sign In', 1292, 64, 22, MUTED)
    art.icon('arrow', 1350, 45, 22, MUTED)
    art.line(826, 80, 891, 80, INK, 1.5)
    art.line(64, 107, 1376, 107, EDGE)
    art.add('</g>')


def desktop_entry(art, kind, x, y, width=420):
    entry = ENTRIES[kind]
    art.add(f'<g id="{art.name}-{kind}-catalog-entry" aria-label="Illustrative {entry["title"]} catalog entry">')
    art.rect(x, y, width, 252, PAPER)
    art.line(x, y, x + width, y, EDGE)
    dragon(art, kind, x + 23, y + 26, 65, MUTED, PAPER)
    art.text(entry['title'], x + 108, y + 49, 31, INK, 'medium')
    art.text(entry['traits'], x + 108, y + 77, 20, MUTED)
    art.line(x + 22, y + 99, x + width - 22, y + 99, EDGE)
    art.text(entry['body'][0], x + 22, y + 135, 23, MUTED)
    art.text(entry['body'][1], x + 22, y + 165, 23, MUTED)
    art.text(entry['action'], x + 22, y + 222, 22, INK, 'medium')
    art.icon('arrow', x + width - 47, y + 204, 22, INK)
    art.line(x, y + 252, x + width, y + 252, EDGE)
    art.add('</g>')


def mobile_entry(art, kind, x, y):
    entry = ENTRIES[kind]
    art.add(f'<g id="{art.name}-{kind}-catalog-entry" aria-label="Illustrative {entry["title"]} catalog entry">')
    art.rect(x, y, 354, 148, PAPER)
    art.line(x, y, x + 354, y, EDGE)
    dragon(art, kind, x + 18, y + 22, 52, MUTED, PAPER)
    art.text(entry['title'], x + 94, y + 38, 26, INK, 'medium')
    art.text(entry['traits'], x + 94, y + 62, 19, MUTED)
    art.text(entry['body'][0], x + 18, y + 94, 21, MUTED)
    art.text(entry['action'], x + 18, y + 126, 21, INK, 'medium')
    art.icon('arrow', x + 315, y + 109, 21, INK)
    art.line(x, y + 148, x + 354, y + 148, EDGE)
    art.add('</g>')


def desktop():
    art = Canvas(
        '03-codex-studio-desktop',
        1440,
        900,
        'Codex Studio — Dragon Database Desktop Concept',
        'A mature modern catalog composition with a restrained transparent Classic logo, slim navigation, large sentence-case sans-serif heading, a compact quiet brand panel, and three finely ruled dragon catalog entries. Pale silver and black retain the archive identity while public browsing and search take priority. Original small dragon silhouettes accompany readable traits, descriptions, and actions.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    desktop_header(art)
    art.add('<g id="03-codex-studio-desktop-hero" aria-label="Public dragon archive introduction">')
    art.text('Dragon archive', 64, 169, 23, MUTED, 'medium')
    heading(art, 'Explore the world', 64, 253, 76, 900)
    heading(art, 'of dragons.', 64, 327, 76, 900)
    art.text('Browse dragon forms, compare their traits, and follow the lore.', 64, 374, 27, MUTED)
    art.rect(64, 409, 232, 52, INK, 2)
    art.text('Browse Dragons', 85, 443, 24, PAPER, 'medium')
    art.icon('arrow', 256, 424, 23, PAPER)
    art.rect(318, 409, 626, 52, PAPER, 2, EDGE)
    art.icon('search', 338, 425, 22, MUTED)
    art.text('Search names, forms, or traits', 380, 443, 24, MUTED)
    art.add('</g>')

    art.add('<g id="03-codex-studio-desktop-brand-panel" aria-label="Dragon Database brand panel">')
    art.rect(1030, 156, 346, 312, PAPER, 2)
    art.logo(1136, 178, 134, mark=True)
    art.text('Dragon Database', 1054, 384, 27, INK, 'medium')
    art.text('An open archive of dragons.', 1054, 417, 22, MUTED)
    art.add('</g>')

    art.line(64, 507, 1376, 507, EDGE)
    art.text('Dragon forms', 64, 561, 36, INK, 'medium')
    art.text('Start with a type and explore its traits.', 366, 558, 24, MUTED)
    art.text('View all types', 1219, 558, 23, INK, 'medium')
    art.icon('arrow', 1353, 539, 23, INK)
    desktop_entry(art, 'wyvern', 64, 591)
    desktop_entry(art, 'wyrm', 510, 591)
    desktop_entry(art, 'drake', 956, 591)
    art.save()


def mobile():
    art = Canvas(
        '03-codex-studio-mobile',
        390,
        844,
        'Codex Studio — Dragon Database Mobile Concept',
        'A mature mobile dragon catalog with a moderate unchanged transparent Classic logo, simple public navigation, a clean sentence-case sans-serif introduction, readable search and Browse Dragons controls, and two finely ruled catalog entries. Quiet original Wyvern and Wyrm silhouettes accompany traits, descriptions, and actions. Account access remains secondary to public browsing.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    art.logo(18, 8, 192)
    art.icon('menu', 303, 28, 21, INK)
    art.text('Menu', 334, 47, 20, INK, 'medium')
    art.text('Dragons', 18, 115, 22, INK, 'medium')
    art.text('Collections', 134, 115, 22, MUTED)
    art.text('Lore', 307, 115, 22, MUTED)
    art.line(18, 132, 372, 132, EDGE)
    art.text('Dragon archive', 18, 170, 20, MUTED, 'medium')
    heading(art, 'Explore the world', 18, 222, 44, 354)
    heading(art, 'of dragons.', 18, 269, 44, 354)
    art.text('Explore forms, traits, and lore.', 18, 305, 23, MUTED)
    art.rect(18, 326, 354, 48, PAPER, 2, EDGE)
    art.icon('search', 33, 341, 21, MUTED)
    art.text('Search names or traits', 69, 358, 22, MUTED)
    art.rect(18, 386, 354, 48, INK, 2)
    art.text('Browse Dragons', 36, 418, 23, PAPER, 'medium')
    art.icon('arrow', 335, 400, 23, PAPER)
    art.text('Dragon forms', 18, 479, 29, INK, 'medium')
    art.text('View all', 293, 476, 21, INK, 'medium')
    art.icon('arrow', 350, 459, 20, INK)
    mobile_entry(art, 'wyvern', 18, 500)
    mobile_entry(art, 'wyrm', 18, 664)
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
