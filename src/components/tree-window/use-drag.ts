import { useRef, useState, useEffect } from 'react';

type Point = { x: number; y: number };

export function useDrag(initial = { x: 600, y: 100 }) {
  const [offset, setOffset] = useState<Point>(initial); // current drag offset
  const draggingRef = useRef(false); // tracks if drag is active
  const startRef = useRef<Point | null>(null); // initial pointer position

  const containerRef = useRef<HTMLDivElement | null>(null); // DOM element ref

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault(); // prevent scroll/text select
      el.setPointerCapture(e.pointerId); // lock pointer
      draggingRef.current = true;
      startRef.current = { x: e.clientX, y: e.clientY }; // store start point
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !startRef.current) return;

      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy })); // update offset
      startRef.current = { x: e.clientX, y: e.clientY }; // update start point
    };

    const handlePointerUp = (e: PointerEvent) => {
      try {
        el.releasePointerCapture(e.pointerId); // release pointer lock
      } catch {}
      draggingRef.current = false;
      startRef.current = null; // reset start point
    };

    // register events
    el.addEventListener('pointerdown', handlePointerDown, { passive: false });
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('pointercancel', handlePointerUp);
    el.addEventListener('pointerleave', handlePointerUp);

    // cleanup
    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('pointercancel', handlePointerUp);
      el.removeEventListener('pointerleave', handlePointerUp);
    };
  }, []);

  return {
    offset, // current x/y offset
    containerRef, // ref to attach to container element
  };
}
