import { NotEditable } from "@keystatic/core";
import { ComponentIcon } from "lucide-react";

export const Preview = ({
	children,
	label,
}: React.PropsWithChildren<{ label: string }>) => {
	const wrapper: React.CSSProperties = {
		border: "1px solid var(--ksv-color-scale-slate5)",
		padding: "28px 16px 16px 20px",
		borderRadius: "6px",
		position: "relative",
		background: "var(--ksv-color-scale-slate1)",
	};

	const labelStyle: React.CSSProperties = {
		position: "absolute",
		top: "4px",
		left: "4px",
		fontSize: "12px",
		color: "var(--ksv-color-scale-indigo9)",
		backgroundColor: "rgb(220 252 231)",
		borderRadius: "4px",
		padding: "1px 4px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "4px",
	};

	const icon: React.CSSProperties = {
		width: "12px",
		height: "12px",
	};

	return (
		<div style={wrapper}>
			<NotEditable>
				<div style={labelStyle}>
					<ComponentIcon style={icon} />
					{label}
				</div>
			</NotEditable>
			{children}
		</div>
	);
};
