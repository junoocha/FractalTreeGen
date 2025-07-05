import { useEffect } from 'react';

export function useTreeAnimation({
  isAnimating,
  frameRate,
  maxLevel,
  setCurrentLevel,
}: {
  isAnimating: boolean;
  frameRate: number;
  maxLevel: number;
  setCurrentLevel: (v: number | ((prev: number) => number)) => void;
}) {
  useEffect(() => {
    if (!isAnimating) return;

    if (frameRate === 0) {
      setCurrentLevel(maxLevel);
      return;
    }

    const interval = setInterval(() => {
      setCurrentLevel((prev) => {
        if (prev >= maxLevel) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, frameRate);

    return () => clearInterval(interval);
  }, [isAnimating, frameRate, maxLevel, setCurrentLevel]);
}
