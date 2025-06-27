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
			<Line length={100} angle={0} width={6}>
				<Line length={70} angle={30} width={4}>
					<Line length={50} angle={-20} width={2} />
				</Line>
				<Line length={70} angle={-30} width={4} />
			</Line>
		</div>
	);
}
