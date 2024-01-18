import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";

import { sanityConfig } from "./app/lib/sanity/config";
import { schemas } from "./app/lib/sanity/schemas";

export default defineConfig({
	...sanityConfig,
	name: "revista-ronica",
	title: "Revista Hronica",
	plugins: [
		deskTool(),
		presentationTool({
			previewUrl: "/",
			// locate,
		}),
		visionTool(),
	],
	basePath: "/studio",
	schema: { types: schemas },
});
