'use client';
import { useEffect, useState, RefObject } from 'react';
import Branch from './create-branch';
import type { TreeSettings } from '../../utils/tree-settings-types';

export default function Tree({
  currentAnimationLevel,
  branchesPerLevel,
  initialLength,
  initialWidth,
  branchAngle,
  scale,
  leafSize,
  leafColor,
  maxLevel,
  countRef,
  branchColor,
}: TreeSettings & {
  currentAnimationLevel: number;
  countRef: RefObject<number>;
  branchColor: string;
}) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setOrigin({ x: 400, y: 500 }); // relative center
  }, []);

  if (!origin) return null;

  return (
    <Branch
      curLevel={0}
      maxLevel={maxLevel}
      length={initialLength}
      width={initialWidth}
      angle={0}
      x={origin.x}
      y={origin.y}
      scale={scale}
      branchAngle={branchAngle}
      branchesPerLevel={branchesPerLevel}
      leafSize={leafSize}
      leafColor={leafColor}
      branchColor={branchColor}
      currentAnimationLevel={currentAnimationLevel}
      countRef={countRef}
    />
  );
}
