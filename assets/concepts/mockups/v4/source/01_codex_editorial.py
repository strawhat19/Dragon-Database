from artwork import Canvas
from editorial import EDGE, INK, MUTED, PAPER, SILVER, STEEL, archive_card, heading, mobile_card


def desktop():
    art = Canvas(
        '01-codex-editorial-desktop', 1440, 900,
        'Dragon Database — Codex Editorial desktop hero',
        'A restrained Silver Codex refinement with a matte silver surface, modest unchanged Classic underline logo, clean humanist sans typography, a quiet brand panel, and text-led dragon type cards.'
    )
    art.rect(0, 0, 1440, 900, SILVER)
    art.logo(80, 13, 224)
    art.add(f'<g id="{art.name}-header-navigation" aria-label="Primary navigation">')
    for label, x in [('Dragons', 836), ('Collections', 949), ('Lore', 1100)]:
        art.text(label, x, 64, 20, INK if label == 'Dragons' else MUTED, 'medium')
    art.rect(1232, 36, 128, 45, 'none', 2, EDGE)
    art.text('Sign In', 1253, 65, 20, INK, 'medium')
    art.icon('arrow', 1324, 48, 20, INK)
    art.add('</g>')
    art.line(80, 116, 1360, 116, EDGE)

    art.text('Explore the archive', 88, 210, 19, MUTED, 'medium')
    heading(art, 'An archive of', 85, 311, 84, 698)
    heading(art, 'dragon lore.', 85, 401, 84, 698)
    art.text('Explore dragon forms, their origins, and the', 88, 462, 25, MUTED)
    art.text('stories that connect them.', 88, 496, 25, MUTED)
    art.rect(88, 538, 224, 55, INK, 2)
    art.text('Browse Dragons', 111, 573, 22, PAPER, 'medium')
    art.icon('arrow', 268, 555, 22, PAPER)
    art.text('Browse Collections', 348, 573, 21, INK, 'medium')
    art.icon('arrow', 535, 555, 21, INK)

    art.add(f'<g id="{art.name}-brand-panel" aria-label="Dragon Database brand panel">')
    art.rect(934, 203, 386, 374, PAPER, 2, EDGE)
    art.logo(1005, 225, 244, mark=True)
    art.line(958, 505, 1296, 505, EDGE)
    art.text('Dragon Database', 958, 540, 21, INK, 'medium')
    art.text('Forms. Origins. Stories.', 958, 564, 18, MUTED)
    art.add('</g>')

    art.line(88, 630, 1352, 630, EDGE)
    art.text('Explore by form', 88, 671, 31, INK, 'medium')
    art.text('View all types', 1194, 668, 20, MUTED)
    art.icon('arrow', 1328, 650, 22, INK)
    cards = [
        ('wyvern', 'Wyvern', 'Winged · Two legs', 'A winged dragon form.'),
        ('wyrm', 'Wyrm', 'Serpentine · Wingless', 'An elongated, serpentine form.'),
        ('drake', 'Drake', 'Grounded · Four legs', 'A grounded dragon form.'),
    ]
    for index, (kind, title, traits, description) in enumerate(cards):
        archive_card(art, kind, title, traits, description, 88 + index * 428, 692, 408, 176)
    art.save()


def mobile():
    art = Canvas(
        '01-codex-editorial-mobile', 390, 844,
        'Dragon Database — Codex Editorial mobile hero',
        'A restrained mobile silver hero with a modest Classic underline logo, clean sentence-case typography, clear browse actions, and two understated text-led dragon type cards.'
    )
    art.rect(0, 0, 390, 844, SILVER)
    art.logo(20, 12, 194)
    art.icon('menu', 340, 38, 23, INK)
    art.line(24, 100, 366, 100, EDGE)
    art.text('Explore the archive', 24, 151, 18, MUTED, 'medium')
    heading(art, 'An archive of', 23, 224, 53, 342)
    heading(art, 'dragon lore.', 23, 280, 53, 342)
    art.text('Explore dragon forms, their origins,', 24, 328, 21, MUTED)
    art.text('and the stories that connect them.', 24, 357, 21, MUTED)
    art.rect(24, 389, 342, 52, INK, 2)
    art.text('Browse Dragons', 45, 423, 22, PAPER, 'medium')
    art.icon('arrow', 325, 405, 22, PAPER)
    art.text('Browse Collections', 195, 480, 20, INK, 'medium', anchor='middle')
    art.line(24, 511, 366, 511, EDGE)
    art.text('Dragon types', 24, 545, 28, INK, 'medium')
    mobile_card(art, 'wyvern', 'Wyvern', 'Winged · Two legs', 'A winged dragon form.', 24, 562, height=126)
    mobile_card(art, 'wyrm', 'Wyrm', 'Serpentine · Wingless', 'An elongated dragon form.', 24, 704, height=126)
    art.save()


desktop()
mobile()
