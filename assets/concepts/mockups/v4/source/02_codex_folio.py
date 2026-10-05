from artwork import Canvas
from dragons import dragon
from editorial import INK, EDGE, PAPER, MUTED, STEEL, SILVER, heading


FOLIO = '#E0E5EB'


def begin_group(art, name):
    art.add(f'<g id="{art.name}-{name}" class="{name}">')


def end_group(art):
    art.add('</g>')


def browse_button(art, x, y, width=226, height=54):
    art.begin_link('browse-dragons-button', 'Browse Dragons', '/dragons')
    art.rect(x, y, width, height, INK, 2)
    art.text('Browse Dragons', x + 22, y + height / 2 + 7, 20, PAPER, 'medium')
    art.icon('arrow', x + width - 44, y + (height - 21) / 2, 21, PAPER)
    art.end_link()


def navigation_link(art, name, icon, route, x, y, size=19):
    art.begin_link(f'{name.lower().replace(" ", "-")}-navigation-link', name, route)
    art.icon(icon, x, y - 18, 19, MUTED)
    art.text(name, x + 29, y, size, INK, 'medium')
    art.end_link()


def type_card(art, kind, title, traits, description, x, y, width=412, height=168, mobile=False):
    begin_group(art, f'{kind}-type-card')
    art.rect(x, y, width, height, PAPER, 1, EDGE)
    icon_width = 52 if mobile else 65
    dragon(art, kind, x + 21, y + 23, icon_width, MUTED, PAPER)
    title_x = x + (85 if mobile else 106)
    heading(art, title, title_x, y + 43, 33 if mobile else 36, width - 130, 'editorial', INK)
    art.text(traits, title_x, y + 68, 17 if mobile else 18, MUTED)
    art.text(description, x + 22, y + 100, 19 if mobile else 20, MUTED)
    art.begin_link(f'{kind}-explore-link', f'Explore {title} Type', f'/dragons?type={kind}')
    art.text('Explore type', x + 22, y + height - 19, 18, INK, 'medium')
    art.icon('arrow', x + width - 43, y + height - 37, 19, INK)
    art.end_link()
    end_group(art)


def desktop():
    art = Canvas(
        '02-codex-folio-desktop',
        1440,
        900,
        'Dragon Database — Codex Folio Desktop Concept',
        'A restrained literary archive design on a matte-silver field. The original transparent Swordslapper Classic logo remains small in the header, regular Grenze title-case headings establish an editorial hierarchy, and a moderate unchanged dragon mark appears on a quiet rectangular silver panel. Three text-led dragon form cards use small muted original silhouettes. Fine rules, ample margins, a single primary browsing action, and quiet Collections, Lore, and account access complete the composition.',
    )
    art.rect(0, 0, 1440, 900, SILVER)
    begin_group(art, 'sticky-header')
    art.begin_link('home-logo-link', 'Dragon Database Home', '/')
    art.logo(69, 15, 239)
    art.end_link()
    navigation_link(art, 'Collections', 'bookmark', '/collections', 941, 67)
    navigation_link(art, 'Lore', 'book', '/lore', 1120, 67)
    navigation_link(art, 'Sign In', 'chevron', '/sign-in', 1250, 67)
    art.line(80, 121, 1360, 121, EDGE)
    end_group(art)

    begin_group(art, 'literary-split-hero')
    art.text('A reference for dragon lore', 82, 199, 20, MUTED)
    heading(art, 'Dragon lore,', 78, 295, 92, 694, 'editorial', INK)
    heading(art, 'considered.', 78, 389, 92, 694, 'editorial', INK)
    art.text('Explore dragon forms, their origins,', 82, 443, 25, MUTED)
    art.text('and the traditions that shape their stories.', 82, 477, 25, MUTED)
    browse_button(art, 82, 519)
    art.text('Explore at your own pace.', 82, 603, 19, MUTED)

    begin_group(art, 'editorial-emblem-panel')
    art.rect(910, 168, 428, 442, FOLIO)
    art.text('Dragon Database', 938, 207, 18, MUTED, 'medium')
    art.line(938, 224, 1310, 224, EDGE)
    art.logo(1000, 253, 247, mark=True)
    art.line(938, 526, 1310, 526, EDGE)
    heading(art, 'The archive emblem', 1124, 563, 28, 370, 'editorial', INK, anchor='middle')
    art.text('Forms, origins, and traditions.', 1124, 590, 17, MUTED, anchor='middle')
    end_group(art)
    end_group(art)

    begin_group(art, 'dragon-form-index')
    art.line(80, 639, 1360, 639, EDGE)
    heading(art, 'Dragon forms', 81, 690, 38, 600, 'editorial', INK)
    art.begin_link('browse-archive-link', 'Browse the Dragon Archive', '/dragons')
    art.text('Browse the archive', 1159, 686, 19, MUTED, 'medium')
    art.icon('arrow', 1335, 668, 20, MUTED)
    art.end_link()
    type_card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'Winged forms with two hind legs.', 82, 713)
    type_card(art, 'wyrm', 'Wyrm', 'Serpentine · Wingless', 'Long-bodied, serpentine forms.', 514, 713)
    type_card(art, 'drake', 'Drake', 'Four legs · Grounded', 'Four-legged, grounded forms.', 946, 713)
    end_group(art)
    art.save()


