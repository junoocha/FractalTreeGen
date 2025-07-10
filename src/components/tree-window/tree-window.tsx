'use client';

import { useRef, useState, useEffect } from 'react';
import Tree from '../tree';
import { TreeSettings } from '../../../utils/tree-settings-types';
import { useTreeAnimation } from './use-tree-animation';
import { useZoom } from './use-zoom';
import { useDrag } from './use-drag';

export default function TreeWindow({
  settings, // Snapshot of settings to render the tree with
  isAnimating, // Whether animation is active
  currentLevel, // Current depth level of tree being animated
  setCurrentLevel,
  setLineCount, // Setter to record number of lines rendered
  frameRate, // Delay between frames (ms)
}: {
  settings: TreeSettings;
  isAnimating: boolean;
  currentLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
  setLineCount: React.Dispatch<React.SetStateAction<number>>;
  frameRate: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null); // Used to attach scroll/zoom behavior
  const [scale, setScale] = useState(1); // Scale state for zooming in/out

  // Mutable ref to track how many lines are drawn during this render cycle
  const lineCounterRef = useRef(0);

  // Get drag/pan offset and handlers from custom hook
  const { offset, handleMouseDown, handleMouseMove, handleMouseUp } = useDrag();

  // Apply scroll-to-zoom functionality to container
  useZoom(containerRef, scale, setScale);

  // Run the animation hook which increments the animation level on a timer
  useTreeAnimation({
    isAnimating,
    frameRate,
    maxLevel: settings.maxLevel,
    setCurrentLevel,
  });

  // Reset the line counter before each render
  lineCounterRef.current = 0;

  // After render, capture the updated line count from the ref and push to state
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLineCount(lineCounterRef.current);
    }, 0); // Run after paint
    return () => clearTimeout(timeout); // Clean up to prevent memory leaks
  }, [currentLevel, setLineCount]);

  return (
    <div
      ref={containerRef} // Attach zoom/scroll behavior
      onMouseDown={handleMouseDown} // Start drag
      onMouseMove={handleMouseMove} // Continue drag
      onMouseUp={handleMouseUp} // Stop drag (user releases mouse)
      onMouseLeave={handleMouseUp} // Also stop if mouse leaves the area
      className="relative w-full h-full overflow-hidden bg-[#eef6ec] cursor-grab"
      style={{ userSelect: 'none' }} // Prevent text selection while dragging
    >
      <div
        style={{
          // Apply current zoom and drag position
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Render the tree with current animation level and line-count tracking */}
        <Tree
          currentAnimationLevel={currentLevel} // Max level to draw
          countRef={lineCounterRef} // Mutable ref to track number of lines
          {...settings} // Spread all visual configuration
        />
      </div>
    </div>
  );
}
