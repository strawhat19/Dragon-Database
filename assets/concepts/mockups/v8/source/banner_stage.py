from banner import flame_cluster, flying_dragon
from materials import group, metal


def steel_stage(art, x, y, width, height, mobile=False, span=None, flame_height=None):
    art.counter += 1
    name = f'fullbleed-steel-hero-{art.counter}'
    group(art, name, 'Full-bleed steel hero banner with black flames and flying dragons')
    metal(art, x, y, width, height, name=f'{name}-brushed-steel')
    span = span if span is not None else 42 if mobile else 188
    flame_height = flame_height if flame_height is not None else 66 if mobile else 116
    flame_y = y + height - flame_height - 2
    for side, origin, mirrored in [
        ('left', x + 2, False),
        ('right', x + width - span - 2, True),
    ]:
        flame_cluster(art, f'{name}-{side}-curling-flames', origin, flame_y, span, flame_height, mirrored=mirrored)
        flights = [(0.45, -18, 17)] if mobile else [(0.16, -8, 28), (0.4, -24, 25), (0.78, -29, 27)]
        for index, (offset, vertical_offset, dragon_width) in enumerate(flights):
            flight_x = origin + span * (1 - offset) - dragon_width if mirrored else origin + span * offset
            flying_dragon(art, f'{name}-{side}-flying-dragon-{index}', flight_x, flame_y + vertical_offset, dragon_width, mirrored=mirrored)
    art.add('</g>')
