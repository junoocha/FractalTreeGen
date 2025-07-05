import { useEffect, RefObject } from 'react';

export function useZoom(
  ref: RefObject<HTMLElement | null>,
  scale: number,
  setScale: (val: number) => void
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScale = Math.max(0.1, scale - e.deltaY * 0.001);
      setScale(newScale);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [ref, scale, setScale]);
}
