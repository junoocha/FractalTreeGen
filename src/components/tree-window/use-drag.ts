import { useState } from 'react';

export function useDrag(initial = { x: 600, y: 100 }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(initial);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStart(null);
  };

  return {
    offset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
