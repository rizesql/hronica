import { collection, fields } from "@keystatic/core";

export const authors = collection({
	label: "Authors",
	slugField: "name",
	path: "src/content/authors/*",
	format: { data: "json" },
	schema: {
		name: fields.slug({ name: { label: "Name" } }),
	},
});
