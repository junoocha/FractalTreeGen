interface ControlSliderProps {
  label: string; // Label to show above the control
  settingKey: string; // The key in the settings object this control is tied to
  step: number; // increment/decrement when buttons are clicked
  min: number; // Minimum allowed value
  settings: Record<string, any>; // The current full settings object
  setSettings: (updater: (prev: any) => any) => void; // Function to update settings
}

export default function ControlSlider({
  label,
  settingKey,
  step,
  min,
  settings,
  setSettings,
}: ControlSliderProps) {
  // Helper function to update the value using buttons (+/-)
  const update = (delta: number) => {
    setSettings((prev: any) => {
      // Get current value and apply delta
      const raw = Number(prev[settingKey]) + delta;
      // Ensure the new value is not less than the min and round to 2 decimals. Mostly 2 decimals for the scale factor
      const next = Math.max(min, parseFloat(raw.toFixed(2)));
      // Return the updated settings object
      return { ...prev, [settingKey]: next };
    });
  };

  return (
    <div className="mb-3">
      {/* Label for the setting */}
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        {/* Minus button: decreases value by `step` */}
        <button
          onClick={() => update(-step)}
          className="px-2 py-1 border rounded"
        >
          –
        </button>

        {/* Input field to directly type a number */}
        <input
          type="number"
          min={min}
          step={step}
          value={settings[settingKey]} // Controlled input value
          className="border rounded px-2 py-1 w-full"
          // Update settings on input change
          onChange={(e) => {
            setSettings((prev: any) => ({
              ...prev,
              [settingKey]: e.target.value, // Raw string value for now, wait for onBlur
            }));
          }}
          // When user leaves the input field, sanitize value
          onBlur={(e) => {
            const val = Math.max(min, parseFloat(e.target.value || '0'));
            setSettings((prev: any) => ({
              ...prev,
              [settingKey]: parseFloat(val.toFixed(2)),
            }));
          }}
        />

        {/* Plus button: increases value by `step` */}
        <button
          onClick={() => update(step)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
