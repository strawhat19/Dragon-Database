from artwork import Canvas
from dragons import INK, PALE, EDGE, PAPER, STEEL, MUTED, CHROME, IMAGE, dragon, heading


DARK_EDGE = '#363B44'


def begin_group(art, name):
    art.add(f'<g id="{art.name}-{name}" class="{name}">')


def end_group(art):
    art.add('</g>')


def browse_button(art, x, y, width, height, mobile=False):
    art.begin_link('browse-dragons-button', 'Browse Dragons', '/dragons')
    art.rect(x, y, width, height, INK, 4)
    art.icon('compass', x + 19, y + (height - 23) / 2, 23, PALE)
    art.text('Browse Dragons', x + 55, y + height / 2 + 7, 20 if mobile else 22, PALE, 'bold')
    art.icon('arrow', x + width - 41, y + (height - 21) / 2, 21, PALE)
    art.end_link()


def crest(art, x, y, width, height, mark_width, mobile=False):
    begin_group(art, 'framed-archive-crest')
    art.rect(x - 7, y + 8, width + 14, height, INK, 3)
    art.rect(x, y, width, height, STEEL, 3, EDGE)
    art.rect(x + 8, y + 8, width - 16, height - 16, PAPER, 2, EDGE)
    art.logo(x + (width - mark_width) / 2, y + (10 if mobile else 35), mark_width, mark=True)
    if not mobile:
        art.text('THE IRONBOUND SEAL', x + width / 2, y + height - 25, 14, MUTED, 'bold', spacing=1.4, anchor='middle')
        for bolt_x, bolt_y in [
            (x + 18, y + 18),
            (x + width - 18, y + 18),
            (x + 18, y + height - 18),
            (x + width - 18, y + height - 18),
        ]:
            art.circle(bolt_x, bolt_y, 3, STEEL, EDGE)
    end_group(art)


def desktop_card(art, kind, title, traits, description, x, y, width):
    begin_group(art, f'{kind}-type-card')
    art.rect(x + 5, y + 6, width, 177, CHROME, 4)
    art.rect(x, y, width, 177, PAPER, 4, EDGE)
    heading(art, title, x + 21, y + 50, 48, width - 176, INK)
    art.text(traits, x + 22, y + 76, 17, MUTED, 'medium')
    dragon(art, kind, x + width - 143, y + 13, 121, INK, STEEL)
    art.line(x + 21, y + 95, x + width - 21, y + 95, EDGE)
    art.text(description, x + 22, y + 121, 19, MUTED)
    art.begin_link(f'{kind}-explore-link', f'Explore {title}s', f'/dragons?type={kind}')
    art.text(f'Explore {title}s', x + 22, y + 155, 19, INK, 'bold')
    art.icon('arrow', x + width - 45, y + 137, 22, INK)
    art.end_link()
    end_group(art)


def phone_card(art, kind, title, traits, description, x, y):
    width = 350
    height = 148
    begin_group(art, f'{kind}-type-card')
    art.rect(x, y, width, height, PAPER, 4, EDGE)
    art.rect(x + 10, y + 10, 100, height - 20, IMAGE, 2)
    dragon(art, kind, x + 10, y + 43, 101, INK, STEEL)
    heading(art, title, x + 125, y + 38, 43, width - 144, INK)
    art.text(traits, x + 126, y + 65, 17, MUTED, 'medium')
    art.text(description, x + 126, y + 94, 18, MUTED)
    art.begin_link(f'{kind}-explore-link', f'Explore {title}s', f'/dragons?type={kind}')
    art.text(f'Explore {title}s', x + 126, y + 129, 18, INK, 'bold')
    art.icon('arrow', x + width - 34, y + 112, 20, INK)
    art.end_link()
    end_group(art)


