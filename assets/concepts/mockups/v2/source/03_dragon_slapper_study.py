from artwork import Canvas


BLACK = '#101115'
PANEL = '#191B20'
MUTED = '#ABB3BE'
RULE = '#3B3F47'
SILVER = '#C5CBD3'
PALE = '#E4E7EB'
SOURCE_URL = 'https://www.fontstruct.com/fontstructions/show/830154/dragonslapper'
LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/3.0/'


def begin_group(canvas, name):
    canvas.add(f'<g id="{canvas.name}-{name}" class="{name}">')


def end_group(canvas):
    canvas.add('</g>')


def specimen(canvas, value, x, y, size, width, family='slapper', fill=PALE):
    fitted_size = min(size, size * width / canvas.text_width(value, size, family))
    canvas.text(value, x, y, size=fitted_size, fill=fill, family=family)


def supported_characters(canvas, value):
    _, _, mapping = canvas.face('slapper')
    return ''.join(character for character in value if ord(character) in mapping)


canvas = Canvas(
    '03-dragon-slapper-study',
    1440,
    960,
    'Dragon Database — Original DragonSlapper Font Study',
    'An optional black-and-silver typography study using the original CC BY-SA 3.0 FontStruct DragonSlapper release. The unchanged selected Swordmaw Hybrid mark accompanies a Dragon Database specimen, a clearly labeled Metal Mania baseline comparison, supported alphabet and numeral samples, and dragon card titles with Dragon Dictionary links. Visible designer attribution and source and license links accompany the outlined font glyphs.',
)
canvas.rect(0, 0, 1440, 960, BLACK)

begin_group(canvas, 'study-header')
canvas.text('TYPE EXPLORATION / 03', 60, 43, size=14, fill=SILVER, family='bold', spacing=2.2)
canvas.text('DragonSlapper', 60, 104, size=56, family='display')
canvas.text('ORIGINAL FONTSTRUCT RELEASE', 1380, 52, size=14, fill=SILVER, family='bold', spacing=1.8, anchor='end')
canvas.text('Optional font study · selected logo unchanged', 1380, 88, size=20, fill=MUTED, anchor='end')
end_group(canvas)

begin_group(canvas, 'silver-wordmark-specimen')
canvas.rect(60, 135, 1320, 274, PALE, radius=4)
canvas.logo(91, 152, 240, mark=True)
canvas.line(361, 171, 361, 370, '#B6BDC7')
canvas.text('DRAGONSLAPPER / DISPLAY & WORDMARK STUDY', 397, 193, size=14, fill=BLACK, family='bold', spacing=1.9)
specimen(canvas, 'Dragon Database', 391, 319, 118, 942, fill=BLACK)
canvas.text('Original glyphs. Unchanged proportions. A sharper fantasy voice.', 397, 365, size=21, fill=BLACK)
canvas.text('SELECTED HYBRID MARK', 212, 393, size=11, fill=BLACK, family='bold', spacing=1.5, anchor='middle')
end_group(canvas)

begin_group(canvas, 'font-comparison')
canvas.rect(60, 432, 640, 164, PANEL, radius=4, stroke=RULE)
canvas.rect(720, 432, 660, 164, PANEL, radius=4, stroke=RULE)
canvas.text('01 / DRAGONSLAPPER', 84, 463, size=14, fill=SILVER, family='bold', spacing=1.6)
specimen(canvas, 'Dragon Database', 82, 533, 60, 592)
canvas.text('Angular strokes · compact medieval rhythm', 84, 574, size=19, fill=MUTED)
canvas.text('02 / METAL MANIA · EXISTING BASELINE', 744, 463, size=14, fill=SILVER, family='bold', spacing=1.6)
specimen(canvas, 'Dragon Database', 742, 533, 60, 612, family='display')
canvas.text('Your selected identity remains unchanged.', 744, 574, size=19, fill=MUTED)
end_group(canvas)

begin_group(canvas, 'supported-character-specimen')
canvas.rect(60, 620, 830, 212, PANEL, radius=4, stroke=RULE)
canvas.text('CHARACTER SNAPSHOT', 84, 651, size=14, fill=SILVER, family='bold', spacing=1.6)
specimen(canvas, supported_characters(canvas, 'ABCDEFGHIJKLM'), 82, 697, 43, 780)
specimen(canvas, supported_characters(canvas, 'NOPQRSTUVWXYZ'), 82, 744, 43, 780)
specimen(canvas, supported_characters(canvas, '0123456789 ! ? &'), 84, 798, 36, 780)
end_group(canvas)

begin_group(canvas, 'dragon-title-cards')
titles = [('Wyvern', 620), ('Wyrm', 693), ('Drake', 766)]
for index, (title, y) in enumerate(titles):
    begin_group(canvas, f'dragon-title-card-{index}')
    canvas.rect(914, y, 466, 66, PANEL, radius=4, stroke=RULE)
    specimen(canvas, title, 936, y + 45, 43, 185)
    canvas.begin_link(f'dragon-dictionary-link-{index}', f'Dragon Dictionary for {title}', '/dragon-dictionary')
    canvas.icon('book', 1142, y + 23, size=20, color=SILVER)
    canvas.text('Dragon Dictionary', 1173, y + 42, size=18, family='medium')
    canvas.end_link()
    end_group(canvas)
end_group(canvas)

begin_group(canvas, 'font-usage-note')
canvas.text('Regular display face · Latin character set · use Alegreya Sans for longer reading and multilingual copy.', 60, 862, size=18, fill=MUTED)
end_group(canvas)

begin_group(canvas, 'font-attribution-footer')
canvas.line(60, 883, 1380, 883, RULE)
canvas.text('DragonSlapper by Allison James (NAL) · FontStruct · CC BY-SA 3.0', 60, 914, size=19, fill=PALE, family='medium')
canvas.text('Font file unchanged. Included DragonSlapper outlines retain their CC BY-SA 3.0 license.', 60, 942, size=16, fill=MUTED)
canvas.begin_link('fontstruct-source-link', 'Original DragonSlapper font release on FontStruct', SOURCE_URL)
canvas.rect(998, 899, 188, 40, BLACK, radius=3, stroke=RULE)
canvas.icon('book', 1012, 911, size=16, color=SILVER)
canvas.text('FontStruct source', 1040, 926, size=18, family='medium')
canvas.end_link()
canvas.begin_link('cc-by-sa-license-link', 'Creative Commons Attribution ShareAlike 3.0 license', LICENSE_URL)
canvas.rect(1202, 899, 178, 40, BLACK, radius=3, stroke=RULE)
canvas.text('CC BY-SA 3.0', 1217, 926, size=18, family='medium')
canvas.icon('arrow', 1346, 911, size=17, color=SILVER)
canvas.end_link()
end_group(canvas)

canvas.save()
