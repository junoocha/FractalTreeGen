"use client";
import { useRef, useState } from "react";
import Tree from "./tree";

export default function TreeWindow() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const [start, setStart] = useState<{ x: number; y: number } | null>(null);

	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const newScale = Math.max(0.1, scale - e.deltaY * 0.001);
		setScale(newScale);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		setDragging(true);
		setStart({ x: e.clientX, y: e.clientY });
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!dragging || !start) return;
		const dx = e.clientX - start.x;
		const dy = e.clientY - start.y;
		setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
		setStart({ x: e.clientX, y: e.clientY });
	};

	const handleMouseUp = () => {
		setDragging(false);
		setStart(null);
	};

	return (
		<div className="w-full h-screen flex items-center justify-center bg-gray-100">
			<div
				ref={containerRef}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				className="relative w-[800px] h-[600px] overflow-hidden border border-gray-400 rounded-lg bg-white cursor-grab"
				style={{ userSelect: "none" }}
			>
				<div
					style={{
						transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
						transformOrigin: "center center",
						width: "100%",
						height: "100%",
						position: "relative",
					}}
				>
					<Tree />
				</div>
			</div>
		</div>
	);
}
