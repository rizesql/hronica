import { collection, fields } from "@keystatic/core";

import { youtube } from "./components/youtube";
import { collections } from "./utils";

const images = {
	directory: "src/assets/images/articles",
	publicPath: "../../assets/images/articles/",
} as const;

export const articles = collection({
	label: "Articles",
	slugField: "title",
	path: "src/content/articles/*",
	entryLayout: "content",
	format: {
		contentField: "content",
	},
	schema: {
		title: fields.slug({
			name: { label: "Title" },
			slug: {
				label: "URL",

				description:
					"This field is auto-generated. Please don't change by hand. If you change the title field, but this field is not changed, press the 'Regenerate' button",
			},
		}),

		category: fields.relationship({
			label: "Category",
			collection: collections.categories,
			validation: { isRequired: true },
		}),

		author: fields.relationship({
			label: "Author",
			collection: collections.members,
			validation: { isRequired: true },
		}),

		editors: fields.array(
			fields.relationship({
				label: "Corectori",
				collection: collections.members,
				validation: { isRequired: false },
			}),
			{
				label: "Corectori",
				itemLabel: (a) => a.value ?? "",
			},
		),

		grafician: fields.text({ label: "Grafician" }),

		image: fields.image({
			label: "Image",
			description: "Cover image for the article",
			...images,
		}),

		imageSubtitle: fields.text({
			label: "Image subtitle",
			description: "(optional)",
		}),

		date: fields.date({
			label: "Published date",
			defaultValue: { kind: "today" },
		}),

		layout: fields.select({
			label: "Hero layout",
			options: [
				{ label: "Basic", value: "basic" },
				{ label: "Content - Photo columns", value: "columns" },
			],
			defaultValue: "basic",
		}),

		content: fields.document({
			label: "Article",
			formatting: {
				alignment: true,
				blockTypes: true,
				headingLevels: true,
				inlineMarks: true,
				listTypes: true,
				softBreaks: true,
			},
			links: true,
			dividers: true,
			tables: true,
			layouts: [[1], [1, 1], [1, 2], [2, 1], [1, 1, 1], [1, 2, 1], [2, 1, 1], [1, 1, 2]],
			images,
			componentBlocks: {
				youtube,
			},
		}),
	},
});
