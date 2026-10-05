from dragons import dragon


INK = '#101115'
MUTED = '#626B77'
EDGE = '#C7CDD5'
PAPER = '#F4F5F7'
SILVER = '#E8EBEF'
STEEL = '#C5CBD3'


def heading(art, value, x, y, size=78, width=670, family='display', fill=INK, anchor='start'):
    size = min(size, size * width / art.text_width(value, size, family))
    art.text(value, x, y, size, fill, family, anchor=anchor)


def archive_card(art, kind, title, traits, description, x, y, width=408, height=174):
    art.add(f'<g id="{art.name}-{kind}-archive-card" aria-label="{title} dragon type card">')
    art.rect(x, y, width, height, PAPER, 2, EDGE)
    dragon(art, kind, x + 24, y + 23, 65, MUTED, PAPER)
    art.text(title, x + 108, y + 48, 27, INK, 'medium')
    art.text(traits, x + 108, y + 73, 18, MUTED)
    art.text(description, x + 24, y + 111, 21, MUTED)
    art.text('Explore type', x + 24, y + height - 21, 18, INK, 'medium')
    art.icon('arrow', x + width - 47, y + height - 40, 20, INK)
    art.add('</g>')


def mobile_card(art, kind, title, traits, description, x, y, width=342, height=138):
    art.add(f'<g id="{art.name}-{kind}-archive-card" aria-label="{title} dragon type card">')
    art.rect(x, y, width, height, PAPER, 2, EDGE)
    dragon(art, kind, x + 19, y + 22, 52, MUTED, PAPER)
    art.text(title, x + 86, y + 41, 25, INK, 'medium')
    art.text(traits, x + 86, y + 65, 17, MUTED)
    art.text(description, x + 20, y + 93, 19, MUTED)
    art.text('Explore type', x + 20, y + height - 17, 17, INK, 'medium')
    art.icon('arrow', x + width - 40, y + height - 34, 18, INK)
    art.add('</g>')
