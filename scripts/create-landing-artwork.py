import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INK = '#101115'
STEEL = '#BEC6D0'


def svg(name, title, description, content, view_box='0 0 400 240'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" fill="none">
  <title>{title}</title>
  <desc>{description}</desc>
  <metadata>Original Dragon Database vector artwork. Editable anatomy plate; illustrative fantasy classification.</metadata>
  <g id="{name}" class="{name}">{content}</g>
</svg>'''


def path(name, shape, fill='none', stroke=INK, width=2):
    return f'<path id="{name}" d="{shape}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" />'


def plate(kind, title, description, parts):
    frame = f'''<g id="{kind}-registration" stroke="#626B77" stroke-width=".8" opacity=".38">
      <path d="M32 40V28H44M356 28H368V40M32 200V212H44M356 212H368V200M24 120H376" />
      <circle cx="200" cy="120" r="90" stroke-dasharray="2 7" />
      <path d="M200 20V34M200 206V220M24 120H38M362 120H376" />
    </g>'''
    return svg(f'{kind}-anatomy-plate', title, description, frame + ''.join(parts))


def save(name, markup):
    for folder in [ROOT / 'assets/brand', ROOT / 'public/brand']:
        (folder / f'{name}.svg').write_text(markup)
    return markup


logo = (ROOT / 'assets/concepts/logos/v9/01-db-swordslapper-crimson-detail.svg').read_text()
sword = re.search(r'<g id="[^"]+-wordmark-sword" fill="#101115">.*?</g>', logo, re.S).group(0)
wordmark_sword = save('wordmark-sword', svg(
    'wordmark-sword',
    'Dragon Database wordmark sword',
    'The original black blade, guard and wrapped grip with subtle muted-red blade smears.',
    sword,
    '390 288 540 56',
))
black_flame = save('black-flame', svg(
    'black-flame',
    'Black forge flame',
    'An elongated, tapered black flame with a cut steel silhouette.',
    path('black-flame-silhouette', 'M18 280C-2 242 8 209 28 183L54 145C52 182 43 191 49 212C58 183 93 159 92 122C91 101 82 82 92 57L119 0C110 62 139 78 144 103C154 77 165 66 171 43C182 90 160 119 150 151C173 141 182 121 184 104C208 152 185 186 178 207C192 217 203 247 187 280Z', fill=INK, stroke='none'),
    '0 0 200 280',
))

graphics = {}
graphics['wyvern'] = plate('wyvern', 'Wyvern anatomy plate', 'Two hind legs, a horned head and two structural wings.', [
    path('wyvern-left-wing', 'M216 139L191 47L153 58L93 22L113 93L68 122L132 125L159 163Z', fill=STEEL),
    path('wyvern-wing-fingers', 'M216 139L153 58M191 47L174 114L113 93M174 114L132 125M174 114L159 163M153 58L113 93'),
    path('wyvern-body', 'M231 124L258 119L273 95L286 83L311 95L319 119L286 123L270 148L241 163L219 153L172 177L106 171L68 190L114 185L177 193L227 165Z', fill=INK),
    path('wyvern-horns', 'M283 94L276 69L301 85L318 60L314 95L336 102L351 121L329 126L316 140L306 126L285 125', fill=INK),
    path('wyvern-eye', 'M320 108L333 114', stroke=STEEL, width=1.4),
    path('wyvern-legs', 'M239 154L258 177L241 194L250 204M270 147L286 178L274 196L286 204M241 194L229 204M274 196L265 204', width=3),
    path('wyvern-neck-scales', 'M248 139L260 142M257 130L269 135M267 118L278 123M232 149L242 153', stroke=STEEL, width=1.4),
    path('wyvern-wing-etching', 'M139 64L130 83M146 68L137 86M153 75L144 91M155 138L148 153M164 143L157 158', width=.9),
])
graphics['wyrm'] = plate('wyrm', 'Wyrm anatomy plate', 'A coiled, limbless dragon with a ridged spine and elongated body.', [
    path('wyrm-serpentine-body', 'M290 83C281 112 307 136 293 160C278 186 221 204 162 194C109 185 91 160 113 140C133 122 190 120 222 139C249 155 218 175 177 159C149 148 153 118 174 100C189 86 204 73 206 53', width=15),
    path('wyrm-body-engraving', 'M290 83C281 112 307 136 293 160C278 186 221 204 162 194C109 185 91 160 113 140C133 122 190 120 222 139C249 155 218 175 177 159C149 148 153 118 174 100C189 86 204 73 206 53', stroke=STEEL, width=1.5),
    path('wyrm-horned-head', 'M276 84L273 62L289 72L307 44L307 78L326 83L345 98L320 107L307 120L300 104L278 99Z', fill=INK),
    path('wyrm-eye', 'M312 90L325 94', stroke=STEEL, width=1.4),
    path('wyrm-spine', 'M282 118L271 116L282 128L270 129L283 140L273 145M275 183L274 197L260 190L255 204L241 198L232 211L217 202L206 215L191 204L177 213L166 201L151 206L144 194', width=2),
    path('wyrm-tail', 'M208 58L213 37L221 27L209 31L201 52', fill=INK),
    path('wyrm-scales', 'M124 156L134 150M130 172L140 164M151 183L156 173M173 187L176 176M196 188L196 176M219 184L215 174M245 175L239 166M263 163L254 157', width=1),
])
graphics['drake'] = plate('drake', 'Drake anatomy plate', 'A low, powerful four-legged dragon without wings.', [
    path('drake-body', 'M117 130L162 113L222 119L252 99L270 95L289 120L268 145L249 154L228 156L189 147L148 158L123 152L82 160L48 145L81 149Z', fill=INK),
    path('drake-head', 'M256 106L250 76L272 94L290 67L293 105L317 111L336 126L313 132L296 147L284 132L263 128Z', fill=INK),
    path('drake-eye', 'M300 116L313 122', stroke=STEEL, width=1.4),
    path('drake-four-legs', 'M129 143L128 176L111 193H134L147 159M163 143L174 180L159 194H180L193 153M228 146L224 180L211 194H234L247 152M263 139L279 178L267 193H292L294 151', fill=INK),
    path('drake-ridge', 'M127 127L133 106L147 119L160 95L173 116L189 99L202 119L218 105L229 125', fill=INK),
    path('drake-armour-lines', 'M143 134L152 144M158 130L168 140M173 130L183 141M191 133L200 142M211 134L220 144M238 124L249 135M253 115L264 127M126 167L133 167M275 168L283 166', stroke=STEEL, width=1.5),
])
graphics['dragon'] = plate('dragon', 'Dragon anatomy plate', 'Four legs and an independent pair of articulated wings.', [
    path('dragon-far-wing', 'M225 137L232 51L268 23L302 57L298 101L274 84L255 129Z', fill=STEEL),
    path('dragon-far-wing-bones', 'M225 137L268 23L274 84M268 23L298 101M232 51L255 129', width=1.5),
    path('dragon-near-wing', 'M227 145L182 72L124 29L67 65L91 115L105 93L139 145L155 121L184 164Z', fill=STEEL),
    path('dragon-near-wing-bones', 'M227 145L124 29L105 93M124 29L91 115M124 29L139 145M124 29L184 164M182 72L155 121'),
    path('dragon-body', 'M154 146L200 130L233 143L265 113L279 106L293 126L274 144L252 165L219 170L185 162L155 166L107 191L63 187L39 163L69 178L104 176Z', fill=INK),
    path('dragon-head', 'M274 116L267 85L290 105L311 77L308 116L327 122L346 137L324 140L310 155L299 139L281 137Z', fill=INK),
    path('dragon-eye', 'M311 127L324 133', stroke=STEEL, width=1.4),
    path('dragon-legs', 'M165 157L162 188L147 202H170L179 166M193 159L204 191L192 204H213L219 170M247 157L247 187L236 201H258L269 152M270 143L284 186L275 201H297L296 162', fill=INK),
    path('dragon-body-scales', 'M168 149L174 155M181 144L188 152M195 144L202 153M211 150L218 158M234 150L241 156M253 137L260 144M149 184L156 179', stroke=STEEL, width=1.5),
    path('dragon-wing-hatching', 'M99 65L90 77M108 57L98 72M116 51L107 66M145 86L133 98M155 99L145 111M172 122L162 134', width=.9),
])
graphics['amphiptere'] = plate('amphiptere', 'Amphiptere anatomy plate', 'A winged serpent whose body has no walking limbs.', [
    path('amphiptere-left-wing', 'M194 132L155 41L103 30L114 75L51 91L111 113L78 141L145 143L162 173Z', fill=STEEL),
    path('amphiptere-left-wing-bones', 'M194 132L103 30L111 113M155 41L114 75M114 75L51 91M114 75L145 143M114 75L162 173'),
    path('amphiptere-right-wing', 'M198 131L216 43L258 22L264 72L331 92L275 108L313 140L254 140L238 166Z', fill=STEEL),
    path('amphiptere-right-wing-bones', 'M198 131L258 22L275 108M216 43L264 72M264 72L331 92M264 72L254 140M264 72L238 166'),
    path('amphiptere-body', 'M215 72C210 91 185 120 193 144C205 174 256 178 254 197C252 218 169 221 124 193C99 176 76 183 53 206', width=12),
    path('amphiptere-engraving', 'M215 72C210 91 185 120 193 144C205 174 256 178 254 197C252 218 169 221 124 193C99 176 76 183 53 206', stroke=STEEL, width=1.4),
    path('amphiptere-head', 'M204 83L196 58L215 67L229 40L230 71L250 78L264 95L239 103L228 118L221 100L208 99Z', fill=INK),
    path('amphiptere-eye', 'M237 85L247 91', stroke=STEEL, width=1.4),
    path('amphiptere-tail', 'M59 202L34 212L45 192L66 191', fill=INK),
])
graphics['leviathan'] = plate('leviathan', 'Leviathan anatomy plate', 'An aquatic serpent with a dorsal crest and swimming fins.', [
    path('leviathan-body', 'M279 95C261 111 264 151 239 162C207 178 153 157 126 173C109 183 90 196 55 178', width=20),
    path('leviathan-body-engraving', 'M279 95C261 111 264 151 239 162C207 178 153 157 126 173C109 183 90 196 55 178', stroke=STEEL, width=2),
    path('leviathan-head', 'M268 103L262 74L282 84L303 61L299 94L319 95L345 113L322 124L306 139L294 120L274 122Z', fill=INK),
    path('leviathan-eye', 'M304 104L319 110', stroke=STEEL, width=1.4),
    path('leviathan-dorsal-crest', 'M268 129L235 102L239 139L207 120L212 157L179 133L181 156L152 140L154 156L123 150L126 165', fill=INK),
    path('leviathan-fins', 'M249 151L286 158L273 176L239 168M186 163L188 203L171 187L165 169M64 181L33 166L43 193L25 212L67 194Z', fill=INK),
    path('leviathan-fin-rays', 'M246 158L275 166M181 170L180 188M55 185L40 177M55 191L37 202', stroke=STEEL, width=1),
    path('leviathan-current-lines', 'M83 99C106 94 129 96 144 101M58 117C92 109 119 111 146 118M292 193C315 187 333 189 352 193M275 206C307 199 328 201 349 206', stroke='#626B77', width=1),
])
graphics['dragonoid'] = plate('dragonoid', 'Dragonoid anatomy plate', 'An upright dragon-human hybrid with horns, wings and a scaled torso.', [
    path('dragonoid-left-wing', 'M169 110L121 55L79 31L69 91L87 83L97 145L119 127L135 172L157 142Z', fill=STEEL),
    path('dragonoid-left-wing-bones', 'M169 110L79 31L87 83M79 31L97 145M121 55L119 127M121 55L135 172'),
    path('dragonoid-right-wing', 'M231 110L279 55L321 31L331 91L313 83L303 145L281 127L265 172L243 142Z', fill=STEEL),
    path('dragonoid-right-wing-bones', 'M231 110L321 31L313 83M321 31L303 145M279 55L281 127M279 55L265 172'),
    path('dragonoid-horned-head', 'M184 72L176 43L194 58L200 39L206 58L224 43L216 72L215 87L208 95H192L185 87Z', fill=INK),
    path('dragonoid-face', 'M187 76L195 79M213 76L205 79M200 83V91', stroke=STEEL, width=1.2),
    path('dragonoid-torso', 'M190 93L177 102L167 110L181 145L181 166L200 179L219 166L219 145L233 110L223 102L210 93Z', fill=INK),
    path('dragonoid-arms', 'M171 109L158 122L152 151L143 169L155 174L169 156L175 132M229 109L242 122L248 151L257 169L245 174L231 156L225 132', fill=INK),
    path('dragonoid-legs', 'M181 163L177 184L169 211H189L201 179L211 211H231L223 184L219 163Z', fill=INK),
    path('dragonoid-tail', 'M217 166C250 176 267 196 284 187L299 171L287 196C266 211 235 184 212 180', fill=INK),
    path('dragonoid-scale-armour', 'M180 113L200 123L220 113M184 124L200 133L216 124M187 135L200 144L213 135M190 146L200 154L210 146M187 161L200 169L213 161M182 186L185 193M217 186L220 193', stroke=STEEL, width=1.2),
])

for kind, markup in graphics.items():
    save(f'{kind}-plate', markup)


def literal(markup):
    return '`' + markup.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') + '`'


source = '// Original anatomy graphics and exact selected wordmark sword; previous concept artwork is preserved.\n'
source += f'export const blackFlameXml = {literal(black_flame)};\n\n'
source += f'export const wordmarkSwordXml = {literal(wordmark_sword)};\n\n'
source += 'export const dragonTypeGraphics = {\n'
source += ''.join(f'  {kind}: {literal(markup)},\n' for kind, markup in graphics.items())
source += '} as const;\n'
(ROOT / 'src/shared/landingArtwork.ts').write_text(source)
print('Saved landing sword, black flame and anatomy plates')
