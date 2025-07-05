interface ControlSliderProps {
  label: string;
  settingKey: string;
  step: number;
  min: number;
  settings: Record<string, any>;
  setSettings: (updater: (prev: any) => any) => void;
}

export default function ControlSlider({
  label,
  settingKey,
  step,
  min,
  settings,
  setSettings,
}: ControlSliderProps) {
  const update = (delta: number) => {
    setSettings((prev: any) => {
      const raw = Number(prev[settingKey]) + delta;
      const next = Math.max(min, parseFloat(raw.toFixed(2)));
      return { ...prev, [settingKey]: next };
    });
  };

  return (
    <div className="mb-3">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => update(-step)}
          className="px-2 py-1 border rounded"
        >
          –
        </button>
        <input
          type="number"
          min={min}
          step={step}
          value={settings[settingKey]}
          className="border rounded px-2 py-1 w-full"
          onChange={(e) => {
            setSettings((prev: any) => ({
              ...prev,
              [settingKey]: e.target.value,
            }));
          }}
          onBlur={(e) => {
            const val = Math.max(min, parseFloat(e.target.value || '0'));
            setSettings((prev: any) => ({
              ...prev,
              [settingKey]: parseFloat(val.toFixed(2)),
            }));
          }}
        />
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
