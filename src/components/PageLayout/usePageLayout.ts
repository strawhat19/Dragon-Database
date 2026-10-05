import { useReducedMotion } from '../../shared/motion';
import { useCallback, useEffect, useRef, useState } from 'react';

export const usePageLayout = (id: string) => {
  const heroRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    page.scrollTop = 0;

    const header = page.querySelector<HTMLElement>(`#site-header`);
    const update = () => {
      const hero = heroRef.current;
      const headerHeight = header?.offsetHeight ?? 0;
      setScrolled(page.scrollTop > 12);
      setPastHero(hero ? page.scrollTop > hero.offsetTop + hero.offsetHeight - headerHeight : false);
    };
    const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(update);
    if (header) observer?.observe(header);
    if (heroRef.current) observer?.observe(heroRef.current);
    update();
    page.addEventListener(`scroll`, update, { passive: true });
    window.addEventListener(`resize`, update);

    return () => {
      observer?.disconnect();
      page.removeEventListener(`scroll`, update);
      window.removeEventListener(`resize`, update);
    };
  }, [id]);

  const scrollToTop = useCallback(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: reducedMotion ? `auto` : `smooth` });
  }, [reducedMotion]);

  return { heroRef, pageRef, scrolled, pastHero, scrollToTop };
};

export default usePageLayout;
