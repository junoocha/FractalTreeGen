'use client';
import { useEffect, useRef, useState } from 'react';
import Tree from './tree';

export type TreeSettings = {
  branchesPerLevel: number;
  initialLength: number;
  initialWidth: number;
  branchAngle: number;
  scale: number;
  leafSize: number;
  leafColor: string;
  branchColor: string;
  frameRate: number;
  maxLevel: number;
};

export default function TreeWindow({
  settings,
  isAnimating,
  currentLevel,
  setCurrentLevel,
  setLineCount,
}: {
  settings: TreeSettings;
  isAnimating: boolean;
  currentLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
  setLineCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 600, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentLevel((prev) => {
        if (prev >= settings.maxLevel) {
          clearInterval(interval); // stop if max reached
          return prev;
        }
        return prev + 1;
      });
    }, settings.frameRate);

    // Clean up interval on pause or unmount
    return () => clearInterval(interval);
  }, [isAnimating, settings.frameRate, settings.maxLevel]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScale = Math.max(0.1, scale - e.deltaY * 0.001);
      setScale(newScale);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [scale]);

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

  const lineCounterRef = useRef(0);

  // Reset counter before each render cycle (or animation frame)
  lineCounterRef.current = 0;

  // Update parent's line count after branches have rendered
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLineCount(lineCounterRef.current);
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentLevel, setLineCount]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full overflow-hidden bg-[#eef6ec] cursor-grab"
      style={{ userSelect: 'none' }}
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Tree
          currentAnimationLevel={currentLevel}
          countRef={lineCounterRef}
          {...settings}
        />
      </div>
    </div>
  );
}
