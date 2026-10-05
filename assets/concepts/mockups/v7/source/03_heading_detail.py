from artwork import Canvas
from editorial import EDGE, MUTED, SILVER
from lettering import scaled_heading


art = Canvas(
    '03-heading-detail', 1280, 320,
    'The Scaling Collection — Scales and dragon-eye heading artwork',
    'A close-up of the custom steel-and-black heading: clipped scale details inside the Scaling S and slit-pupil dragon eyes inside the two Collection o letters. The underlying Alegreya Sans font and selected logo files remain unchanged.'
)
art.rect(0, 0, 1280, 320, SILVER)
art.text('THE SCALING COLLECTION / HEADING ARTWORK', 48, 51, 17, MUTED, 'medium', 1.5)
art.line(48, 74, 1232, 74, EDGE)
scaled_heading(art, 'The Scaling Collection', 640, 190, 115, 1184)
art.text('Scale details in S · Steel dragon eyes in both o letters', 640, 262, 22, MUTED, anchor='middle')
art.save()
