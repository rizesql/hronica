// import { defineField, defineType } from "sanity";

// export const categories = defineType({
export const categories = {
	name: "category",
	title: "Categories",
	type: "document",
	fields: [
		// defineField({ name: "name", type: "string", title: "Name" }),
		{ name: "name", type: "string", title: "Name" },
		// defineField({
		{
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "name" },
		},
		{
			name: "color",
			title: "Color",
			type: "string",
			initialValue: "#ffffff",
		},
	],
	preview: {
		select: {
			name: "name",
			color: "color",
		},
		prepare: ({ name, color }: { name: string; color: string }) => ({
			title: name,
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
};
// );
