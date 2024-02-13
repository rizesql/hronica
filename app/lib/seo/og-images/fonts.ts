export * as fonts from "./fonts";

export const redaction = async (
	origin: string,
	variant: "Regular" | "Italic" | "Bold",
) => {
	const res = await fetch(new URL(`${origin}/fonts/redaction/Redaction-${variant}.otf`));
	return await res.arrayBuffer();
};

export const ppNeueMontreal = async (origin: string) => {
	const res = await fetch(
		new URL(`${origin}/fonts/pp-neue-montreal/PPNeueMontreal-Medium.otf`),
	);
	return await res.arrayBuffer();
};
