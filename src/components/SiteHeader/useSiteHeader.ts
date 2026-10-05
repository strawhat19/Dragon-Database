import { useEffect, useState } from 'react';

export const useSiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === `Escape`) setMenuOpen(false);
    };
    document.addEventListener(`keydown`, dismiss);
    return () => document.removeEventListener(`keydown`, dismiss);
  }, []);
  return { menuOpen, setMenuOpen };
};
