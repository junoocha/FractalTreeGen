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
			className="absolute origin-bottom"
			style={{
				height: `${length}px`,
				width: `${width}px`,
				backgroundColor: color,
				transform: `rotate(${angle}deg)`,
				...style,
			}}
		/>
	);
}
