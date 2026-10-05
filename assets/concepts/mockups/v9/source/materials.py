from dragons import dragon
from editorial import EDGE, INK, MUTED, PAPER, SILVER, heading


RED = '#8D3038'
DARK = '#17191D'
STEEL = '#BEC6D0'
PALE = '#D8DDE4'


def group(art, name, label):
    art.add(f'<g id="{art.name}-{name}" class="{name}" aria-label="{label}">')


def metal(art, x, y, width, height, name='steel-panel', dark=False):
    gradient = f'{art.name}-{name}-gradient'
    stops = (
        [(0, '#252930'), (0.34, '#454B55'), (0.48, '#666E7A'), (0.59, '#3A4049'), (1, '#24282F')]
        if dark else
        [(0, '#AAB3BF'), (0.28, '#E1E5EA'), (0.46, '#F3F4F6'), (0.64, '#BAC3CE'), (1, '#D6DCE4')]
    )
    art.defs[gradient] = f'<linearGradient id="{gradient}" x1="0" y1="0" x2="1" y2="0.6">' + ''.join(f'<stop offset="{offset}" stop-color="{color}"/>' for offset, color in stops) + '</linearGradient>'
    group(art, name, 'Brushed steel surface')
    art.rect(x, y, width, height, f'url(#{gradient})', 2, '#424852' if dark else '#A2ADB9')
    for index in range(int(height / 5)):
        inset = 9 + (index * 17 % 41)
        art.line(x + inset, y + 3 + index * 5, x + width - inset, y + 3 + index * 5, '#D3D8DF' if dark else '#67717D', 0.45, 0.12 if dark else 0.1)
    art.line(x + 1, y + 1, x + width - 1, y + 1, '#F4F6F8', 1, 0.4 if dark else 0.7)
    art.add('</g>')


def flames(art, x, y, width, height, fill=INK, opacity=1, name='black-flame-silhouette'):
    art.add(f'<g id="{art.name}-{name}" class="black-flame-silhouette" aria-hidden="true" transform="translate({x} {y}) scale({width / 300} {height / 160})" opacity="{opacity}">')
    art.path('M0 160C9 139 20 117 14 88C35 101 37 117 42 135C56 107 29 75 51 30C43 68 70 75 77 100C89 124 80 136 93 142C104 110 126 98 112 54C147 75 139 126 157 140C175 108 158 74 184 16C180 67 213 87 211 120C214 133 217 140 226 144C240 120 228 92 247 62C245 91 265 109 273 126C280 138 290 146 300 152L300 160Z', fill)
    art.add('</g>')


def header(art, mobile=False):
    group(art, 'sticky-header', 'Primary navigation')
    art.begin_link('header-home', 'Dragon Database Home', '/')
    art.logo(20 if mobile else 80, 12 if mobile else 13, 194 if mobile else 224)
    art.end_link()
    if mobile:
        x, y, width, height = 240, 30, 74, 36
    else:
        for label, x, route in [('Dragons', 836, '/dragons'), ('Collections', 949, '/collections'), ('Lore', 1100, '/lore')]:
            active = label == 'Dragons'
            art.begin_link(f'header-{label.lower()}', label, route)
            art.text(label, x, 64, 20, INK if active else MUTED, 'medium')
            art.line(x, 80, x + art.text_width(label, 20, 'medium'), 80, RED if active else EDGE, 1.5 if active else 1)
            art.end_link()
        x, y, width, height = 1232, 36, 128, 45
    art.begin_link('header-sign-in', 'Sign In', '/sign-in')
    art.rect(x, y, width, height, INK, 2)
    if mobile:
        art.text('Sign In', x + width / 2, y + 24, 18, PAPER, 'medium', anchor='middle')
    else:
        art.text('Sign In', x + 21, y + 29, 20, PAPER, 'medium')
        art.icon('arrow', x + width - 36, y + 12, 20, PAPER)
    art.end_link()
    if mobile:
        art.add(f'<g id="{art.name}-header-menu" role="img" aria-label="Open menu"><title>Open menu</title>')
        art.icon('menu', 340, 38, 23, INK)
        art.add('</g>')
    art.line(24 if mobile else 80, 100 if mobile else 116, 366 if mobile else 1360, 100 if mobile else 116, EDGE)
    art.add('</g>')


def search(art, x, y, width, height=54, compact=False, submit=False):
    group(art, 'hero-search-field', 'Search the dragon archive')
    art.rect(x, y, width, height, PAPER, 2, EDGE)
    art.icon('search', x + 16, y + (height - 22) / 2, 22, MUTED)
    art.text('Search names or traits' if compact else 'Search names, forms, or traits', x + 52, y + height / 2 + 7, 21 if compact else 24, MUTED)
    if submit:
        art.rect(x + width - 116, y + 5, 111, height - 10, INK, 2)
        art.text('Search', x + width - 97, y + height / 2 + 7, 21, PAPER, 'medium')
        art.icon('arrow', x + width - 32, y + (height - 20) / 2, 20, PAPER)
    art.add('</g>')


def browse(art, x, y, width=226, height=52, inverse=False):
    art.begin_link('browse-dragons', 'Browse Dragons', '/dragons')
    art.rect(x, y, width, height, PAPER if inverse else INK, 2)
    art.text('Browse Dragons', x + 21, y + height / 2 + 7, 23, INK if inverse else PAPER, 'medium')
    art.icon('arrow', x + width - 40, y + (height - 23) / 2, 23, INK if inverse else PAPER)
    art.end_link()


def card(art, kind, title, traits, description, x, y, width=408, height=166, mobile=False, steel=False):
    group(art, f'{kind}-type-card', f'{title} dragon type')
    art.rect(x, y, width, height, PAPER, 2, EDGE)
    if steel:
        metal(art, x, y, width, 75, name=f'{kind}-card-steel')
    art.line(x + 20, y + 1, x + 56, y + 1, RED, 2)
    icon_size = 48 if mobile else 58
    title_x = x + 90 if mobile else x + 100
    dragon(art, kind, x + 20, y + 21, icon_size, MUTED, PAPER)
    art.text(title, title_x, y + 41, 25 if mobile else 28, INK, 'medium')
    art.text(traits, title_x, y + 65, 17 if mobile else 18, MUTED)
    art.text(description, x + 20, y + 99, 19 if mobile else 21, MUTED)
    art.begin_link(f'{kind}-explore', f'Explore {title} Type', f'/dragons?type={kind}')
    art.text('Explore type', x + 20, y + height - 18, 18, INK, 'medium')
    art.icon('arrow', x + width - 41, y + height - 34, 20, INK)
    art.end_link()
    art.add('</g>')
