import { type Rule } from "sanity";

export const articles = {
	name: "article",
	title: "Articles",
	type: "document",

	groups: [
		{ name: "general", title: "General" },
		{ name: "content", title: "Content" },
	],

	fields: [
		{
			name: "title",
			title: "Title",
			description:
				"Every article should have a title that isn't too long or too short. We recommend page titles between 10 and 60 characters",
			type: "string",
			group: "general",
			validation: (r: Rule) => r.required(),
		},
		{
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "title" },
			group: "general",
			validation: (r: Rule) => r.required(),
		},
		{
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
			group: "general",
			validation: (r: Rule) => r.required(),
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "member" }],
			group: "general",
			options: {
				filter: "occupation in $occupation",
				filterParams: { occupation: ["author", "author-and-editor"] },
			},
			validation: (r: Rule) => r.required(),
		},
		{
			name: "editors",
			title: "Corectori",
			type: "array",
			group: "general",

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
		},
		{
			name: "grafician",
			title: "Grafician",
			type: "string",
			group: "general",
		},
		{
			name: "image",
			title: "Image",
			description: "Cover image for the article",
			type: "image",
			group: "general",
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
		},
		{
			name: "date",
			title: "Published date",
			type: "date",
			group: "general",
		},

		{
			name: "article",
			title: "Article",
			type: "array",
			group: "content",

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
				{ type: "embed" },
			],
		},
	],
};
