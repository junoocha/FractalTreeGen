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
  frameRate: number;
  maxLevel: number;
};

export default function TreeWindow({
  settings,
  isAnimating,
  currentLevel,
  setCurrentLevel,
}: {
  settings: TreeSettings;
  isAnimating: boolean;
  currentLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 350, y: 0 });
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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.1, scale - e.deltaY * 0.001);
    setScale(newScale);
  };

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

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
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
        <Tree currentAnimationLevel={currentLevel} {...settings} />
      </div>
    </div>
  );
}
