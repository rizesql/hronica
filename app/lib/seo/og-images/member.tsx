import { type MemberOGImageData } from "~/lib/api/og-images.server";
import { image } from "~/lib/sanity/loader";

export const memberOGImageUrl = (request: Request, id: string) => {
	const origin = new URL(request.url).origin;
	return `${origin}/resources/og?t=member&_id=${id}`;
};

export function MemberOGImage({ data: props }: { data: MemberOGImageData }) {
	const photo = props.photo
		? image(props.photo)
				.size(350, 350)
				.crop("focalpoint")
				.fit("crop")
				.focalPoint(props.hotspot.x, props.hotspot.y)
				.format("png")
				.auto("format")
				.url()
		: "";

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "hsl(0 0% 98%)",
				color: "#0d0d0d",
				fontSize: 32,
				fontWeight: 600,
				padding: "10vh 8vw",
				gap: "24px",
			}}
		>
			{props.photo && (
				<div style={{ position: "relative", display: "flex" }}>
					<div
						style={{
							position: "absolute",
							background: "#22c55e",
							opacity: "0.8",
							inset: 0,
							zIndex: 100,
							width: 350,
							height: 350,
							display: "block",
							borderRadius: "10px",
						}}
					/>
					<img
						src={photo}
						alt=""
						width={350}
						height={350}
						style={{
							borderRadius: "10px",
							zIndex: "-2",
							position: "relative",
							opacity: "0.8",
							filter: "grayscale(90%)",
						}}
					/>
				</div>
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "4px",
						alignItems: "baseline",
					}}
				>
					<span
						style={{
							fontWeight: 500,
							fontFamily: "Redaction Italic",
							letterSpacing: "-0.025em",
							fontSize: "80px",
							lineHeight: "84px",
						}}
					>
						Revista
					</span>
					<span
						style={{ fontSize: "88px", lineHeight: "1", fontFamily: "Redaction Bold" }}
					>
						Hronica
					</span>
				</div>

				<div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
					<div
						style={{
							fontSize: "48px",
							fontFamily: "Redaction Bold",
							textAlign: "center",
						}}
					>
						{props.name}
					</div>

					<div style={{ fontFamily: "Redaction Bold", fontSize: "34px" }}>–</div>

					<div
						style={{
							fontSize: "34px",
							fontFamily: "PP Neue Montreal",
							textTransform: "uppercase",
							textAlign: "center",
						}}
					>
						{props.occupation}
					</div>
				</div>
			</div>
		</div>
	);
}
