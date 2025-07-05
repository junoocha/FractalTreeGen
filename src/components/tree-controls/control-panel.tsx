import ControlSlider from './control-slider';
import ColorPickers from './color-pickers';
import ActionButtons from './action-buttons';
import {
  getBranchCountColor,
  getBranchCountWarning,
} from '../../../utils/tree-controls-types';

const CONTROL_FIELDS = [
  ['Max Levels', 'maxLevel', 1, 1],
  ['Branches Per Level', 'branchesPerLevel', 1, 1],
  ['Initial Length', 'initialLength', 10, 1],
  ['Branch Width', 'initialWidth', 1, 1],
  ['Branch Angle', 'branchAngle', 5, 0],
  ['Scale Factor', 'scale', 0.05, 0.01],
  ['Leaf Size', 'leafSize', 1, 0],
  ['Frame Rate (ms)', 'frameRate', 50, 1],
] as const;

export default function ControlPanel({
  settings,
  setSettings,
  appliedSettings,
  setAppliedSettings,
  isAnimating,
  setIsAnimating,
  isFinished,
  currentLevel,
  setCurrentLevel,
  lineCount,
  setLineCount,
  leafColorInput,
  setLeafColorInput,
  branchColorInput,
  setBranchColorInput,
  skipLargeGrowthAnimation,
  setSkipLargeGrowthAnimation,
  totalBranches,
}: any) {
  const branchCountClass = getBranchCountColor(totalBranches);

  return (
    <div className="p-4 w-full md:w-80 bg-white border-r border-gray-300 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Tree Controls</h2>

      {CONTROL_FIELDS.map(([label, key, step, min]) => (
        <ControlSlider
          key={key}
          label={label}
          settingKey={key}
          step={step}
          min={min}
          settings={settings}
          setSettings={setSettings}
        />
      ))}

      <ColorPickers
        leafColorInput={leafColorInput}
        branchColorInput={branchColorInput}
        setLeafColorInput={setLeafColorInput}
        setBranchColorInput={setBranchColorInput}
        lineCount={lineCount}
      />

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={skipLargeGrowthAnimation}
          onChange={() =>
            setSkipLargeGrowthAnimation(!skipLargeGrowthAnimation)
          }
          className="scale-150"
        />
        Skip Animation
      </label>

      <ActionButtons
        isAnimating={isAnimating}
        isFinished={isFinished}
        currentLevel={currentLevel}
        setIsAnimating={setIsAnimating}
        setAppliedSettings={setAppliedSettings}
        settings={settings}
        setCurrentLevel={setCurrentLevel}
        setLineCount={setLineCount}
      />

      <div className="mt-6 p-3 bg-gray-100 rounded shadow text-center font-semibold">
        Lines Drawn: {lineCount > 3 ? Math.floor(lineCount / 2) : ''}
      </div>

      <div
        className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
      >
        Expected Branches: {totalBranches.toLocaleString()}
      </div>

      <div
        className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
      >
        {getBranchCountWarning(totalBranches)}
      </div>
    </div>
  );
}
