'use client';

import { useState, useEffect } from 'react';
import TreeWindow from '../tree-window/tree-window';
import ControlPanel from './control-panel';
import { calculateTotalBranches } from '../../../utils/tree-controls-types';

export default function TreeControls() {
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

  const [leafColorInput, setLeafColorInput] = useState(settings.leafColor);
  const [branchColorInput, setBranchColorInput] = useState(
    settings.branchColor
  );

  const [appliedSettings, setAppliedSettings] = useState(settings);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [skipLargeGrowthAnimation, setSkipLargeGrowthAnimation] =
    useState(true);

  const isFinished = currentLevel >= appliedSettings.maxLevel;
  const totalBranches = calculateTotalBranches(
    settings.branchesPerLevel,
    settings.maxLevel
  );
  const effectiveFrameRate = skipLargeGrowthAnimation ? 0 : settings.frameRate;

  useEffect(() => {
    const timeout = setTimeout(() => {
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
    }, 50);
    return () => clearTimeout(timeout);
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
