"use client";

import { useState } from "react";
import TreeWindow from "./tree-window";

export default function TreeControls() {
	const [settings, setSettings] = useState({
		branchesPerLevel: 2,
		initialLength: 100,
		initialWidth: 10,
		branchAngle: 45,
		scale: 0.7,
		leafSize: 4,
		leafColor: "green",
		frameRate: 500,
		maxLevel: 6,
	});

	const [isAnimating, setIsAnimating] = useState(false);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [appliedSettings, setAppliedSettings] = useState(settings);

	const update = (key: keyof typeof settings, delta: number) => {
		setSettings((prev) => ({
			...prev,
			[key]: Math.max(0, Number(prev[key]) + delta),
		}));
	};

	return (
		<div className="flex flex-col md:flex-row w-full h-screen bg-[#f3f7f2]">
			{/* Control Panel */}
			<div className="p-4 w-full md:w-80 bg-white border-r border-gray-300 overflow-y-auto">
				<h2 className="text-lg font-bold mb-4">Tree Controls</h2>

				{[
					["Max Levels", "maxLevel", 1],
					["Branches Per Level", "branchesPerLevel", 1],
					["Initial Length", "initialLength", 5],
					["Branch Width", "initialWidth", 1],
					["Branch Angle", "branchAngle", 5],
					["Scale Factor", "scale", 0.05],
					["Leaf Size", "leafSize", 1],
					["Frame Rate (ms)", "frameRate", 50],
				].map(([label, key, step]) => (
					<div key={key} className="mb-3">
						<label className="block mb-1 font-medium">{label}</label>
						<div className="flex items-center gap-2">
							<button
								onClick={() => update(key as any, -(step as number))}
								className="px-2 py-1 border rounded"
							>
								–
							</button>
							<input
								type="number"
								className="border rounded px-2 py-1 w-full"
								value={settings[key as keyof typeof settings] as number}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										[key]: Number(e.target.value),
									}))
								}
							/>
							<button
								onClick={() => update(key as any, step as number)}
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
						className="w-12 h-8 p-0 border-0"
					/>
				</div>

				<div className="flex gap-4 mt-4">
					<button
						onClick={() => {
							if (!isAnimating) {
								setAppliedSettings(settings); // Apply new settings only when starting
							}
							setIsAnimating(!isAnimating); // Toggle pause/start properly
						}}
						className="bg-green-600 text-white px-4 py-2 rounded"
					>
						{isAnimating ? "Pause" : "Start"}
					</button>
					<button
						onClick={() => {
							setIsAnimating(false);
							setCurrentLevel(0);
						}}
						className="bg-gray-400 text-white px-4 py-2 rounded"
					>
						Reset
					</button>
				</div>
			</div>

			{/* Tree Viewer */}
			<div className="flex-1">
				<TreeWindow
					settings={appliedSettings}
					isAnimating={isAnimating}
					currentLevel={currentLevel}
					setCurrentLevel={setCurrentLevel}
				/>
			</div>
		</div>
	);
}
