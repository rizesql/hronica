import { type RouteOGImageData } from "~/lib/api/og-images.server";

export const routeOGImageUrl = (request: Request, route: string) => {
	const origin = new URL(request.url).origin;

	return `${origin}/resources/og?t=route&_r=${route}`;
};

export function RouteOGImage({ data: props }: { data: RouteOGImageData }) {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: props.color,
				color: "#0d0d0d",
				fontSize: 32,
				fontWeight: 600,
				padding: "10vh 10vw",
				gap: "24px",
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
						fontSize: "92px",
						lineHeight: "96px",
					}}
				>
					Revista
				</span>
				<span
					style={{ fontSize: "100px", lineHeight: "1", fontFamily: "Redaction Bold" }}
				>
					Hronica
				</span>
			</div>

			<div
				style={{
					fontSize: "64px",
					fontFamily: "Redaction Bold",
					textAlign: "center",
				}}
			>
				{props.name}
			</div>
		</div>
	);
}
