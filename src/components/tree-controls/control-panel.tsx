import ControlSlider from './control-slider';
import ColorPickers from './color-pickers';
import ActionButtons from './action-buttons';
import {
  getBranchCountColor,
  getBranchCountWarning,
} from '../../../utils/tree-controls-types';
import { ControlPanelProps } from '../../../utils/control-panel-types';
import { TreeSettings } from '../../../utils/tree-settings-types';

// Configuration for all sliders: [Label, Setting Key, Step Size, Min Value]
const CONTROL_FIELDS: [string, keyof TreeSettings, number, number][] = [
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
  settings, // Current control values
  setSettings, // Function to update control values
  setAppliedSettings, // Function to update applied settings
  isAnimating, // Whether the animation is running
  setIsAnimating, // Function to toggle animation
  isFinished, // Whether the drawing is complete
  currentLevel, // Current recursion level
  setCurrentLevel, // Function to reset recursion level
  lineCount, // Number of lines drawn
  setLineCount, // Function to reset line count
  leafColorInput, // Color value for leaves
  setLeafColorInput, // Function to update leaf color
  branchColorInput, // Color value for branches
  setBranchColorInput, // Function to update branch color
  skipLargeGrowthAnimation, // Boolean flag to skip animation
  setSkipLargeGrowthAnimation, // Function to toggle animation skipping
  totalBranches, // Calculated total expected branches
}: ControlPanelProps) {
  // Dynamically set the color class based on total branch count
  const branchCountClass = getBranchCountColor(totalBranches);

  return (
    <div className="p-4 w-full md:w-80 bg-white border-r border-gray-300 overflow-y-auto">
      {/* Section title */}
      <h2 className="text-lg font-bold mb-4">Tree Controls</h2>

      {/* Render sliders for each control field */}
      {CONTROL_FIELDS.map(([label, key, step, min]) => (
        <ControlSlider
          key={key}
          label={label} // Slider label shown to user
          settingKey={key} // Key in the settings object
          step={step} // Step size
          min={min} // Minimum value
          settings={settings}
          setSettings={setSettings}
        />
      ))}

      {/* Color picker UI for leaf and branch colors */}
      <ColorPickers
        leafColorInput={leafColorInput}
        branchColorInput={branchColorInput}
        setLeafColorInput={setLeafColorInput}
        setBranchColorInput={setBranchColorInput}
        lineCount={lineCount}
      />

      {/* Checkbox for toggling animation skipping */}
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

      {/* Start/Pause and Reset button controls */}
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

      {/* Shows number of lines drawn (divided by 2 if above threshold). For some reason, react keeps like double rendering or something but doesn't show it but messes with counter */}
      <div className="mt-6 p-3 bg-gray-100 rounded shadow text-center font-semibold">
        Lines Drawn: {lineCount > 3 ? Math.floor(lineCount / 2) : ''}
      </div>

      {/* Display total expected branches with color indicator */}
      <div
        className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
      >
        Expected Branches: {totalBranches.toLocaleString()}
      </div>

      {/* Optional performance warning if too many branches */}
      <div
        className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
      >
        {getBranchCountWarning(totalBranches)}
      </div>
    </div>
  );
}
