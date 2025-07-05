interface ActionButtonsProps {
  isAnimating: boolean;
  isFinished: boolean;
  currentLevel: number;
  setIsAnimating: (val: boolean) => void;
  setAppliedSettings: (s: any) => void;
  settings: any;
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
      <button
        onClick={() => {
          if (!isAnimating && !isFinished && currentLevel === 0) {
            setAppliedSettings(settings);
          }
          if (!isFinished) {
            setIsAnimating(!isAnimating);
          }
        }}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isFinished}
      >
        {isFinished ? 'Finished' : isAnimating ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => {
          setIsAnimating(false);
          setCurrentLevel(0);
          setLineCount(1);
        }}
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
