'use client';

import { useEffect, useState, RefObject } from 'react';
import Branch from './create-branch';
import type { TreeSettings } from '../../utils/tree-settings-types';

// include tree drawing parameters and animation state
export default function Tree({
  currentAnimationLevel, // current depth of animation (used to animate levels)
  branchesPerLevel, // number of child branches per node

  initialLength, // length of the root branch
  initialWidth, // thickness of the root branch
  branchAngle,

  scale, // scale factor for decreasing length/width each level

  leafSize,
  leafColor,

  maxLevel, // total recursion depth
  countRef, // mutable ref for tracking line/branch counts

  branchColor, // color of the branches
}: TreeSettings & {
  currentAnimationLevel: number; // limits how deep the recursion draws
  countRef: RefObject<number>; // line count tracker
  branchColor: string;
}) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  // Set a fixed origin point for the tree on mount
  useEffect(() => {
    setOrigin({ x: -420, y: 200 }); // Coordinates from which the tree grows upward
  }, []);

  // Don't render until origin is initialized
  if (!origin) return null;

  return (
    <Branch
      curLevel={0} // Start at level 0 (root)
      maxLevel={maxLevel} // Limit depth to maxLevel
      length={initialLength}
      width={initialWidth}
      angle={0} // Root branch is vertical (0°)
      x={origin.x} // Start drawing from the origin point
      y={origin.y}
      scale={scale}
      branchAngle={branchAngle} // Angle to spread child branches
      branchesPerLevel={branchesPerLevel}
      leafSize={leafSize}
      leafColor={leafColor}
      branchColor={branchColor}
      currentAnimationLevel={currentAnimationLevel} // Animation control
      countRef={countRef} // Used to count rendered branches/lines
    />
  );
}
