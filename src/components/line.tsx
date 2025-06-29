"use client";

export type LineProps = {
	length: number;
	angle: number; // degrees
	width: number;
	color?: string;
	style?: React.CSSProperties; // position override
};

export default function Line({
	length,
	angle,
	width,
	color = "#654321",
	style,
}: LineProps) {
	return (
		<div
			className="absolute"
			style={{
				width: `${width}px`,
				height: `${length}px`,
				backgroundColor: color,
				transform: `translateX(-50%) rotate(${angle}deg)`,
				transformOrigin: "bottom center",
				...style,
			}}
		/>
	);
}
