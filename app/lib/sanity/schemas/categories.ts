import { defineField, defineType } from "sanity";

export const categories = defineType({
	name: "category",
	title: "Category",
	type: "document",
	fields: [
		defineField({ name: "name", type: "string", title: "Name" }),
		defineField({
			name: "color",
			type: "string",
			title: "Color",
			initialValue: "#ffffff",
		}),
	],
	preview: {
		select: {
			name: "name",
		},
		prepare: ({ name }) => ({ title: name as string }),
	},
});
