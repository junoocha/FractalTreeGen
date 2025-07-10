'use client';

import { useMemo } from 'react';
import Line from './line';
import Leaf from './leaf';
import {
  generateChildBranches,
  generateLeafSpots,
} from '../../utils/branch-utils';

export type BranchProps = {
  curLevel: number; // Current level in the branch hierarchy
  maxLevel: number; // Maximum depth to grow to

  length: number; // Length of the branch
  width: number; // Width (thickness) of the branch
  angle: number; // Angle at which this branch grows

  x: number; // X-coordinate starting position
  y: number; // Y-coordinate starting position

  scale: number; // Scale factor for child branches

  branchAngle: number; // Spread angle between branches
  branchesPerLevel: number; // Number of child branches per node

  leafSize: number; // Size of leaf elements
  leafColor: string; // Color of leaves

  branchColor: string; // Color of branches

  currentAnimationLevel: number; // Current animated depth level
  countRef: React.RefObject<number>; // Ref to keep track of drawn line count
};

// recursive component to render one branch and its descendants
export default function Branch(props: BranchProps) {
  const {
    curLevel,
    maxLevel,
    length,
    width,
    angle,
    x,
    y,
    scale,
    branchAngle,
    branchesPerLevel,
    leafSize,
    leafColor,
    branchColor,
    currentAnimationLevel,
    countRef,
  } = props;

  // Convert angle from degrees to radians
  const rad = (angle * Math.PI) / 180;

  // Calculate the end point of the current branch
  const endX = x + Math.sin(rad) * length;
  const endY = y - Math.cos(rad) * length;

  // Pre-calculate leaf positions using memoization (expensive operation)
  const leafSpots = useMemo(
    () => generateLeafSpots(x, y, length, rad),
    [x, y, length, rad]
  );

  // Pre-calculate all child branches using memoization
  const children = useMemo(
    () =>
      generateChildBranches({
        ...props, // Spread parent props
        x: endX, // Start children at end of current branch
        y: endY,
        curLevel: curLevel + 1,
        length: length * scale, // Scale down length for child branches
        width: width * 0.7, // Make child branches thinner
      }),
    [
      curLevel,
      maxLevel,
      length,
      width,
      angle,
      x,
      y,
      scale,
      branchAngle,
      branchesPerLevel,
      leafSize,
      leafColor,
      branchColor,
      currentAnimationLevel,
      countRef,
    ]
  );

  // Stop rendering if branch is beyond animation or depth limits
  if (curLevel > currentAnimationLevel || curLevel > maxLevel) return null;

  // Increment the line count reference (for external tracking)
  if (countRef.current != null) {
    countRef.current += 1;
  }

  return (
    <>
      {/* Draw the current branch line */}
      <Line
        length={length}
        angle={angle}
        width={width}
        color={branchColor}
        style={{
          left: x,
          top: y - length, // Position is offset by length to anchor at base
        }}
      />

      {/* Draw leaves only for branches deeper than level 1 */}
      {curLevel > 1 &&
        leafSpots.map((spot, i) => (
          <Leaf
            key={`leaf-${curLevel}-${i}`}
            x={spot.x}
            y={spot.y}
            size={leafSize}
            color={leafColor}
          />
        ))}

      {/* Recursively render child branches */}
      {children.map((child, i) => (
        <Branch
          key={`${child.curLevel}-${child.angle}-${child.x}-${child.y}-${i}`}
          {...child}
        />
      ))}
    </>
  );
}
