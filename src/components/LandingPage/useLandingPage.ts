import { useRef, useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from '../../shared/motion';
import { useDragonData } from '../../shared/dragonDataContext/useDragonData';

export const useLandingPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const catalogRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const data = useDragonData();
  const behavior = reducedMotion ? `auto` : `smooth`;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const update = () => {
      const headerHeight = page.querySelector<HTMLElement>(`#site-header`)?.offsetHeight ?? 0;
      const hero = heroRef.current;
      setScrolled(page.scrollTop > 12);
      setPastHero(hero ? page.scrollTop > hero.offsetTop + hero.offsetHeight - headerHeight : false);
    };
    update();
    page.addEventListener(`scroll`, update, { passive: true });
    window.addEventListener(`resize`, update);
    return () => {
      page.removeEventListener(`scroll`, update);
      window.removeEventListener(`resize`, update);
    };
  }, []);

  const submitSearch = useCallback(() => {
    const page = pageRef.current;
    const catalog = catalogRef.current;
    if (!page || !catalog) return;
    const headerHeight = page.querySelector<HTMLElement>(`#site-header`)?.offsetHeight ?? 0;
    page.scrollTo({ behavior, top: Math.max(0, catalog.offsetTop - headerHeight - 24) });
  }, [behavior]);

  const clearSearch = useCallback(() => {
    data.setQuery(``);
    searchRef.current?.focus({ preventScroll: true });
  }, [data.setQuery]);

  const scrollToTop = useCallback(() => {
    pageRef.current?.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return { ...data, heroRef, pageRef, searchRef, catalogRef, scrolled, pastHero, clearSearch, submitSearch, scrollToTop };
};
