from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def badge_svg(mark, mark_size, name):
    mark_offset = (1024 - mark_size) // 2
    placed_mark = mark.replace(
        '<svg ',
        f'<svg x="{mark_offset}" y="{mark_offset}" width="{mark_size}" height="{mark_size}" ',
        1,
    )
    grain = '\n'.join(
        f'    <path id="{name}-grain-{index}" d="M24 {y}H1000" />'
        for index, y in enumerate(range(32, 1000, 8))
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
  <title>Dragon Database steel badge</title>
  <desc>The swordmaw mark with a muted-red dragon eye and subtle blade smears on the original rounded brushed-silver badge.</desc>
  <defs>
    <linearGradient id="{name}-steel" x1="160" y1="24" x2="864" y2="1000" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BEC6D0" />
      <stop offset=".22" stop-color="#E8EBEF" />
      <stop offset=".42" stop-color="#F4F5F7" />
      <stop offset=".57" stop-color="#BEC6D0" />
      <stop offset=".8" stop-color="#E8EBEF" />
      <stop offset="1" stop-color="#AAB3BF" />
    </linearGradient>
    <linearGradient id="{name}-rim" x1="150" y1="32" x2="874" y2="992" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F4F5F7" />
      <stop offset=".4" stop-color="#C7CDD5" />
      <stop offset="1" stop-color="#626B77" />
    </linearGradient>
    <clipPath id="{name}-badge-clip">
      <rect x="24" y="24" width="976" height="976" rx="176" />
    </clipPath>
  </defs>
  <rect id="{name}-badge" x="24" y="24" width="976" height="976" rx="176" fill="url(#{name}-steel)" stroke="url(#{name}-rim)" stroke-width="8" />
  <g id="{name}-brushed-grain" clip-path="url(#{name}-badge-clip)" stroke="#626B77" stroke-width="1" opacity=".1">
{grain}
  </g>
  <rect id="{name}-inner-rim" x="40" y="40" width="944" height="944" rx="160" stroke="#F4F5F7" stroke-width="3" opacity=".65" />
  <g id="{name}-dragon-mark">
    {placed_mark}
  </g>
</svg>
'''


def create_icon_badges():
    mark = (ROOT / 'assets/brand/mark.svg').read_text()
    for name, mark_size in [('app-icon', 736), ('adaptive-icon', 600)]:
        markup = badge_svg(mark, mark_size, name)
        for directory in [ROOT / 'assets/brand', ROOT / 'public/brand']:
            directory.mkdir(parents=True, exist_ok=True)
            (directory / f'{name}.svg').write_text(markup)


if __name__ == '__main__':
    create_icon_badges()
    print('Saved steel badge SVG icons')
