import { TreeSettings } from '../../../utils/tree-settings-types';

interface ControlSliderProps {
  label: string; // Label to show above the control
  settingKey: keyof TreeSettings; // The key in the settings object this control is tied to
  step: number; // increment/decrement when buttons are clicked
  min: number; // Minimum allowed value
  settings: TreeSettings; // The current full settings object
  setSettings: (updater: (prev: TreeSettings) => TreeSettings) => void; // Function to update settings
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
      const key = settingKey as keyof TreeSettings;
      // Get current value and apply delta
      const raw = Number(prev[key]) + delta;
      // Ensure the new value is not less than the min and round to 2 decimals. Mostly 2 decimals for the scale factor
      const next = Math.max(min, parseFloat(raw.toFixed(2)));
      // Return the updated settings object
      return { ...prev, [key]: next };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = settingKey as keyof TreeSettings;
    const value = parseFloat(e.target.value);

    setSettings((prev) => ({
      ...prev,
      [key]: isNaN(value) ? 1 : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const key = settingKey as keyof TreeSettings;
    const val = Math.max(min, parseFloat(e.target.value || '0'));
    setSettings((prev) => ({
      ...prev,
      [key]: parseFloat(val.toFixed(2)),
    }));
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
          value={settings[settingKey as keyof TreeSettings]} // Controlled input value
          className="border rounded px-2 py-1 w-full"
          // Update settings on input change
          onChange={handleInputChange}
          // When user leaves the input field, sanitize value
          onBlur={handleBlur}
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
