from artwork import Canvas
from wordmark import cropped_wordmark, outline, silver_background, transparent_copy, underline_sword


name = '01-db-swordslapper-classic'
art = Canvas(
    name, 960, 360,
    'Dragon Database — Swordslapper Classic',
    'The selected Swordmaw Hybrid dragon, wings, DB monogram and crossed swords with a new DragonSlapper Dragon Database wordmark. Both words align to the full width of the original horizontal sword beneath the lettering. Black on silver.'
)
silver_background(art)
art.logo(0, 0, 360, mark=True)
outline(art, 'Dragon', 401, 55, 517, 124)
outline(art, 'Database', 401, 205, 517, 86)
underline_sword(art)
art.save()
transparent_copy(name)
cropped_wordmark(name, '03-classic-wordmark', 'Dragon Database — DragonSlapper sword underline wordmark')
