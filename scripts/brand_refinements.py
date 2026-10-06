import re


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
