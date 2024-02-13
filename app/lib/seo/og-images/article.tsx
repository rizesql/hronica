import { format } from "date-fns";

import { type ArticleOGImageData } from "~/lib/api/og-images.server";

export const articleOGImageURL = (request: Request, id: string) => {
	const origin = new URL(request.url).origin;
	return `${origin}/resources/og?t=article&_id=${id}`;
};

export function ArticleOGImage({ data: props }: { data: ArticleOGImageData }) {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "space-between",
				backgroundColor: props.category.color,
				color: "#0d0d0d",
				fontSize: 32,
				fontWeight: 600,
				padding: "10vh 10vw",
			}}
		>
			<div style={{ height: 1, width: 1 }}></div>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div style={{ fontSize: "64px", fontWeight: 800, fontFamily: "Redaction Bold" }}>
					{props.title}
				</div>

				<div
					style={{
						display: "flex",
						gap: "12px",
						fontFamily: "PP Neue Montreal",
						textTransform: "uppercase",
						fontSize: "16px",
					}}
				>
					<div style={{ marginRight: 8 }}>{format(props.date, "MMM d, yyyy")}</div>
					<div style={{ display: "flex" }}>Scris de {props.author.name}</div>
					<div>–</div>
					<div>{props.category.name}</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					gap: "4px",
					alignItems: "baseline",
					width: "100%",
					justifyContent: "flex-end",
				}}
			>
				<span
					style={{
						fontWeight: 500,
						fontFamily: "Redaction Italic",
						letterSpacing: "-0.025em",
						fontSize: "32px",
						lineHeight: "36px",
					}}
				>
					Revista
				</span>
				<span style={{ fontSize: "42px", lineHeight: "1", fontFamily: "Redaction Bold" }}>
					Hronica
				</span>
			</div>
		</div>
	);
}
