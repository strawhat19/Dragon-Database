import './styles.scss';
import { useRef, useState, useEffect } from 'react';
import type { DragonExampleLightboxProps } from './types';
import { useReducedMotion } from '../../shared/motion';
import DragonExampleDetailView from '../DragonExampleDetailView';

const DragonExampleLightbox = ({ id, example, examples, onSelect, onClose }: DragonExampleLightboxProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeRef = useRef(onClose);
  const reducedMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const open = Boolean(example);
  closeRef.current = onClose;
  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scroller = element.closest<HTMLElement>(`.page-layout`);
    const overflow = scroller?.style.overflowY ?? ``;
    if (scroller) scroller.style.overflowY = `hidden`;
    setClosing(false);
    element.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (element.open) element.close();
      if (scroller) scroller.style.overflowY = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => {
    const element = dialog.current;
    element?.scrollTo({ top: 0 });
    if (element?.open && !element.contains(document.activeElement)) {
      (element.querySelector<HTMLElement>(`.dragon-example-detail__close`) ?? element).focus({ preventScroll: true });
    }
  }, [example?.id]);
  const close = () => {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(() => closeRef.current(), reducedMotion ? 0 : 180);
  };
  return (
    <dialog
      id={id}
      ref={dialog}
      tabIndex={-1}
      aria-label={example ? `${example.name} Details` : `Dragon Example Details`}
      className={`dragon-example-lightbox${closing ? ` is-closing` : ``}`}
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      }}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey || examples.length < 2 || closing) return;
        if ((event.target as HTMLElement).closest(`video, iframe, input, textarea, select, [role='tablist'], [contenteditable='true']`)) return;
        const step = event.key === `ArrowLeft` ? -1 : event.key === `ArrowRight` ? 1 : 0;
        if (!step) return;
        event.preventDefault();
        const index = examples.findIndex(item => item.id === example?.id);
        const next = examples[(index + step + examples.length) % examples.length];
        if (next) onSelect(next.id);
      }}
    >
      {example ? <DragonExampleDetailView id={`${id}-details`} modal example={example} examples={examples} onSelect={onSelect} onClose={close} /> : null}
    </dialog>
  );
};
export default DragonExampleLightbox;
