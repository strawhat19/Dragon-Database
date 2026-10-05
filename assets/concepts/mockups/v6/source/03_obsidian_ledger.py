from artwork import Canvas
from editorial import INK, PAPER, SILVER, heading
from materials import DARK, PALE, RED, browse, card, flames, group, header, metal, search


def desktop():
    art = Canvas(
        '03-obsidian-ledger-desktop',
        1440,
        900,
        'Dragon Database — Obsidian Ledger Desktop Concept',
        'A silver editorial header with the unchanged Swordslapper Classic logo and black Sign In button sits above a charcoal search-led hero. Clean pale Alegreya Sans lettering introduces The Scaling Collection. A tall brushed-steel insert carries the unchanged original DB dragon mark above black flame silhouettes. A quiet silver section holds three fully visible illustrated dragon type cards, with small oxblood rules as the only color accent.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    header(art)

    group(art, 'obsidian-ledger-hero', 'The Scaling Collection introduction and search')
    art.rect(0, 117, 1440, 523, DARK)
    art.line(82, 164, 122, 164, RED, 2)
    art.text('Dragon archive', 82, 195, 20, PALE)
    heading(art, 'The Scaling', 80, 282, 86, 778, fill=PAPER)
    heading(art, 'Collection', 80, 373, 86, 778, fill=PAPER)
    art.text('Discover dragon forms, compare their traits,', 82, 418, 25, PALE)
    art.text('and trace the lore that connects them.', 82, 450, 25, PALE)
    search(art, 82, 478, 754, 56, submit=True)
    browse(art, 82, 558, 226, 52, inverse=True)
    art.add('</g>')

    group(art, 'brushed-steel-archive-insert', 'Original DB dragon mark and black flames on brushed steel')
    metal(art, 984, 168, 350, 392, name='ledger-brushed-steel')
    art.logo(1007, 188, 304, mark=True)
    flames(art, 985, 480, 348, 80, name='ledger-black-flames')
    art.line(984, 586, 1017, 586, RED, 2)
    art.text('Forms, traits, and lore.', 1032, 592, 20, PALE)
    art.add('</g>')

    group(art, 'dragon-forms-section', 'Explore three illustrated dragon forms')
    art.text('Explore dragon forms', 82, 687, 32, INK, 'medium')
    art.begin_link('all-dragon-forms', 'Browse all dragon forms', '/dragons')
    art.text('Browse all forms', 1358, 684, 20, INK, 'medium', anchor='end')
    art.end_link()
    card(art, 'wyvern', 'Wyvern', 'Two legs · Broad wings', 'Winged hunters of open skies.', 82, 713, 408, 154)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Ancient forms with winding bodies.', 516, 713, 408, 154)
    card(art, 'drake', 'Drake', 'Four legs · Wingless', 'Grounded dragons built for strength.', 950, 713, 408, 154)
    art.add('</g>')
    art.save()


def mobile():
    art = Canvas(
        '03-obsidian-ledger-mobile',
        390,
        844,
        'Dragon Database — Obsidian Ledger Mobile Concept',
        'A silver editorial mobile header preserves the unchanged Swordslapper Classic logo and black Sign In button. A compact charcoal hero has a pale clean Alegreya Sans heading, a practical search field and a full-width Browse Dragons action. A horizontal brushed-steel insert makes the original black DB dragon mark and black flames visible. Two readable illustrated type cards fit entirely within the silver area below.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    header(art, mobile=True)

    group(art, 'obsidian-ledger-hero', 'The Scaling Collection mobile introduction and search')
    art.rect(0, 101, 390, 393, DARK)
    art.line(24, 117, 48, 117, RED, 2)
    art.text('Dragon archive', 60, 123, 17, PALE)
    heading(art, 'The Scaling', 23, 176, 49, 342, fill=PAPER)
    heading(art, 'Collection', 23, 222, 49, 342, fill=PAPER)
    art.text('Find dragons by form, trait, and lore.', 24, 251, 20, PALE)
    search(art, 24, 369, 342, 48, compact=True)
    browse(art, 24, 429, 342, 46, inverse=True)
    art.add('</g>')

    group(art, 'brushed-steel-archive-insert', 'Original DB dragon mark and black flames on a compact steel rail')
    metal(art, 24, 266, 342, 88, name='ledger-brushed-steel')
    art.logo(28, 267, 84, mark=True)
    art.text('An archive of dragons', 135, 291, 17, INK, 'medium')
    flames(art, 135, 298, 230, 56, name='ledger-black-flames')
    art.add('</g>')

    group(art, 'dragon-forms-section', 'Explore two illustrated dragon forms')
    art.text('Explore dragon forms', 24, 526, 27, INK, 'medium')
    card(art, 'wyvern', 'Wyvern', 'Two legs · Broad wings', 'Winged hunters of open skies.', 24, 546, 342, 138, mobile=True)
    card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Ancient, winding dragon forms.', 24, 696, 342, 138, mobile=True)
    art.add('</g>')
    art.save()


if __name__ == '__main__':
    desktop()
    mobile()
