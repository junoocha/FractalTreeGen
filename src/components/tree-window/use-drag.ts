import { useState } from 'react';

// `initial` sets the starting offset position of the content being dragged
export function useDrag(initial = { x: 600, y: 100 }) {
  // Whether dragging is in progress
  const [dragging, setDragging] = useState(false);

  // Current offset position of the dragged element
  const [offset, setOffset] = useState(initial);

  // Starting mouse position when drag begins
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  // Called when the mouse button is pressed down
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true); // Begin drag
    setStart({ x: e.clientX, y: e.clientY }); // Store where the mouse started
  };

  // Called as the mouse moves during drag
  const handleMouseMove = (e: React.MouseEvent) => {
    // Only proceed if currently dragging and start point is recorded
    if (!dragging || !start) return;

    // Calculate distance moved since last frame
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    // Update offset based on movement delta
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

    // Update start point to current mouse position
    setStart({ x: e.clientX, y: e.clientY });
  };

  // Called when mouse is released (or leaves container)
  const handleMouseUp = () => {
    setDragging(false); // End drag
    setStart(null); // Clear starting point
  };

  // Expose the current offset and mouse event handlers to consumer
  return {
    offset, // The amount of pan movement applied
    handleMouseDown, // Attach to onMouseDown
    handleMouseMove, // Attach to onMouseMove
    handleMouseUp, // Attach to onMouseUp and onMouseLeave
  };
}
