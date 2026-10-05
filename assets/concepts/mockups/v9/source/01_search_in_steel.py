from artwork import Canvas
from dragons import dragon
from lettering import scaled_heading
from banner_stage import steel_stage
from editorial import INK, MUTED, SILVER
from materials import PALE, RED, browse, group, header, metal, search


TYPES = [
    ('wyvern', 'Wyvern'),
    ('wyrm', 'Wyrm'),
    ('drake', 'Drake'),
]


def brand_heading(art, mobile=False):
    words = ['Dragon', 'Database'] if mobile else ['Dragon Database']
    width = 342 if mobile else 1120
    size = 60 if mobile else 110
    natural_width = max(art.text_width(word, size, 'slapper') for word in words)
    size = min(size, size * width / natural_width)
    art.add(f'<g id="{art.name}-hero-h1" class="hero-h1" role="heading" aria-level="1" aria-label="Dragon Database">')
    for index, word in enumerate(words):
        art.text(word, 195 if mobile else 720, 207 + index * 64 if mobile else 291, size, INK, 'slapper', anchor='middle')
    art.add('</g>')


def symbol_card(art, kind, title, x, y, width, height, mobile=False):
    art.begin_link(f'{kind}-type-tile', f'Browse {title} Dragons', f'/dragons?type={kind}')
    group(art, f'{kind}-type-symbol-card', f'{title} dragon type')
    metal(art, x, y, width, height, name=f'{kind}-type-steel')
    if mobile:
        dragon(art, kind, x + 27, y + 11, 91, INK, PALE)
        art.text(title, x + 151, y + 56, 31, INK, 'medium')
    else:
        dragon(art, kind, x + width / 2 - 90, y + 12, 180, INK, PALE)
        art.text(title, x + width / 2, y + height - 25, 35, INK, 'medium', anchor='middle')
    art.add('</g>')
    art.end_link()


def desktop():
    art = Canvas(
        '01-search-in-steel-desktop', 1440, 900,
        'Dragon Database — Search in Steel Refined Desktop Concept',
        'A full-bleed brushed-steel search hero with a large one-line Dragon Database H1 in DragonSlapper. The Scaling Collection is the smaller subheading, with prominent steel scales in its S and one dragon eye inside the upper circular bowl of its g; Collection remains plain. The red accent line, black Sign In, angular black flame silhouettes, and larger flying dragons continue the steel-and-black identity. Three dragon type tiles below the banner contain only names and symbols.'
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    steel_stage(art, 0, 144, 1440, 420, span=200, flame_height=100)
    group(art, 'search-in-steel-hero-content', 'Dragon Database introduction and search inside steel')
    art.line(696, 182, 744, 182, RED, 2)
    brand_heading(art)
    art.add(f'<g id="{art.name}-hero-h2" class="hero-h2" role="heading" aria-level="2" aria-label="The Scaling Collection">')
    scaled_heading(art, 'The Scaling Collection', 720, 359, 58, 960)
    art.add('</g>')
    art.text('Explore dragon forms, compare their traits, and follow the lore.', 720, 397, 24, MUTED, anchor='middle')
    search(art, 290, 425, 612, 60, submit=True)
    browse(art, 924, 425, 226, 60)
    art.add('</g>')

    group(art, 'dragon-type-symbol-catalog', 'Dragon type names and symbols')
    art.text('Explore dragon forms', 82, 625, 32, INK, 'medium')
    art.begin_link('all-dragon-forms', 'Browse all dragon forms', '/dragons')
    art.text('Browse all forms', 1358, 622, 20, INK, 'medium', anchor='end')
    art.end_link()
    for index, (kind, title) in enumerate(TYPES):
        symbol_card(art, kind, title, 82 + index * 434, 651, 408, 172)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '01-search-in-steel-mobile', 390, 844,
        'Dragon Database — Search in Steel Refined Mobile Concept',
        'A compact steel search hero with the selected header, black Sign In, and a stacked DragonSlapper Dragon Database H1. The Scaling Collection subheading has visible S scales and one eye clipped inside the upper g counter; both Collection o letters are plain. A small red line, restrained angular black flame masses, and larger original flying dragons frame the search and browse controls. Three compact tiles contain only a dragon type name and its symbol.'
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    steel_stage(art, 0, 116, 390, 385, mobile=True, span=42, flame_height=52)
    group(art, 'search-in-steel-hero-content', 'Dragon Database mobile introduction and search inside steel')
    art.line(174, 148, 216, 148, RED, 2)
    brand_heading(art, mobile=True)
    art.add(f'<g id="{art.name}-hero-h2" class="hero-h2" role="heading" aria-level="2" aria-label="The Scaling Collection">')
    scaled_heading(art, 'The Scaling Collection', 195, 319, 34, 342)
    art.add('</g>')
    art.text('Forms, traits, and lore.', 195, 348, 19, MUTED, anchor='middle')
    search(art, 24, 364, 342, 50, compact=True)
    browse(art, 54, 431, 282, 52)
    art.add('</g>')

    group(art, 'dragon-type-symbol-catalog', 'Dragon type names and symbols')
    art.text('Explore dragon forms', 24, 535, 27, INK, 'medium')
    for index, (kind, title) in enumerate(TYPES):
        symbol_card(art, kind, title, 24, 552 + index * 100, 342, 88, mobile=True)
    art.add('</g>')
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
