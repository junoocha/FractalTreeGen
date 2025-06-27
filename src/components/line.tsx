"use client";

export type LineProps = {
	length: number;
	angle: number; // in degrees
	width: number;
	color?: string;
	children?: React.ReactNode;
};

function Line({
	length,
	angle,
	width,
	color = "#654321",
	children,
}: LineProps) {
	const wrapperStyle: React.CSSProperties = {
		position: "relative",
		transform: `rotate(${angle}deg)`,
		transformOrigin: "bottom center",
	};

	const lineStyle: React.CSSProperties = {
		width: `${width}px`,
		height: `${length}px`,
		backgroundColor: color,
		margin: "0 auto",
	};

	return (
		<div style={wrapperStyle}>
			<div style={lineStyle} />
			<div
				style={{
					position: "absolute",
					bottom: `${length}px`,
					left: "50%",
					transform: "translateX(-50%)",
				}}
			>
				{children}
			</div>
		</div>
	);
}

export default Line;
