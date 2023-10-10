import { collection, fields } from "@keystatic/core";

export const categories = collection({
	label: "Categories",
	path: "src/content/categories/*",
	format: { data: "json" },
	slugField: "name",
	schema: {
		name: fields.slug({ name: { label: "Name" } }),
		color: fields.text({ label: "Color", defaultValue: "#ffffff" }),
	},
});
