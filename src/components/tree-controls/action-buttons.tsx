import { TreeSettings } from '../../../utils/tree-settings-types';

interface ActionButtonsProps {
  isAnimating: boolean;
  isFinished: boolean;
  currentLevel: number;
  setIsAnimating: (val: boolean) => void;

  setAppliedSettings: (s: TreeSettings) => void;
  settings: TreeSettings;

  setCurrentLevel: (val: number) => void;
  setLineCount: (val: number) => void;
}

export default function ActionButtons({
  isAnimating,
  isFinished,
  currentLevel,
  setIsAnimating,
  setAppliedSettings,
  settings,
  setCurrentLevel,
  setLineCount,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 mt-4">
      {/* Start / Pause / Finished Button */}
      <button
        onClick={() => {
          // only apply settings at the beginning of a new animation
          if (!isAnimating && !isFinished && currentLevel === 0) {
            setAppliedSettings(settings); // Locks in the current settings for this animation run
          }

          // If animation is not finished, toggle between start and pause
          if (!isFinished) {
            setIsAnimating(!isAnimating); // Toggles animation on/off
          }
        }}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isFinished} // Once finished, the button becomes inactive
      >
        {/* Dynamically change label based on animation state */}
        {isFinished ? 'Finished' : isAnimating ? 'Pause' : 'Start'}
      </button>

      {/* Reset Button */}
      <button
        onClick={() => {
          setIsAnimating(false); // Stop the animation
          setCurrentLevel(0); // Reset tree growth level
          setLineCount(1); // Reset line/branch count
        }}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
