from artwork import Canvas
from banner import banner
from editorial import INK, MUTED, SILVER, heading
from lettering import scaled_heading
from materials import browse, card, group, header, search


ENTRIES = [
    ('wyvern', 'Wyvern', 'Two legs · Winged', 'A two-legged, winged form.'),
    ('wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long, winding dragon form.'),
    ('drake', 'Drake', 'Four legs · Grounded', 'A grounded, four-legged form.'),
]


def desktop(stem, label, fullbleed):
    art = Canvas(
        f'{stem}-desktop', 1440, 900,
        f'Dragon Database — Steel Masthead {label} Desktop Concept',
        f'A steel-and-black Scaling Collection hero with a {label.lower()} brushed-steel banner directly beneath the header, separated by a quiet gap. Curled black flame tongues and small flying dragon silhouettes frame the unchanged archive mark. The centered title includes scales inside the Scaling S and steel dragon eyes in both Collection o letters. Search, public browsing, a black Sign In button, and three steel-accented type cards complete the layout.'
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)
    banner(art, 0 if fullbleed else 80, 144, 1440 if fullbleed else 1280, 148)

    group(art, 'centered-masthead-hero', 'The Scaling Collection introduction')
    art.text('Dragon archive', 720, 332, 19, MUTED, anchor='middle')
    scaled_heading(art, 'The Scaling Collection', 720, 432, 100, 1160)
    art.text('Browse dragon forms, compare their traits, and follow the lore.', 720, 480, 25, MUTED, anchor='middle')
    search(art, 300, 509, 840, height=64, submit=True)
    browse(art, 607, 591, 226, height=52)
    art.add('</g>')

    group(art, 'steel-dragon-types', 'Dragon form catalog')
    heading(art, 'Dragon forms', 80, 697, 33, 700, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all types', 1211, 695, 21, INK, 'medium')
    art.icon('arrow', 1331, 677, 21, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES):
        card(art, kind, title, traits, description, 80 + index * 435, 717, width=410, height=166, steel=True)
    art.add('</g>')
    art.save()


def mobile(stem, label, fullbleed):
    art = Canvas(
        f'{stem}-mobile', 390, 844,
        f'Dragon Database — Steel Masthead {label} Mobile Concept',
        f'A compact silver-and-black mobile archive with a {label.lower()} steel banner immediately below the selected Editorial header. Curled black flames and subtle flying dragons flank the original archive mark. The Scaling Collection heading keeps its scale-decorated S and two dragon-eye o letters. Search, public browsing, black Sign In, and two steel-accented dragon type cards remain visible.'
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)
    banner(art, 0 if fullbleed else 24, 116, 390 if fullbleed else 342, 104, mobile=True)

    group(art, 'centered-masthead-hero', 'The Scaling Collection mobile introduction')
    art.text('Dragon archive', 195, 250, 17, MUTED, anchor='middle')
    scaled_heading(art, 'The Scaling', 195, 296, 50, 342)
    scaled_heading(art, 'Collection', 195, 342, 50, 342)
    art.text('Forms, traits, and lore.', 195, 375, 20, MUTED, anchor='middle')
    search(art, 24, 394, 342, height=48, compact=True)
    browse(art, 82, 456, 226, height=46)
    art.add('</g>')

    group(art, 'steel-dragon-types', 'Dragon form catalog')
    heading(art, 'Dragon forms', 24, 533, 28, 240, 'display', INK)
    art.begin_link('view-all-types', 'View All Dragon Types', '/dragons')
    art.text('View all', 287, 531, 20, INK, 'medium')
    art.icon('arrow', 345, 514, 20, INK)
    art.end_link()
    for index, (kind, title, traits, description) in enumerate(ENTRIES[:2]):
        card(art, kind, title, traits, description, 24, 550 + index * 152, width=342, height=138, mobile=True, steel=True)
    art.add('</g>')
    art.save()


def render(stem, label, fullbleed=False):
    desktop(stem, label, fullbleed)
    mobile(stem, label, fullbleed)
