import { useEffect } from 'react';

export function useTreeAnimation({
  isAnimating, // Whether animation is currently active
  frameRate, // Time (ms) between each frame (level increment)
  maxLevel, // Maximum depth of tree to animate to
  setCurrentLevel,
}: {
  isAnimating: boolean;
  frameRate: number;
  maxLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
}) {
  useEffect(() => {
    // If not animating, do nothing
    if (!isAnimating) return;

    // If frameRate is 0, instantly grow to full depth
    if (frameRate === 0) {
      setCurrentLevel(maxLevel);
      return;
    }

    // Otherwise, set up interval to increment level at given frame rate
    const interval = setInterval(() => {
      setCurrentLevel((prev) => {
        if (prev >= maxLevel) {
          clearInterval(interval); // Stop animation once max level is reached
          return prev;
        }
        return prev + 1; // Increment to next level
      });
    }, frameRate);

    // Cleanup on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [isAnimating, frameRate, maxLevel, setCurrentLevel]);
}
