from artwork import Canvas
from lettering import scaled_heading
from editorial import EDGE, INK, MUTED, SILVER


art = Canvas(
    '03-heading-detail', 1440, 420,
    'Dragon Database — DragonSlapper H1 and scaled-g subheading artwork',
    'A close-up of the DragonSlapper Dragon Database main heading and The Scaling Collection subheading. The subheading S has prominent steel scale details and the upper circular bowl of its g contains a single steel-and-black dragon eye. Collection has ordinary unmodified o glyphs.'
)
art.rect(0, 0, 1440, 420, SILVER)
art.text('DRAGON DATABASE / HEADING ARTWORK', 48, 43, 17, MUTED, 'medium', 1.5)
art.line(48, 64, 1392, 64, EDGE)
size = min(98, 98 * 1300 / art.text_width('Dragon Database', 98, 'slapper'))
art.text('Dragon Database', 720, 173, size, INK, 'slapper', anchor='middle')
scaled_heading(art, 'The Scaling Collection', 720, 300, 105, 1300)
art.text('DragonSlapper main heading · Stronger S scales · One eye in the upper g counter', 720, 378, 22, MUTED, anchor='middle')
art.save()
