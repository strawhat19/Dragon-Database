from artwork import Canvas


BLACK = '#101115'
PANEL = '#191B20'
MUTED = '#AAB1BC'
RULE = '#383C44'
SILVER = '#C5CBD3'
PALE = '#E4E7EB'


def group(canvas, name):
    canvas.add(f'<g id="{canvas.name}-{name}" class="{name}">')


def end_group(canvas):
    canvas.add('</g>')


def heading(canvas, value, x, y, size, width):
    fitted_size = min(size, size * width / canvas.text_width(value, size, 'display'))
    canvas.text(value, x, y, size=fitted_size, family='display')


def silver_plaque(canvas, x, y, width, height, mark_width):
    group(canvas, 'archive-seal-plaque')
    gradient = f'{canvas.name}-plaque-silver'
    canvas.defs[gradient] = f'<linearGradient id="{gradient}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C5CBD3"/><stop offset="0.48" stop-color="#E4E7EB"/><stop offset="1" stop-color="#C5CBD3"/></linearGradient>'
    cut = 14
    canvas.path(
        f'M{x + cut} {y} H{x + width - cut} L{x + width} {y + cut} V{y + height - cut} L{x + width - cut} {y + height} H{x + cut} L{x} {y + height - cut} V{y + cut} Z',
        fill=f'url(#{gradient})',
    )
    canvas.path(
        f'M{x + cut + 8} {y + 8} H{x + width - cut - 8} L{x + width - 8} {y + cut + 8} V{y + height - cut - 8} L{x + width - cut - 8} {y + height - 8} H{x + cut + 8} L{x + 8} {y + height - cut - 8} V{y + cut + 8} Z',
        stroke='#A8B0BD',
        sw=1,
    )
    center = x + width / 2
    canvas.text('THE ARCHIVE SEAL', center, y + 30, size=12 if width > 300 else 10, fill=BLACK, family='bold', spacing=2, anchor='middle')
    canvas.logo(center - mark_width / 2, y + 44, mark_width, mark=True)
    canvas.text('DB / SWORDMAW', center, y + height - 24, size=14 if width > 300 else 11, fill=BLACK, family='bold', spacing=1.8, anchor='middle')
    end_group(canvas)


def primary_button(canvas, x, y, width, height, mobile=False):
    group(canvas, 'browse-dragons-button')
    canvas.rect(x, y, width, height, PALE, radius=4)
    canvas.icon('compass', x + 22, y + (height - 24) / 2, size=24, color=BLACK)
    canvas.text('Browse Dragons', x + 60, y + height / 2 + 7, size=20 if mobile else 22, fill=BLACK, family='bold')
    canvas.icon('arrow', x + width - 42, y + (height - 22) / 2, size=22, color=BLACK)
    end_group(canvas)


