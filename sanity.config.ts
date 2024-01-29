import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { presentationTool } from "sanity/presentation";

import { sanityConfig } from "./app/lib/sanity/config";
import { schemas } from "./app/lib/sanity/schemas";
import { defaultDocumentNode } from "./app/lib/sanity/ui/default-document-node";

export default defineConfig({
	...sanityConfig,
	name: "revista-ronica",
	title: "Revista Hronica",
	plugins: [
		deskTool({
			title: "Content",
			defaultDocumentNode,
		}),
		presentationTool({
			previewUrl: "/",
			title: "Live Preview",
		}),
		...(import.meta.env.DEV ? [visionTool()] : []),
	],
	basePath: "/studio",
	schema: { types: schemas },
});
