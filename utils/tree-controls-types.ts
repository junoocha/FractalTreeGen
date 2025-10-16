export function calculateTotalBranches(
  branchesPerLevel: number,
  maxLevel: number
): number {
  if (branchesPerLevel === 1) {
    // Each level adds 1 branch, plus the trunk
    return maxLevel + 1;
  } else {
    // Total branches = 1 (trunk) + sum of all children at each level
    // Geometric series sum for 'maxLevel' levels after the trunk
    return Math.floor(
      (Math.pow(branchesPerLevel, maxLevel) - 1) / (branchesPerLevel - 1)
    );
  }
}

export function getBranchCountColor(total: number): string {
  if (total < 1000) return 'text-green-700';
  if (total < 2000) return 'text-yellow-600';
  if (total < 5000) return 'text-orange-600';
  return 'text-red-600 font-bold';
}

export function getBranchCountWarning(total: number): string {
  if (total < 1000) return 'No risk of lag!';
  if (total < 2000) return 'Expect a little lag...';
  if (total < 5000) return 'Okay um... there might be some significant lag...';
  return '...You do know generating over 5000 lines might cause issues right?';
}
