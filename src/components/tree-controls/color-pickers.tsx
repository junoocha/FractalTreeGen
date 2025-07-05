interface ColorPickersProps {
  leafColorInput: string;
  branchColorInput: string;
  setLeafColorInput: (val: string) => void;
  setBranchColorInput: (val: string) => void;
  lineCount: number;
}

export default function ColorPickers({
  leafColorInput,
  branchColorInput,
  setLeafColorInput,
  setBranchColorInput,
  lineCount,
}: ColorPickersProps) {
  const disabled = lineCount > 3;
  const inputClass = `w-11 h-11 p-0 border-0 rounded transition-opacity ${
    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
  }`;

  return (
    <div className="flex gap-4 items-center mb-3">
      <div className="flex flex-col items-center">
        <label className="mb-1 font-medium">Leaf</label>
        <input
          type="color"
          value={leafColorInput}
          onChange={(e) => setLeafColorInput(e.target.value)}
          className={inputClass}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="mb-1 font-medium">Branch</label>
        <input
          type="color"
          value={branchColorInput}
          onChange={(e) => setBranchColorInput(e.target.value)}
          className={inputClass}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
