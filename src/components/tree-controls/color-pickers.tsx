interface ColorPickersProps {
  leafColorInput: string; // Current leaf color input value (hex string)
  branchColorInput: string; // Current branch color input value (hex string)
  setLeafColorInput: (val: string) => void; // Function to update the leaf color input
  setBranchColorInput: (val: string) => void; // Function to update the branch color input
  lineCount: number; // Current number of lines drawn (used to determine if inputs should be disabled)
}

// Main component for rendering the color pickers
export default function ColorPickers({
  leafColorInput,
  branchColorInput,
  setLeafColorInput,
  setBranchColorInput,
  lineCount,
}: ColorPickersProps) {
  // Disable color inputs if more than 3 lines have been drawn
  const disabled = lineCount > 3;

  // Common styling for both inputs, including dynamic disabling
  const inputClass = `w-11 h-11 p-0 border-0 rounded transition-opacity ${
    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
  }`;

  return (
    <div className="flex gap-4 items-center mb-3">
      {/* Leaf color picker */}
      <div className="flex flex-col items-center">
        <label className="mb-1 font-medium">Leaf</label>
        <input
          type="color"
          value={leafColorInput}
          onChange={(e) => setLeafColorInput(e.target.value)}
          className={inputClass}
          disabled={disabled} // Prevent interaction if animation already started
        />
      </div>

      {/* Branch color picker */}
      <div className="flex flex-col items-center">
        <label className="mb-1 font-medium">Branch</label>
        <input
          type="color"
          value={branchColorInput}
          onChange={(e) => setBranchColorInput(e.target.value)}
          className={inputClass}
          disabled={disabled} // Prevent interaction if animation already started
        />
      </div>
    </div>
  );
}
