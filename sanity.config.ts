import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { sanityConfig } from "./app/lib/sanity/config";
import { schemas } from "./app/lib/sanity/schemas";

import { locate } from "~/lib/sanity/locate";

export default defineConfig({
	...sanityConfig,
	name: "revista-ronica",
	title: "Revista Hronica",
	plugins: [
		structureTool({
			title: "Content",
		}),
		presentationTool({
			previewUrl: "/",
			title: "Live Preview",
			locate,
		}),
		...(import.meta.env.DEV ? [visionTool()] : []),
	],
	basePath: "/studio",
	schema: { types: schemas },
});
