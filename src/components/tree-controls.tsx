'use client';

import { useState, useEffect } from 'react';
import TreeWindow from './tree-window';
import { count } from 'console';

function calculateTotalBranches(
  branchesPerLevel: number,
  maxLevel: number
): number {
  if (branchesPerLevel === 1) {
    return maxLevel + 1;
  }
  return Math.floor(
    (Math.pow(branchesPerLevel, maxLevel + 1) - 1) / (branchesPerLevel - 1)
  );
}

function getBranchCountColor(total: number): string {
  if (total < 1000) return 'text-green-700';
  if (total < 2000) return 'text-yellow-600';
  if (total < 5000) return 'text-orange-600';
  return 'text-red-600 font-bold';
}

function getBranchCountWarning(total: number): string {
  switch (true) {
    case total < 1000:
      return 'No risk of lag!';
    case total < 2000:
      return 'Expect a little lag...';
    case total < 5000:
      return 'Okay um... there might be some significant lag...';
    default:
      return '...You do know generating over 5000 lines might cause issues right?';
  }
}

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

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [appliedSettings, setAppliedSettings] = useState(settings);
  const isFinished = currentLevel >= appliedSettings.maxLevel;
  const [lineCount, setLineCount] = useState(1);

  const totalBranches = calculateTotalBranches(
    settings.branchesPerLevel,
    settings.maxLevel
  );
  const branchCountClass = getBranchCountColor(totalBranches);

  const update = (key: keyof typeof settings, delta: number, minValue = 1) => {
    setSettings((prev) => {
      const raw = Number((prev[key] as number) + delta);
      const next = Math.max(minValue, parseFloat(raw.toFixed?.(2)));
      return { ...prev, [key]: next };
    });
  };

  useEffect(() => {
    setAppliedSettings((prev) => ({
      ...prev,
      branchColor: settings.branchColor,
      leafColor: settings.leafColor,
    }));
  }, [settings.branchColor, settings.leafColor]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-[#f3f7f2]">
      {/* Control Panel */}
      <div className="p-4 w-full md:w-80 bg-white border-r border-gray-300 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Tree Controls</h2>

        {[
          ['Max Levels', 'maxLevel', 1, 1],
          ['Branches Per Level', 'branchesPerLevel', 1, 1],
          ['Initial Length', 'initialLength', 10, 1],
          ['Branch Width', 'initialWidth', 1, 1],
          ['Branch Angle', 'branchAngle', 5, 0],
          ['Scale Factor', 'scale', 0.05, 0.01],
          ['Leaf Size', 'leafSize', 1, 0],
          ['Frame Rate (ms)', 'frameRate', 50, 1],
        ].map(([label, key, step, min]) => (
          <div key={key} className="mb-3">
            <label className="block mb-1 font-medium">{label}</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  update(key as any, -(step as number), min as number)
                }
                className="px-2 py-1 border rounded"
              >
                –
              </button>
              <input
                type="number"
                className="border rounded px-2 py-1 w-full"
                min={min as number}
                step={step as number}
                value={settings[key as keyof typeof settings] as number}
                onChange={(e) => {
                  // Allow user to type freely without immediately clamping
                  setSettings((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  const val = Math.max(
                    Number(min),
                    parseFloat(e.target.value || '0')
                  );
                  setSettings((prev) => ({
                    ...prev,
                    [key]: parseFloat(val.toFixed?.(2)),
                  }));
                }}
              />
              <button
                onClick={() =>
                  update(key as any, step as number, min as number)
                }
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <label className="block mb-1 font-medium">Leaf Color</label>
          <input
            type="color"
            value={settings.leafColor}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, leafColor: e.target.value }))
            }
            onClick={() => console.log(lineCount)}
            className={`w-13 h-13 p-0 border-0 rounded transition-opacity ${
              lineCount > 3 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={lineCount > 3} // disable if animating or tree isn't finished.
            //  And yes, I know it should be 1 but um, after reset, even after setting it to 1 it's technically 2. Doesn't disrupt the counter tho
          />

          <label className="block mb-1 font-medium">Branch Color</label>
          <input
            type="color"
            value={settings.branchColor}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, branchColor: e.target.value }))
            }
            disabled={lineCount > 3}
            className={`w-13 h-13 p-0 border-0 rounded transition-opacity ${
              lineCount > 3 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            }`}
          />
        </div>

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

        <div className="mt-6 p-3 bg-gray-100 rounded shadow text-center font-semibold">
          Lines Drawn: {Math.floor(lineCount) / 2}
        </div>

        <div
          className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
        >
          Expected Branches With Given Input: {totalBranches.toLocaleString()}
        </div>

        <div
          className={`p-3 bg-gray-100 rounded shadow text-center font-semibold ${branchCountClass}`}
        >
          {getBranchCountWarning(totalBranches)}
        </div>
      </div>

      {/* Tree Viewer */}
      <div className="flex-1">
        <TreeWindow
          settings={appliedSettings}
          isAnimating={isAnimating}
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
          setLineCount={setLineCount}
        />
      </div>
    </div>
  );
}
