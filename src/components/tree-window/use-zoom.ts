import { useEffect, RefObject } from 'react';

export function useZoom(
  ref: RefObject<HTMLElement | null>, // Reference to the container element
  scale: number, // Current zoom scale
  setScale: (val: number) => void // Setter function to update scale
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return; // Exit if ref is not attached yet

    // Wheel event handler to zoom in/out
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default page scroll on wheel

      // Adjust scale based on scroll direction (deltaY)
      // Scroll down increases deltaY → zoom out
      // Scroll up decreases deltaY → zoom in
      const newScale = Math.max(0.1, scale - e.deltaY * 0.001); // Clamp to min 0.1
      setScale(newScale); // Update zoom level
    };

    // Attach the wheel event listener to the element
    el.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup the listener on unmount or ref/scale change
    return () => el.removeEventListener('wheel', handleWheel);
  }, [ref, scale, setScale]);
}
