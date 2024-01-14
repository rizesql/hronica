import { defineField, defineType } from "sanity";

export const categories = defineType({
	name: "category",
	title: "Categories",
	type: "document",
	fields: [
		defineField({ name: "name", type: "string", title: "Name" }),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "name" },
		}),
		defineField({
			name: "color",
			title: "Color",
			type: "string",
			initialValue: "#ffffff",
		}),
	],
	preview: {
		select: {
			name: "name",
			color: "color",
		},
		prepare: ({ name, color }) => ({
			title: name as string,
			media: (
				<span
					style={{
						color: "white",
						width: "32px",
						height: "32px",
						background: color,
						borderRadius: "6px",
					}}
				/>
			),
		}),
	},
});