def desktop():
    canvas = Canvas(
        '01-obsidian-codex-desktop',
        1440,
        900,
        'Dragon Database — Obsidian Codex Desktop Hero Concept',
        'A spacious charcoal desktop landing hero with the unchanged selected Swordmaw Hybrid logo, Metal Mania display lettering, public browsing actions, an enlarged mark on a silver plaque, and dragon category teasers.',
    )
    canvas.rect(0, 0, 1440, 900, BLACK)
    group(canvas, 'sticky-header')
    canvas.logo(64, 16, 264)
    group(canvas, 'primary-navigation')
    canvas.text('Dragons', 754, 75, size=20, family='bold')
    canvas.text('Collections', 892, 75, size=20, family='medium')
    canvas.text('Lore', 1060, 75, size=20, family='medium')
    canvas.rect(1188, 42, 180, 48, BLACK, radius=4, stroke=RULE)
    canvas.icon('bookmark', 1207, 56, size=19, color=SILVER)
    canvas.text('Sign In', 1240, 73, size=19, family='medium')
    end_group(canvas)
    canvas.line(64, 128, 1376, 128, RULE)
    end_group(canvas)

    group(canvas, 'split-hero-copy')
    canvas.text('A HOME FOR DRAGON LORE', 72, 220, size=17, fill=SILVER, family='bold', spacing=2.5)
    heading(canvas, 'Every dragon.', 68, 334, 108, 714)
    heading(canvas, 'One archive.', 68, 440, 108, 714)
    canvas.text('Discover dragon legends, explore their origins,', 72, 497, size=25, fill=MUTED)
    canvas.text('and find your next favorite creature.', 72, 531, size=25, fill=MUTED)
    primary_button(canvas, 72, 572, 276, 62)
    group(canvas, 'explore-lore-link')
    canvas.icon('book', 380, 592, size=24, color=SILVER)
    canvas.text('Explore the lore', 418, 613, size=22, fill=PALE, family='medium')
    canvas.line(418, 624, 556, 624, RULE)
    end_group(canvas)
    canvas.text('Open to every curious adventurer.', 72, 679, size=19, fill=MUTED)
    end_group(canvas)

    group(canvas, 'hero-seal-feature')
    canvas.circle(1110, 448, 276, stroke='#2B2E35', sw=1)
    canvas.line(822, 448, 850, 448, RULE)
    canvas.line(1370, 448, 1398, 448, RULE)
    silver_plaque(canvas, 888, 205, 444, 474, 370)
    canvas.text('Forged for the legends you collect.', 1110, 716, size=18, fill=MUTED, anchor='middle')
    end_group(canvas)

    group(canvas, 'dragon-category-teaser')
    canvas.line(72, 766, 1368, 766, RULE)
    canvas.text('Start with a legend', 72, 806, size=35, family='display')
    canvas.text('BROWSE BY KIND', 1368, 801, size=15, fill=MUTED, family='bold', spacing=2, anchor='end')
    categories = [
        ('Firebreathers', 'sword'),
        ('Sea Dragons', 'compass'),
        ('Ancient Guardians', 'book'),
    ]
    for index, (label, icon) in enumerate(categories):
        x = 72 + index * 442
        group(canvas, f'dragon-category-{index}')
        canvas.rect(x, 827, 412, 56, PANEL, radius=4, stroke=RULE)
        canvas.icon(icon, x + 18, 843, size=23, color=SILVER)
        canvas.text(label, x + 58, 863, size=21, family='medium')
        canvas.icon('arrow', x + 365, 844, size=22, color=SILVER)
        end_group(canvas)
    end_group(canvas)
    canvas.save()


def mobile():
    canvas = Canvas(
        '01-obsidian-codex-mobile',
        390,
        844,
        'Dragon Database — Obsidian Codex Mobile Hero Concept',
        'A charcoal mobile hero with the unchanged full Swordmaw Hybrid header logo, generous fantasy display lettering, a full-width public Browse Dragons action, a silver archive seal plaque, and compact category teasers.',
    )
    canvas.rect(0, 0, 390, 844, BLACK)
    group(canvas, 'sticky-header')
    canvas.logo(18, 11, 184)
    group(canvas, 'navigation-menu-button')
    canvas.icon('menu', 336, 34, size=25, color=PALE)
    end_group(canvas)
    canvas.line(18, 92, 372, 92, RULE)
    end_group(canvas)

    group(canvas, 'mobile-hero-copy')
    canvas.text('A HOME FOR DRAGON LORE', 24, 131, size=13, fill=SILVER, family='bold', spacing=1.8)
    heading(canvas, 'Every dragon.', 22, 194, 60, 346)
    heading(canvas, 'One archive.', 22, 253, 60, 346)
    canvas.text('Discover legends, explore their origins,', 24, 292, size=19, fill=MUTED)
    canvas.text('and find your next favorite dragon.', 24, 318, size=19, fill=MUTED)
    primary_button(canvas, 24, 341, 342, 54, mobile=True)
    group(canvas, 'explore-lore-link')
    canvas.icon('book', 105, 413, size=20, color=SILVER)
    canvas.text('Explore the lore', 138, 431, size=19, family='medium')
    end_group(canvas)
    end_group(canvas)

    group(canvas, 'mobile-seal-feature')
    silver_plaque(canvas, 65, 459, 260, 276, 211)
    end_group(canvas)

    group(canvas, 'mobile-category-teaser')
    canvas.line(24, 761, 366, 761, RULE)
    canvas.text('Start with a legend', 24, 798, size=30, family='display')
    categories = [('Fire', 24), ('Sea', 142), ('Ancient', 260)]
    for index, (label, x) in enumerate(categories):
        group(canvas, f'dragon-category-{index}')
        canvas.rect(x, 813, 106, 28, PANEL, radius=3, stroke=RULE)
        canvas.text(label, x + 14, 833, size=17, family='medium')
        canvas.icon('chevron', x + 80, 819, size=15, color=SILVER)
        end_group(canvas)
    end_group(canvas)
    canvas.save()


desktop()
mobile()
