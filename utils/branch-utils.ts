import { BranchProps } from '@/components/create-branch';

export function generateLeafSpots(
  x: number,
  y: number,
  length: number,
  rad: number
): { x: number; y: number }[] {
  return Array.from({ length: 2 }).map(() => {
    const p = Math.random();
    const baseX = x + Math.sin(rad) * length * p;
    const baseY = y - Math.cos(rad) * length * p;
    return { x: baseX, y: baseY };
  });
}

export function generateChildBranches(props: BranchProps): BranchProps[] {
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

  if (curLevel >= maxLevel) return [];

  const angleStep =
    branchesPerLevel > 1 ? branchAngle / (branchesPerLevel - 1) : 0;

  return Array.from({ length: branchesPerLevel }).map((_, i) => {
    const offset = -branchAngle / 2 + i * angleStep;

    return {
      curLevel,
      maxLevel,
      length,
      width,
      angle: angle + offset,
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
    };
  });
}
