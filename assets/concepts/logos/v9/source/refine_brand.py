import re
import sys
from pathlib import Path


ROUND = Path(__file__).resolve().parents[1]
ROOT = ROUND.parents[3]
BASELINE = ROUND / 'pre-adoption/assets-brand'
RED = '#8d3038'
sys.path.insert(0, str(ROOT / 'scripts'))

from icon_badges import create_icon_badges


def append_detail(markup, suffix, detail):
    pattern = re.compile(rf'(<path\b[^>]*\bid="([^"]+-{suffix})"[^>]*/>)')
    return pattern.sub(lambda match: match[1] + detail(match[2][:-len(suffix) - 1]), markup, count=1)


def refine_mark(markup):
    markup = append_detail(markup, 'right-blade-fuller', lambda prefix:
        f'\n      <path id="{prefix}-right-blade-blood-smear" class="dragon-sword-blood-smear" '
        f'fill="{RED}" stroke="none" opacity=".8" d="M298 62L313 45L311 52L300 65Z" />')
    markup = append_detail(markup, 'left-blade-fuller', lambda prefix:
        f'\n      <path id="{prefix}-left-blade-blood-smear" class="dragon-sword-blood-smear" '
        f'fill="{RED}" stroke="none" opacity=".8" d="M46 43L54 51L52 57L47 51L44 45Z" />')
    return append_detail(markup, 'long-horn-facet', lambda prefix:
        f'\n    <g id="{prefix}-dragon-eye" class="dragon-logo-eye">'
        f'<path id="{prefix}-dragon-eye-socket" class="dragon-logo-eye-socket" fill="#C5CBD3" d="M260 148L282 156L263 160L258 154Z" />'
        f'<path id="{prefix}-dragon-eye-red" class="dragon-logo-eye-red" fill="{RED}" d="M264 152L277 156L266 158Z" />'
        f'<path id="{prefix}-dragon-eye-pupil" class="dragon-logo-eye-pupil" fill="#101115" d="M271 154L272 156L271 157L270 155Z" />'
        '</g>')


def refine_sword(markup):
    return append_detail(markup, 'db-swordmaw-hybrid-blade-fuller', lambda prefix:
        f'\n<path id="{prefix}-wordmark-blood-smears" class="dragon-sword-blood-smear" fill="{RED}" opacity=".78" '
        'd="M794 313L817 314L809 318L791 317L798 315ZM854 316L862 315L870 317L860 319Z" />')


def literal(markup):
    return '`' + markup.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') + '`'


def update_export(file, name, markup):
    source = file.read_text(encoding='utf-8')
    pattern = re.compile(rf'export const {name} = `(?:\\.|[^`])*`;')
    source = pattern.sub(lambda match: f'export const {name} = {literal(markup)};', source, count=1)
    file.write_text(source, encoding='utf-8')


logo = refine_sword(refine_mark((BASELINE / 'logo.svg').read_text(encoding='utf-8')))
logo = logo.replace('Application code and adopted brand assets have not been changed.',
    'Adopted v9 refinement: unchanged silhouette, lettering and sword geometry with a small silver eye socket, muted-red eye and subtle blade smears.')
mark = refine_mark((BASELINE / 'mark.svg').read_text(encoding='utf-8'))
mark = mark.replace('</title>', '</title><desc>The original Swordmaw dragon and crossed swords with a small silver socket, muted-red eye and subtle blade smears.</desc>', 1)
sword = refine_sword((BASELINE / 'wordmark-sword.svg').read_text(encoding='utf-8'))
sword = sword.replace('wordmark.</desc>', 'wordmark, with subtle muted-red blade smears.</desc>', 1)

for name, markup in [('logo', logo), ('mark', mark), ('wordmark-sword', sword)]:
    for folder in [ROOT / 'assets/brand', ROOT / 'public/brand']:
        (folder / f'{name}.svg').write_text(markup, encoding='utf-8')

for name, markup in [('01-db-swordslapper-crimson-detail', logo), ('02-db-swordmaw-crimson-mark', mark), ('03-crimson-wordmark-sword', sword)]:
    (ROUND / f'{name}.svg').write_text(markup, encoding='utf-8')

update_export(ROOT / 'src/shared/artwork.ts', 'brandLogoXml', logo)
update_export(ROOT / 'src/shared/artwork.ts', 'brandMarkXml', mark)
update_export(ROOT / 'src/shared/landingArtwork.ts', 'wordmarkSwordXml', sword)
create_icon_badges()
for name in ['app-icon', 'adaptive-icon']:
    (ROUND / f'{name}.svg').write_text((ROOT / f'assets/brand/{name}.svg').read_text(encoding='utf-8'), encoding='utf-8')

print('Saved Adopted Crimson Brand Refinement And Icon SVGs')
