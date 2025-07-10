'use client';

import { useState, useEffect } from 'react';
import TreeWindow from '../tree-window/tree-window';
import ControlPanel from './control-panel';
import { calculateTotalBranches } from '../../../utils/tree-controls-types';

export default function TreeControls() {
  // Full editable settings state (used by the ControlPanel)
  const [settings, setSettings] = useState({
    branchesPerLevel: 2,
    initialLength: 100,
    initialWidth: 10,
    branchAngle: 45,
    scale: 0.7,
    leafSize: 10,
    leafColor: '#008000',
    branchColor: '#8B4513',
    frameRate: 500,
    maxLevel: 6,
  });

  // Color pickers have their own controlled input state
  const [leafColorInput, setLeafColorInput] = useState(settings.leafColor);
  const [branchColorInput, setBranchColorInput] = useState(
    settings.branchColor
  );

  // Snapshot of settings when animation is started (settings used for current tree being animated)
  const [appliedSettings, setAppliedSettings] = useState(settings);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0); // Current depth level
  const [lineCount, setLineCount] = useState(1); // Total number of lines drawn

  // If true, skip frame delays for large trees
  const [skipLargeGrowthAnimation, setSkipLargeGrowthAnimation] =
    useState(true);

  // Boolean indicating if the animation has completed
  const isFinished = currentLevel >= appliedSettings.maxLevel;

  // Used for visual feedback on UI (e.g., warnings, counts)
  const totalBranches = calculateTotalBranches(
    settings.branchesPerLevel,
    settings.maxLevel
  );

  // Frame rate is zero if skipping animation
  const effectiveFrameRate = skipLargeGrowthAnimation ? 0 : settings.frameRate;

  // Effect to sync input color pickers to settings after short debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Update both editable settings and applied snapshot
      setSettings((prev) => ({
        ...prev,
        leafColor: leafColorInput,
        branchColor: branchColorInput,
      }));
      setAppliedSettings((prev) => ({
        ...prev,
        leafColor: leafColorInput,
        branchColor: branchColorInput,
      }));
    }, 50); // Small delay to avoid over-firing during rapid typing
    return () => clearTimeout(timeout); // Clean up previous timeout
  }, [leafColorInput, branchColorInput]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-[#f3f7f2]">
      <ControlPanel
        settings={settings}
        setSettings={setSettings}
        appliedSettings={appliedSettings}
        setAppliedSettings={setAppliedSettings}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        isFinished={isFinished}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
        lineCount={lineCount}
        setLineCount={setLineCount}
        leafColorInput={leafColorInput}
        setLeafColorInput={setLeafColorInput}
        branchColorInput={branchColorInput}
        setBranchColorInput={setBranchColorInput}
        skipLargeGrowthAnimation={skipLargeGrowthAnimation}
        setSkipLargeGrowthAnimation={setSkipLargeGrowthAnimation}
        totalBranches={totalBranches}
      />

      {/* Main tree canvas area */}
      <div className="flex-1">
        <TreeWindow
          settings={appliedSettings}
          isAnimating={isAnimating}
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
          setLineCount={setLineCount}
          frameRate={effectiveFrameRate}
        />
      </div>
    </div>
  );
}
