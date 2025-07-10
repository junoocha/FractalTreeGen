import { useEffect, RefObject, useRef } from 'react';

export function useZoom(
  ref: RefObject<HTMLElement | null>,
  scale: number,
  setScale: (val: number) => void
) {
  const pointers = useRef<Map<number, PointerEvent>>(new Map());
  const lastDistance = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wheel zoom (desktop)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScale = Math.max(0.1, scale - e.deltaY * 0.001);
      setScale(newScale);
    };

    // Utility to get distance between two points
    const getDistance = (p1: PointerEvent, p2: PointerEvent) => {
      const dx = p2.clientX - p1.clientX;
      const dy = p2.clientY - p1.clientY;
      return Math.hypot(dx, dy);
    };

    // Pointer down - add to map
    const handlePointerDown = (e: PointerEvent) => {
      pointers.current.set(e.pointerId, e);
      if (pointers.current.size === 2) {
        // When two pointers are down, reset lastDistance
        const [p1, p2] = Array.from(pointers.current.values());
        lastDistance.current = getDistance(p1, p2);
      }
    };

    // Pointer move - update pointer in map and handle pinch zoom
    const handlePointerMove = (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, e);

      if (pointers.current.size === 2) {
        const [p1, p2] = Array.from(pointers.current.values());
        const currentDistance = getDistance(p1, p2);

        if (lastDistance.current != null) {
          const distanceDelta = currentDistance - lastDistance.current;
          // Adjust zoom scale based on pinch distance change
          // Tune sensitivity as needed, e.g., multiply by 0.005
          const newScale = Math.min(
            5,
            Math.max(0.1, scale + distanceDelta * 0.005)
          );
          setScale(newScale);
        }

        lastDistance.current = currentDistance;
      }
    };

    // Pointer up / cancel - remove pointer from map
    const handlePointerUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) {
        lastDistance.current = null;
      }
    };

    // Add event listeners
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('pointercancel', handlePointerUp);
    el.addEventListener('pointerleave', handlePointerUp);

    // Cleanup
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('pointercancel', handlePointerUp);
      el.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [ref, scale, setScale]);
}
