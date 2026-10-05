export const routes = {
  home: { path: `/`, label: `Dragon Database`, icon: `home` },
  about: { path: `/about`, label: `About`, icon: `info` },
  contact: { path: `/contact`, label: `Contact`, icon: `mail` },
} as const;

export const routeAliases = {
  [`/info`]: routes.about.path,
  [`/aboutus`]: routes.about.path,
  [`/company`]: routes.about.path,
  [`/aboutme`]: routes.about.path,
  [`/about-us`]: routes.about.path,
  [`/about-me`]: routes.about.path,
  [`/contactme`]: routes.contact.path,
  [`/contactus`]: routes.contact.path,
  [`/getintouch`]: routes.contact.path,
  [`/contact-me`]: routes.contact.path,
  [`/contact-us`]: routes.contact.path,
  [`/get-in-touch`]: routes.contact.path,
} as const;

export const resolveRouteAlias = (path: string) => Object.hasOwn(routeAliases, path)
  ? routeAliases[path as keyof typeof routeAliases]
  : null;

export const navigation = [
  { id: `dragons`, path: routes.home.path, label: `Dragons`, icon: `compass`, available: true },
  { id: `collections`, path: ``, label: `Collections`, icon: `bookmark`, available: false },
  { id: `lore`, path: ``, label: `Lore`, icon: `book`, available: false },
  { id: `api`, path: ``, label: `API`, icon: `code`, available: false },
  { id: `blog`, path: ``, label: `Blog`, icon: `newspaper`, available: false },
  { id: `about`, ...routes.about, available: true },
  { id: `contact`, ...routes.contact, available: true },
] as const;
