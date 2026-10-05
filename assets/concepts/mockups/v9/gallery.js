const sticky = true;
const concepts = [
  {
    id: `search-in-steel`,
    name: `Search in Steel`,
    stem: `01-search-in-steel`,
  },
];

const formats = {
  mobile: { width: 390, height: 844, label: `Mobile` },
  desktop: { width: 1440, height: 900, label: `Desktop` },
};

const elements = {
  stage: document.querySelector(`#gallery-stage`),
  header: document.querySelector(`#gallery-header`),
  image: document.querySelector(`#gallery-preview-image`),
  title: document.querySelector(`#gallery-concept-title`),
  overview: document.querySelector(`#gallery-overview`),
  scrollTop: document.querySelector(`#gallery-scroll-top`),
  svgDownload: document.querySelector(`#gallery-download-svg`),
  pngDownload: document.querySelector(`#gallery-download-png`),
  status: document.querySelector(`#gallery-preview-status`),
  previewLink: document.querySelector(`#gallery-preview-link`),
  year: document.querySelector(`#gallery-copyright-year`),
  summary: document.querySelector(`#gallery-selection-summary`),
};

const conceptButtons = document.querySelectorAll(`.gallery-concept-button`);
const viewportButtons = document.querySelectorAll(`.gallery-viewport-button`);
const reducedMotion = window.matchMedia?.(`(prefers-reduced-motion: reduce)`);
let activeConcept = concepts[0]?.id;
let activeViewport = `desktop`;

const updateDownload = (link, filename, label) => {
  link?.setAttribute(`href`, `./${filename}`);
  link?.setAttribute(`download`, filename);
  link?.setAttribute(`aria-label`, label);
};

const finishImageLoad = (available) => {
  elements.stage?.classList.remove(`is-loading`);
  if (elements.status) elements.status.hidden = available;
};

const updateSelection = (conceptId = activeConcept, viewportId = activeViewport) => {
  const concept = concepts.find((item) => item.id === conceptId) ?? concepts[0];
  const viewport = viewportId === `mobile` ? `mobile` : `desktop`;
  const format = formats[viewport];
  if (!concept || !format) return;
  if (concept.id === activeConcept && viewport === activeViewport) return;

  activeConcept = concept.id;
  activeViewport = viewport;
  const stem = `${concept.stem}-${viewport}`;

  if (elements.stage) {
    elements.stage.dataset.viewport = viewport;
    elements.stage.classList.add(`is-loading`);
  }
  if (elements.status) elements.status.hidden = true;
  if (elements.title) elements.title.textContent = concept.name;
  if (elements.summary) {
    elements.summary.textContent = `${format.label} / ${format.width} × ${format.height} / Static Design Study`;
  }

  elements.image?.setAttribute(`alt`, `${concept.name} ${viewport} hero mockup for Dragon Database, a static design study`);
  elements.image?.setAttribute(`width`, String(format.width));
  elements.image?.setAttribute(`height`, String(format.height));
  elements.image?.setAttribute(`src`, `./${stem}.svg`);
  elements.previewLink?.setAttribute(`href`, `./${stem}.svg`);
  elements.previewLink?.setAttribute(`aria-label`, `Open ${concept.name} ${viewport} hero mockup at full size`);

  updateDownload(elements.svgDownload, `${stem}.svg`, `Download ${concept.name} ${viewport} SVG`);
  updateDownload(elements.pngDownload, `${stem}.png`, `Download ${concept.name} ${viewport} PNG`);
  conceptButtons?.forEach((button) => {
    button.setAttribute(`aria-pressed`, String(button.dataset?.concept === activeConcept));
  });
  viewportButtons?.forEach((button) => {
    button.setAttribute(`aria-pressed`, String(button.dataset?.viewport === activeViewport));
  });
};

const updateScrollState = () => {
  const overviewBottom = elements.overview?.getBoundingClientRect()?.bottom ?? 0;
  const showScrollTop = window.scrollY > 0 && overviewBottom < 72;
  elements.header?.classList.toggle(`is-scrolled`, window.scrollY > 12);
  elements.scrollTop?.classList.toggle(`is-visible`, showScrollTop);
  elements.scrollTop?.setAttribute(`aria-hidden`, String(!showScrollTop));
  if (elements.scrollTop) elements.scrollTop.tabIndex = showScrollTop ? 0 : -1;
};

conceptButtons?.forEach((button) => {
  button.addEventListener(`click`, () => updateSelection(button.dataset?.concept, activeViewport));
});

viewportButtons?.forEach((button) => {
  button.addEventListener(`click`, () => updateSelection(activeConcept, button.dataset?.viewport));
});

elements.image?.addEventListener(`load`, () => finishImageLoad(true));
elements.image?.addEventListener(`error`, () => finishImageLoad(false));
elements.scrollTop?.addEventListener(`click`, () => {
  window.scrollTo({ top: 0, behavior: reducedMotion?.matches ? `auto` : `smooth` });
});

elements.header?.setAttribute(`data-sticky`, String(sticky));
if (elements.year) elements.year.textContent = String(new Date().getFullYear());
window.addEventListener(`scroll`, updateScrollState, { passive: true });
window.addEventListener(`resize`, updateScrollState);
updateScrollState();
