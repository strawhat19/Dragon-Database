import type { LucideIconNode } from 'lucide-react';

export const filledHeaderIcons = true;

export type HeaderIconName =
  | `x`
  | `sun`
  | `user`
  | `code`
  | `mail`
  | `info`
  | `home`
  | `book`
  | `moon`
  | `menu`
  | `flame`
  | `search`
  | `newspaper`;

// Inherit the platform's fill; evenodd keeps detail cutouts transparent over the header.
const solidPath = (key: string, d: string): LucideIconNode[] => [
  [`path`, { d, key, stroke: `none`, fillRule: `evenodd` }],
];

export const filledHeaderIconNodes: Record<HeaderIconName, LucideIconNode[]> = {
  x: solidPath(
    `header-x-solid`,
    `M5.1 3.7 12 10.6l6.9-6.9 1.4 1.4L13.4 12l6.9 6.9-1.4 1.4L12 13.4l-6.9 6.9-1.4-1.4 6.9-6.9-6.9-6.9z`,
  ),
  sun: [
    [`circle`, { r: 5, cx: 12, cy: 12, stroke: `none`, key: `header-sun-center` }],
    [`path`, {
      fill: `none`,
      strokeWidth: 2,
      strokeLinecap: `round`,
      key: `header-sun-rays`,
      d: `M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41`,
    }],
  ],
  user: [
    [`circle`, { r: 5, cx: 12, cy: 8, stroke: `none`, key: `header-user-head` }],
    ...solidPath(`header-user-body`, `M20 21a8 8 0 0 0-16 0z`),
  ],
  code: solidPath(
    `header-code-solid`,
    `M8 5 10 7 5 12l5 5-2 2-7-7zM16 5l7 7-7 7-2-2 5-5-5-5z`,
  ),
  mail: solidPath(
    `header-mail-solid`,
    `M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM4 6.8l8 5.3 8-5.3v2l-8 5.3-8-5.3z`,
  ),
  info: solidPath(
    `header-info-solid`,
    `M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM10.75 10h2.5v7h-2.5z`,
  ),
  home: solidPath(
    `header-home-solid`,
    `M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM10 12h4a1 1 0 0 1 1 1v8H9v-8a1 1 0 0 1 1-1z`,
  ),
  book: solidPath(
    `header-book-solid`,
    `M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2zM11 5h2v16h-2z`,
  ),
  moon: solidPath(
    `header-moon-solid`,
    `M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401z`,
  ),
  menu: solidPath(
    `header-menu-solid`,
    `M4 3.5h16a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zM4 10.5h16a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zM4 17.5h16a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3z`,
  ),
  flame: solidPath(
    `header-flame-solid`,
    `M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4z`,
  ),
  search: [
    ...solidPath(
      `header-search-lens`,
      `M10.5 2a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM10.5 5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z`,
    ),
    ...solidPath(`header-search-handle`, `M15 17l5 5a1.414 1.414 0 0 0 2-2l-5-5z`),
  ],
  newspaper: solidPath(
    `header-newspaper-solid`,
    `M8 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zM4 11h2v9a1 1 0 0 1-2 0zM10 6h8v4h-8zM10 13h8v2h-8zM10 17h5v2h-5z`,
  ),
};
