'use client';

import { useMemo } from 'react';
import Line from './line';
import Leaf from './leaf';
import {
  generateChildBranches,
  generateLeafSpots,
} from '../../utils/branch-utils';

export type BranchProps = {
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
  branchColor: string;
  currentAnimationLevel: number;
  countRef: React.RefObject<number>;
};

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

  const rad = (angle * Math.PI) / 180;

  const endX = x + Math.sin(rad) * length;
  const endY = y - Math.cos(rad) * length;

  const leafSpots = useMemo(
    () => generateLeafSpots(x, y, length, rad),
    [x, y, length, rad]
  );

  const children = useMemo(
    () =>
      generateChildBranches({
        ...props,
        x: endX,
        y: endY,
        curLevel: curLevel + 1,
        length: length * scale,
        width: width * 0.7,
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

  if (curLevel > currentAnimationLevel || curLevel > maxLevel) return null;

  if (countRef.current != null) {
    countRef.current += 1;
  }

  return (
    <>
      <Line
        length={length}
        angle={angle}
        width={width}
        color={branchColor}
        style={{
          left: x,
          top: y - length,
        }}
      />

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

      {children.map((child, i) => (
        <Branch
          key={`${child.curLevel}-${child.angle}-${child.x}-${child.y}-${i}`}
          {...child}
        />
      ))}
    </>
  );
}
