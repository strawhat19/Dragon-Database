import re
import sys
from pathlib import Path
from html import escape
from icon_badges import create_icon_badges
from brand_refinements import smooth_flames


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'assets/concepts/mockups/v9/source'))

from artwork import Canvas
from dragons import dragon
from scaling_collection import scaled_heading
from materials import metal
from banner import flying_dragon


BRAND = ROOT / 'assets/brand'
PUBLIC = ROOT / 'public/brand'
BRAND.mkdir(parents=True, exist_ok=True)
PUBLIC.mkdir(parents=True, exist_ok=True)


def vector(art):
    credit = 'DragonSlapper by Allison James (NAL), Copyright 2013, FontStruct original release, CC BY-SA 3.0. Alegreya Sans outlined subheading is SIL OFL. Original font files unchanged.'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {art.width} {art.height}" fill="none"><title>{escape(art.title)}</title><metadata>{credit}</metadata><defs>{"".join(art.defs.values())}</defs>{"".join(art.parts)}</svg>'


def save(name, markup):
    (BRAND / f'{name}.svg').write_text(markup)
    (PUBLIC / f'{name}.svg').write_text(markup)
    return markup


logo = (ROOT / 'assets/concepts/logos/v9/01-db-swordslapper-crimson-detail.svg').read_text()
save('logo', logo)
mark_xml = save('mark', (ROOT / 'assets/concepts/logos/v9/02-db-swordmaw-crimson-mark.svg').read_text())

subheading = Canvas('scaling-subheading', 1080, 110, 'The Scaling Collection', 'DragonSlapper lettering with steel scales on the S')
scaled_heading(subheading, 'The Scaling Collection', 540, 82, 90, 1020)
subheading_xml = save('scaling-collection', vector(subheading).replace(' Alegreya Sans outlined subheading is SIL OFL.', ''))

flames = {}
for side in ['left', 'right']:
    art = Canvas(f'smooth-flame-{side}', 200, 100, 'Flowing black flame silhouette', 'Original smooth tapered black flame artwork')
    smooth_flames(art, f'{side}-flames', 0, 0, 200, 100, mirrored=side == 'right')
    flames[side] = save(f'flames-{side}', vector(art).replace('<svg ', '<svg preserveAspectRatio="none" ', 1))

flight = Canvas('flying-dragon', 64, 36, 'Flying dragon', 'Original horned winged long-tail silhouette')
flying_dragon(flight, 'silhouette', 0, 0, 64)
flight_xml = save('flying-dragon', vector(flight))

symbols = {}
for kind in ['wyrm', 'drake', 'wyvern']:
    art = Canvas(f'dragon-symbol-{kind}', 180, 110, f'{kind.title()} dragon symbol', 'Original dragon type silhouette')
    dragon(art, kind, 0, 0, 180, '#101115', '#d8dde4')
    symbols[kind] = save(f'{kind}-symbol', vector(art))

texture = Canvas('brushed-steel-texture', 400, 320, 'Brushed steel', 'Editable metallic gradient and fine grain')
metal(texture, 0, 0, 400, 320, name='brushed-steel')
texture_xml = save('steel-texture', vector(texture))

create_icon_badges()


def literal(markup):
    return '`' + markup.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') + '`'


exports = {
    'brandLogoXml': logo,
    'brandMarkXml': mark_xml,
    'flameLeftXml': flames['left'],
    'flameRightXml': flames['right'],
    'flyingDragonXml': flight_xml,
    'steelTextureXml': texture_xml,
    'scalingCollectionXml': subheading_xml,
}
source = '// Original local artwork; font attribution is retained in SVG metadata and the copyright page.\n'
source += '\n'.join(f'export const {name} = {literal(markup)};\n' for name, markup in exports.items())
source += '\nexport const dragonSymbols = {\n' + ''.join(f'  {kind}: {literal(markup)},\n' for kind, markup in symbols.items()) + '} as const;\n'
(ROOT / 'src/shared/artwork.ts').write_text(source)
print('Saved implementation SVG artwork and shared artwork module')