def desktop():
    art = Canvas(
        '02-ironbound-archive-desktop',
        1440,
        900,
        'Dragon Database — Ironbound Archive Desktop Concept',
        'A charcoal desktop shell surrounds a raised pale-silver editorial hero with the unchanged Swordslapper Classic underline logo, generous dark DragonSlapper headings, an original archive crest in a framed silver plaque, and three raised silver Wyvern, Wyrm, and Drake type cards. Public browsing, Collections, and Lore navigation remain prominent.',
    )
    art.rect(0, 0, 1440, 900, INK)
    begin_group(art, 'sticky-header')
    art.rect(24, 20, 1392, 120, CHROME, 6, DARK_EDGE)
    art.begin_link('home-logo-link', 'Dragon Database Home', '/')
    art.logo(60, 28, 278)
    art.end_link()
    navigation = [
        ('Dragons', 'compass', '/dragons', 787),
        ('Collections', 'bookmark', '/collections', 934),
        ('Lore', 'book', '/lore', 1104),
    ]
    for label, icon, route, x in navigation:
        art.begin_link(f'{label.lower()}-navigation-link', label, route)
        art.icon(icon, x, 62, 21, STEEL)
        art.text(label, x + 33, 82, 20, PALE, 'medium')
        art.end_link()
    art.begin_link('sign-in-link', 'Sign In', '/sign-in')
    art.rect(1224, 52, 150, 48, CHROME, 4, DARK_EDGE)
    art.text('Sign In', 1250, 83, 20, PALE, 'medium')
    art.icon('chevron', 1334, 67, 19, STEEL)
    art.end_link()
    end_group(art)

    begin_group(art, 'layered-silver-hero')
    art.rect(49, 179, 1342, 460, CHROME, 6)
    art.rect(40, 169, 1360, 460, PALE, 6, EDGE)
    art.rect(48, 177, 1344, 444, PAPER, 3, STEEL)
    art.text('ENTER THE IRONBOUND ARCHIVE', 78, 220, 16, MUTED, 'bold', spacing=2.1)
    heading(art, 'Dragon legends.', 73, 315, 125, 732, INK)
    heading(art, 'Forged to last.', 73, 413, 125, 732, INK)
    art.text('Meet wyverns, wyrms, and drakes.', 78, 454, 24, MUTED)
    art.text('Explore the stories that make them legends.', 78, 486, 24, MUTED)
    browse_button(art, 78, 518, 279, 60)
    art.begin_link('explore-lore-button', 'Explore Lore', '/lore')
    art.rect(377, 518, 198, 60, PAPER, 4, EDGE)
    art.icon('book', 397, 537, 22, INK)
    art.text('Explore Lore', 431, 555, 21, INK, 'medium')
    art.end_link()
    art.text('Public browsing. Your next legend starts here.', 78, 609, 18, MUTED)
    crest(art, 950, 204, 353, 383, 298)
    art.line(879, 215, 879, 586, EDGE)
    end_group(art)

    begin_group(art, 'raised-dragon-types')
    heading(art, 'Choose your dragon', 40, 679, 45, 700, PALE)
    art.begin_link('all-types-link', 'View All Dragon Types', '/dragons')
    art.text('View all types', 1224, 678, 19, STEEL, 'medium')
    art.icon('arrow', 1363, 660, 21, STEEL)
    art.end_link()
    desktop_card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'Wings built for the hunt.', 40, 703, 432)
    desktop_card(art, 'wyrm', 'Wyrm', 'Serpentine · Wingless', 'A long-bodied legend.', 504, 703, 432)
    desktop_card(art, 'drake', 'Drake', 'Four legs · Grounded', 'Strength close to the earth.', 968, 703, 432)
    end_group(art)
    art.save()


def mobile():
    art = Canvas(
        '02-ironbound-archive-mobile',
        390,
        844,
        'Dragon Database — Ironbound Archive Mobile Concept',
        'A charcoal mobile shell and layered pale-silver hero retain the unchanged Swordslapper Classic underline logo. Dark DragonSlapper display copy sits beside a silver-framed dragon crest, followed by a full-width public Browse Dragons action and Lore link. Two readable raised silver dragon type cards fit within the mobile frame.',
    )
    art.rect(0, 0, 390, 844, INK)
    begin_group(art, 'sticky-header')
    art.rect(10, 10, 370, 82, CHROME, 5, DARK_EDGE)
    art.begin_link('home-logo-link', 'Dragon Database Home', '/')
    art.logo(22, 17, 181)
    art.end_link()
    art.begin_link('navigation-menu-button', 'Open Navigation Menu', '/menu')
    art.icon('menu', 339, 36, 23, PALE)
    art.end_link()
    end_group(art)

    begin_group(art, 'layered-silver-mobile-hero')
    art.rect(22, 112, 346, 344, CHROME, 5)
    art.rect(16, 105, 358, 349, PALE, 5, EDGE)
    art.rect(23, 112, 344, 335, PAPER, 3, STEEL)
    art.text('ENTER THE ARCHIVE', 33, 141, 12, MUTED, 'bold', spacing=1.8)
    heading(art, 'Dragon', 30, 205, 87, 199, INK)
    heading(art, 'legends.', 30, 269, 87, 199, INK)
    crest(art, 249, 158, 101, 126, 93, mobile=True)
    art.text('Every dragon has a story.', 33, 312, 20, MUTED)
    art.text('Find yours in the archive.', 33, 338, 20, MUTED)
    browse_button(art, 33, 359, 324, 52, mobile=True)
    art.begin_link('explore-lore-link', 'Explore Lore', '/lore')
    art.icon('book', 127, 425, 18, INK)
    art.text('Explore Lore', 156, 441, 18, INK, 'medium')
    art.end_link()
    end_group(art)

    begin_group(art, 'raised-mobile-dragon-types')
    heading(art, 'Choose your dragon', 20, 502, 36, 350, PALE)
    phone_card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'Wings and wild skies.', 20, 519)
    phone_card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'A long-bodied legend.', 20, 681)
    end_group(art)
    art.save()


desktop()
mobile()
