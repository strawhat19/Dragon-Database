import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../themeContext/ThemeContext';

const backgroundLuminance = (element: Element) => {
  let opacity = 0;
  const color = [0, 0, 0];
  let current: Element | null = element;
  while (current && opacity < 1) {
    const channels = getComputedStyle(current).backgroundColor.match(/[\d.]+/g)?.map(Number);
    const alpha = channels?.[3] ?? 1;
    if (channels && channels.length >= 3) {
      const contribution = alpha * (1 - opacity);
      color.forEach((_, index) => { color[index] += channels[index] * contribution; });
      opacity += contribution;
    }
    current = current.parentElement;
  }
  const linear = color.map(channel => {
    const value = (channel + 255 * (1 - opacity)) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

export const useScrollTopContrast = () => {
  const { mode } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [lightButton, setLightButton] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const page = button?.parentElement;
    if (!button || !page) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = button.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const backdrop = document.elementsFromPoint(x, y).find(element => !button.contains(element));
      if (!backdrop) return;
      const luminance = backgroundLuminance(backdrop);
      // Separate thresholds keep mid-tone backgrounds from rapidly flipping the colors.
      setLightButton(previous => luminance < (previous ? 0.2 : 0.16));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(schedule);
    observer?.observe(page);
    page.querySelectorAll(`section`).forEach(section => observer?.observe(section));
    schedule();
    page.addEventListener(`load`, schedule, true);
    page.addEventListener(`transitionend`, schedule);
    page.addEventListener(`scroll`, schedule, { passive: true });
    window.addEventListener(`resize`, schedule);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      page.removeEventListener(`load`, schedule, true);
      page.removeEventListener(`scroll`, schedule);
      page.removeEventListener(`transitionend`, schedule);
      window.removeEventListener(`resize`, schedule);
    };
  }, [mode]);

  return { buttonRef, lightButton };
};
