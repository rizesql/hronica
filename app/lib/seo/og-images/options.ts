import { type SatoriOptions } from "satori";

import { fonts } from "./fonts";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const ogImageOptions = async (origin: string) =>
	({
		width: OG_IMAGE_WIDTH,
		height: OG_IMAGE_HEIGHT,
		fonts: [
			{
				name: "Redaction",
				style: "normal",
				data: await fonts.redaction(origin, "Regular"),
			},
			{
				name: "Redaction Italic",
				style: "italic",
				data: await fonts.redaction(origin, "Italic"),
			},
			{
				name: "Redaction Bold",
				style: "normal",
				data: await fonts.redaction(origin, "Bold"),
			},
			{
				name: "PP Neue Montreal",
				style: "normal",
				data: await fonts.ppNeueMontreal(origin),
			},
		],
	}) satisfies SatoriOptions;
