import { useRef, useState, useEffect } from 'react';

type Point = { x: number; y: number };

export function useDrag(initial = { x: 600, y: 100 }) {
  const [offset, setOffset] = useState<Point>(initial);
  const draggingRef = useRef(false);
  const startRef = useRef<Point | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      startRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !startRef.current) return;

      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      draggingRef.current = false;
      startRef.current = null;
    };

    // Register events with passive: false for pointerdown to block default touch scroll
    el.addEventListener('pointerdown', handlePointerDown, { passive: false });
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('pointercancel', handlePointerUp);
    el.addEventListener('pointerleave', handlePointerUp);

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('pointercancel', handlePointerUp);
      el.removeEventListener('pointerleave', handlePointerUp);
    };
  }, []);

  return {
    offset,
    containerRef, // use this to attach to the DOM element
  };
}
