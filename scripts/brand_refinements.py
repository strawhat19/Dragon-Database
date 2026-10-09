import re


BLADE_BLOOD_SMEARS = {
    'left-blade-blood-smear': 'M46 50C47 55 50 60 54 64C57 68 60 71 64 74C61 68 57 64 54 59C51 55 48 52 46 50Z',
    'right-blade-blood-smear': 'M315 49C314 54 311 59 307 63C303 67 299 71 296 74C299 68 304 64 308 58C311 54 313 51 315 49Z',
    'wordmark-blood-smears': 'M790 315C796 313 802 314 808 315C813 316 818 315 823 316C816 318 810 319 804 318C798 318 794 316 790 315ZM848 317C852 315 857 315 862 316C866 317 870 317 873 317C868 319 862 320 857 319C853 319 850 318 848 317Z',
}


def refine_brand_accents(markup):
    markup = re.sub(
        r'(<path\b[^>]*class="dragon-logo-eye-socket"[^>]*fill=")[^"]+',
        lambda match: match.group(1) + '#FFFFFF',
        markup,
    )
    for name, shape in BLADE_BLOOD_SMEARS.items():
        markup = re.sub(
            rf'(<path\b[^>]*id="[^"]*-{name}"[^>]*\bd=")[^"]+',
            lambda match: match.group(1) + shape,
            markup,
        )
    return markup.replace('small silver eye socket', 'small white eye socket').replace('small silver socket', 'small white socket')


SMOOTH_FLAME_OUTLINE = (
    'M3 100 C6 94 16 94 17 88 C19 80 12 74 12 67 C23 73 27 82 28 91 '
    'C42 79 36 63 37 48 C38 34 46 24 49 11 C44 34 52 44 57 55 '
    'C62 67 57 79 55 87 C73 78 75 64 68 51 C56 32 66 14 81 3 '
    'C72 29 84 34 85 49 C87 65 80 75 84 85 C97 90 106 79 108 67 '
    'C109 52 101 42 111 29 C108 48 128 53 128 70 C127 80 122 88 128 92 '
    'C140 86 148 72 144 59 C141 49 136 37 154 19 C149 35 158 46 160 57 '
    'C164 70 157 78 168 90 C179 84 183 75 180 65 C178 53 185 47 190 39 '
    'C184 53 193 63 195 72 C198 84 190 93 197 100 Z'
)


def smooth_flames(art, name, x, y, width, height, mirrored=False):
    origin = x + width if mirrored else x
    horizontal_scale = -width / 200 if mirrored else width / 200
    art.add(
        f'<g id="{art.name}-{name}" class="smooth-black-flame-tongues" '
        f'aria-hidden="true" transform="translate({origin:.4f} {y:.4f}) '
        f'scale({horizontal_scale:.6f} {height / 100:.6f})">'
        f'<path id="{art.name}-{name}-flowing-silhouette" fill="#0C0D10" d="{SMOOTH_FLAME_OUTLINE}"/>'
        '</g>'
    )


def without_logo_eyes(markup):
    markup = re.sub(r'<defs><clipPath id="[^"]+-angry-eye-aperture">.*?</clipPath></defs>', '', markup, flags=re.S)
    markup = re.sub(r'<g\b[^>]*class="dragon-logo-eye"[^>]*>.*?</g>', '', markup, flags=re.S)
    return re.sub(r'[ \t]*<path\b[^>]*id="[^"]+-angry-eye"[^>]*/>\r?\n?', '', markup)
