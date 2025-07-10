import { TreeSettings } from './tree-settings-types';

export type ControlPanelProps = {
  settings: TreeSettings;
  setSettings: (updater: (prev: TreeSettings) => TreeSettings) => void;

  appliedSettings: TreeSettings;
  setAppliedSettings: (settings: TreeSettings) => void;

  isAnimating: boolean;
  setIsAnimating: (val: boolean) => void;

  isFinished: boolean;

  currentLevel: number;
  setCurrentLevel: (val: number) => void;

  lineCount: number;
  setLineCount: (val: number) => void;

  leafColorInput: string;
  setLeafColorInput: (color: string) => void;

  branchColorInput: string;
  setBranchColorInput: (color: string) => void;

  skipLargeGrowthAnimation: boolean;
  setSkipLargeGrowthAnimation: (val: boolean) => void;

  totalBranches: number;
};
