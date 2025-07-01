'use client'; // Ensures this component runs on the client (important for DOM access and rendering)

import { useMemo } from 'react';
import Line from './line';

export type BranchParams = {
  curLevel: number;
  maxLevel: number;
  length: number;
  width: number;
  angle: number;
  x: number;
  y: number;
  scale: number;
  branchAngle: number;
  branchesPerLevel: number;
  leafSize: number;
  leafColor: string;
  currentAnimationLevel: number;
};

export default function Branch({
  // for depth of recursion
  curLevel,
  maxLevel,

  // stuff for each branch
  length,
  width,
  angle,
  x,
  y,

  // branch stuff to change things
  scale, // multiplier to reduce branch size per curLevel
  branchAngle, // total angle range spread for children
  branchesPerLevel, // number of child branches to create

  // leaf stuff
  leafSize,
  leafColor,

  // current frame-curLevel for staggered animation
  currentAnimationLevel,
}: BranchParams) {
  const rad = (angle * Math.PI) / 180; // Convert angle to radians for trig functions

  // calculate the end point of the current branch using trig calculations
  const endX = x + Math.sin(rad) * length;
  const endY = y - Math.cos(rad) * length; // ok for some reason, going up decreases y so i have to go subtract

  const leafSpots = useMemo(() => {
    return Array.from({ length: 2 }).map(() => {
      const p = Math.random(); // position along branch (0 to 1)

      // base point on the branch line
      const baseX = x + Math.sin(rad) * length * p;
      const baseY = y - Math.cos(rad) * length * p;

      // perpendicular angle (90 degrees from branch)
      const perpAngle = rad + Math.PI / 2;

      // smaller offset to partially overlap the branch
      const offsetDistance = Math.random() * leafSize * 1.5;

      // randomly decide if offset goes left or right (positive or negative)
      const direction = Math.random() < 0.5 ? -1 : 1;

      const offsetX = baseX + Math.cos(perpAngle) * offsetDistance * direction;
      const offsetY = baseY + Math.sin(perpAngle) * offsetDistance * direction;

      return { x: offsetX, y: offsetY };
    });
  }, [x, y, length, rad, leafSize]);

  // generate children only once using useMemo to avoid re-render
  const children = useMemo(() => {
    if (curLevel >= maxLevel) return [];

    // determine angle step between branches, evenly spread across branchAngle
    const angleStep =
      branchesPerLevel > 1 ? branchAngle / (branchesPerLevel - 1) : 0;

    // return an array of child branches with updated parameters
    return Array.from({ length: branchesPerLevel }).map((_, i) => {
      const offset = -branchAngle / 2 + i * angleStep; // center children around parent angle
      const newAngle = angle + offset; // each child's angle offset from parent

      return {
        curLevel: curLevel + 1, // increase recursion curLevel
        maxLevel,
        length: length * scale, // shorten length using scale
        width: width * 0.7, // thinner width for child
        angle: newAngle,
        x: endX, // child starts at the end of this branch
        y: endY,
        scale,
        branchAngle,
        branchesPerLevel,
        leafSize,
        leafColor,
        currentAnimationLevel,
      };
    });
  }, [
    curLevel,
    endX,
    endY,
    length,
    width,
    angle,
    scale,
    branchAngle,
    branchesPerLevel,
    leafSize,
    leafColor,
    currentAnimationLevel,
    maxLevel,
  ]);

  if (curLevel > currentAnimationLevel || curLevel > maxLevel) return null;

  return (
    <>
      {/* render the current branch line from (x, y) at given angle/length */}
      <Line
        length={length}
        angle={angle}
        width={width}
        style={{
          left: x,
          top: y - length, // position top of line relative to parent
        }}
      />

      {/* for debugging branch endpoints */}
      {/*
			// start of the branch marker
			<div
				style={{
					position: "absolute",
					left: x - 3,
					top: y - 3,
					width: 6,
					height: 6,
					borderRadius: "50%",
					backgroundColor: "red",
					zIndex: 999,
				}}
			/>
			// end of the branch marker
			<div
				style={{
					position: "absolute",
					left: endX - 3,
					top: endY - 3,
					width: 6,
					height: 6,
					borderRadius: "50%",
					backgroundColor: "blue",
					zIndex: 999,
				}}
			/>
			*/}
      {curLevel > 1 &&
        leafSpots.map((spot, i) => (
          <div
            key={`leaf-${curLevel}-${i}`}
            style={{
              position: 'absolute',
              left: spot.x - leafSize / 2,
              top: spot.y - leafSize / 2,
              width: leafSize,
              height: leafSize,
              backgroundColor: leafColor,
              borderRadius: '50%',
              zIndex: 10,
            }}
          />
        ))}
      {/* recursively render child branches */}
      {children.map((child, i) => (
        <Branch
          key={`${child.curLevel}-${child.angle}-${child.x}-${child.y}-${i}`}
          {...child}
        />
      ))}
    </>
  );
}
