from artwork import Canvas


INK = '#101115'
PALE = '#E4E7EB'
EDGE = '#B7BEC8'
PAPER = '#F5F6F8'
STEEL = '#C5CBD3'
MUTED = '#5B626C'
CHROME = '#191B20'
IMAGE = '#D2D7DF'


def heading(art, value, x, y, size=90, width=660, fill=INK, anchor='start'):
    size = min(size, size * width / art.text_width(value, size, 'display'))
    art.text(value, x, y, size, fill, 'display', anchor=anchor)


def dragon(art, kind, x, y, width, fill=INK, facet=STEEL):
    art.add(f'<g transform="translate({x} {y}) scale({width / 180})" aria-label="Original {kind} dragon silhouette">')
    if kind == 'wyvern':
        art.path('M113 62 L94 13 L90 38 L24 19 L42 46 L19 61 L51 59 L44 82 L85 69 L107 80 Z', fill)
        art.path('M109 62 C84 77 61 86 44 68 C31 56 29 48 22 51 C16 68 33 91 62 93 C84 95 104 87 120 72 L130 69 L132 79 L146 82 L151 72 L141 63 L151 59 L163 61 L173 53 L160 41 L151 39 L149 20 L139 33 L130 26 L130 46 Z', fill)
        art.path('M40 31 L87 49 L97 66 L71 56 Z', facet)
        art.path('M141 46 L157 49 L146 52 Z', facet)
    elif kind == 'wyrm':
        art.path('M145 39 C120 20 81 24 63 47 C45 71 26 77 18 61 C7 42 33 25 46 34 C59 43 54 66 71 75 C96 88 126 71 115 51 C103 29 87 56 98 64', stroke=fill, sw=13)
        art.path('M132 40 L143 25 L136 13 L153 24 L155 16 L164 33 L178 37 L170 46 L158 46 L154 57 L143 54 Z', fill)
        art.path('M151 35 L166 39 L154 42 Z', facet)
    else:
        art.path('M74 65 L87 71 L82 83 L68 84 L70 72 Z M110 63 L128 66 L139 80 L130 86 L118 73 Z', fill)
        art.path('M124 57 C101 48 81 54 59 58 C35 63 24 50 12 49 C17 72 41 79 63 75 L70 87 L87 87 L83 72 L105 73 L113 88 L130 85 L125 70 L142 67 L151 74 L163 72 L156 61 L165 55 L177 57 L179 48 L166 39 L162 21 L153 34 L144 25 L144 47 Z', fill)
        art.path('M63 56 L75 43 L85 52 L96 38 L106 50 L117 41 L124 54 Z', fill)
        art.path('M155 44 L170 48 L158 51 Z', facet)
    art.add('</g>')


def compact_card(art, kind, title, traits, description, x, y, width, height=202, dark=False):
    surface = CHROME if dark else PAPER
    text_color = PALE if dark else INK
    secondary = STEEL if dark else MUTED
    art.add(f'<g id="{art.name}-{kind}-type-card" aria-label="{title} dragon type card">')
    art.rect(x, y, width, height, surface, 4, '#3B404A' if dark else EDGE)
    heading(art, title, x + 22, y + 43, 38, width * .5, text_color)
    art.text(traits, x + 22, y + 72, 16, secondary, 'medium')
    dragon(art, kind, x + width - 149, y + 12, 133, text_color, surface)
    art.line(x + 22, y + 95, x + width - 22, y + 95, '#3B404A' if dark else EDGE)
    for index, line in enumerate(description):
        art.text(line, x + 22, y + 124 + index * 24, 20, secondary)
    art.text(f'Explore {title}s', x + 22, y + height - 22, 18, text_color, 'bold')
    art.icon('arrow', x + width - 45, y + height - 39, 22, text_color)
    art.add('</g>')


def mobile_card(art, kind, title, traits, description, x, y, width=342, height=150):
    art.add(f'<g id="{art.name}-{kind}-type-card" aria-label="{title} dragon type card">')
    art.rect(x, y, width, height, PAPER, 4, EDGE)
    art.rect(x + 10, y + 10, 99, height - 20, IMAGE, 2)
    dragon(art, kind, x + 9, y + 37, 103)
    heading(art, title, x + 126, y + 34, 33, width - 145)
    art.text(traits, x + 126, y + 58, 17, MUTED, 'medium')
    art.text(description, x + 126, y + 88, 18, MUTED)
    art.text(f'Explore {title}s', x + 126, y + height - 20, 18, INK, 'bold')
    art.icon('arrow', x + width - 34, y + height - 36, 20, INK)
    art.add('</g>')
