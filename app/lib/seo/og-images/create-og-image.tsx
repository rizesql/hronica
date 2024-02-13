import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { ogImageOptions } from "./options";

export async function createOGImage(
	template: React.ReactNode,
	props: { origin: string },
) {
	const svg = await satori(template, await ogImageOptions(props.origin));

	// Convert the SVG to PNG with "resvg"
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}
