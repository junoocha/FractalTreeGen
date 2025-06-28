import Line from "@/components/line";

export default function Home() {
	return (
		<div
			style={{
				position: "relative",
				height: "100vh",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-end", // anchor the tree trunk to the bottom
			}}
		>
			<Line length={100} angle={0} width={6}></Line>
			<Line length={100} angle={50} width={6}></Line>
		</div>
	);
}
