'use client';
import { useRef, useState, useEffect } from 'react';
import Tree from '../tree';
import { TreeSettings } from '../../../utils/tree-settings-types';
import { useTreeAnimation } from './use-tree-animation';
import { useZoom } from './use-zoom';
import { useDrag } from './use-drag';

export default function TreeWindow({
  settings,
  isAnimating,
  currentLevel,
  setCurrentLevel,
  setLineCount,
  frameRate,
}: {
  settings: TreeSettings;
  isAnimating: boolean;
  currentLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
  setLineCount: React.Dispatch<React.SetStateAction<number>>;
  frameRate: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const lineCounterRef = useRef(0);

  const { offset, handleMouseDown, handleMouseMove, handleMouseUp } = useDrag();

  useZoom(containerRef, scale, setScale);
  useTreeAnimation({
    isAnimating,
    frameRate,
    maxLevel: settings.maxLevel,
    setCurrentLevel,
  });

  // Reset before frame render
  lineCounterRef.current = 0;

  // Set line count after render
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
