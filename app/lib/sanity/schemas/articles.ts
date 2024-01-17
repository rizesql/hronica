import { defineField, defineType } from "sanity";

export const articles = defineType({
	name: "article",
	title: "Articles",
	type: "document",

	fields: [
		defineField({
			name: "article",
			title: "Article",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "H1", value: "h1" },
						{ title: "H2", value: "h2" },
						{ title: "H3", value: "h3" },
						{ title: "H4", value: "h4" },
						{ title: "H5", value: "h5" },
						{ title: "H6", value: "h6" },
						{ title: "Quote", value: "blockquote" },
					],
					lists: [
						{ title: "Bullet", value: "bullet" },
						{ title: "Numbered", value: "number" },
					],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" },
							{ title: "Code", value: "code" },
						],
					},
				},
				{ type: "image" },
			],
		}),

		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "title" },
			validation: (r) => r.required(),
		}),

		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
			validation: (r) => r.required(),
		}),

		defineField({
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "member" }],
			options: {
				filter: "occupation in $occupation",
				filterParams: { occupation: ["author", "author-and-editor"] },
			},
			validation: (r) => r.required(),
		}),

		defineField({
			name: "editors",
			title: "Corectori",
			type: "array",

			of: [
				{
					type: "reference",
					to: [{ type: "member" }],
					options: {
						filter: "occupation in $occupation",
						filterParams: { occupation: ["editor", "author-and-editor"] },
					},
				},
			],
		}),

		defineField({
			name: "grafician",
			title: "Grafician",
			type: "string",
		}),

		defineField({
			name: "image",
			title: "Image",
			description: "Cover image for the article",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "subtitle",
					title: "Image subtitle",
					description: "(optional)",
					type: "string",
				},
			],
		}),

		defineField({
			name: "date",
			title: "Published date",
			type: "date",
		}),
	],
});