def mobile():
    art = Canvas(
        '02-codex-folio-mobile',
        390,
        844,
        'Dragon Database — Codex Folio Mobile Concept',
        'A calm matte-silver mobile archive with the unchanged transparent Swordslapper Classic header logo, visible Collections and Lore access, regular Grenze title-case editorial headings, one primary public Browse Dragons action, and two complete text-led dragon form cards. Small muted silhouettes and fine rules keep the composition professional and readable.',
    )
    art.rect(0, 0, 390, 844, SILVER)
    begin_group(art, 'sticky-header')
    art.begin_link('home-logo-link', 'Dragon Database Home', '/')
    art.logo(18, 11, 187)
    art.end_link()
    art.begin_link('sign-in-link', 'Sign In', '/sign-in')
    art.text('Sign In', 289, 49, 18, INK, 'medium')
    art.icon('chevron', 343, 33, 16, MUTED)
    art.end_link()
    navigation_link(art, 'Collections', 'bookmark', '/collections', 25, 104, 18)
    navigation_link(art, 'Lore', 'book', '/lore', 183, 104, 18)
    art.line(24, 120, 366, 120, EDGE)
    end_group(art)

    begin_group(art, 'literary-mobile-hero')
    art.text('A reference for dragon lore', 25, 158, 18, MUTED)
    heading(art, 'Dragon lore,', 23, 220, 58, 342, 'editorial', INK)
    heading(art, 'considered.', 23, 276, 58, 342, 'editorial', INK)
    art.text('Explore dragon forms, their origins,', 25, 316, 20, MUTED)
    art.text('and the stories that surround them.', 25, 343, 20, MUTED)
    browse_button(art, 25, 365, 340, 52)
    art.text('Explore at your own pace.', 25, 447, 18, MUTED)
    end_group(art)

    begin_group(art, 'mobile-dragon-form-index')
    art.line(24, 471, 366, 471, EDGE)
    heading(art, 'Dragon forms', 25, 508, 30, 341, 'editorial', INK)
    type_card(art, 'wyvern', 'Wyvern', 'Two legs · Winged', 'Winged forms with two hind legs.', 24, 528, 342, 139, mobile=True)
    type_card(art, 'wyrm', 'Wyrm', 'Wingless · Serpentine', 'Long-bodied, serpentine forms.', 24, 683, 342, 139, mobile=True)
    end_group(art)
    art.save()


desktop()
mobile()
