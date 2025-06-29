"use client";
import { useEffect, useState } from "react";
import Branch from "./create-branch";

export default function Tree() {
	const [currentLevel, setCurrentLevel] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

	// configurable Parameters
	const maxLevel = 8;
	const initialLength = 100;
	const initialWidth = 10;
	const branchesPerLevel = 2;
	const scale = 0.7;
	const branchAngle = 45;
	const leafSize = 4;
	const leafColor = "green";
	const frameRate = 500; // ms

	useEffect(() => {
		if (typeof window !== "undefined") {
			setOrigin({
				x: window.innerWidth / 2,
				y: window.innerHeight - 100,
			});
		}
	}, []);

	useEffect(() => {
		if (!isAnimating) return;

		const interval = setInterval(() => {
			setCurrentLevel((prev) => (prev + 1 > maxLevel ? maxLevel : prev + 1));
		}, frameRate);

		return () => clearInterval(interval);
	}, [isAnimating]);

	if (!origin) return null;

	return (
		<div className="relative w-full h-screen bg-[#eef6ec] overflow-hidden">
			{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="absolute top-2 left-2 z-50"
				onClick={() => setIsAnimating(!isAnimating)}
			>
				{isAnimating ? "Pause" : "Start"}
			</button>
			{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="absolute top-2 left-20 z-50"
				onClick={() => {
					setCurrentLevel(0);
					setIsAnimating(false);
				}}
			>
				Reset
			</button>

			<Branch
				curLevel={0}
				maxLevel={maxLevel}
				length={initialLength}
				width={initialWidth}
				angle={0}
				x={origin.x}
				y={origin.y}
				scale={scale}
				branchAngle={branchAngle}
				branchesPerLevel={branchesPerLevel}
				leafSize={leafSize}
				leafColor={leafColor}
				currentAnimationLevel={currentLevel}
			/>
		</div>
	);
}
