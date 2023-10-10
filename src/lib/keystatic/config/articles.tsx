import { NotEditable, collection, component, fields } from "@keystatic/core";

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
			collection: "categories",
			validation: { isRequired: true },
		}),
		author: fields.relationship({
			label: "Author",
			collection: "authors",
			validation: { isRequired: true },
		}),
		image: fields.image({
			label: "Image",
			description: "Cover image for the article",
			directory: "src/assets/images/articles",
			publicPath: "../../assets/images/articles/",
		}),
		date: fields.date({ label: "Published date", defaultValue: { kind: "today" } }),
		layout: fields.select({
			label: "Hero layout",
			options: [
				{ label: "Basic", value: "basic" },
				{ label: "Content - Photo columns", value: "columns" },
			],
			defaultValue: "basic",
		}),
		description: fields.text({ multiline: true, label: "Description" }),
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
			images: {
				directory: "src/assets/images/articles",
				publicPath: "../../assets/images/articles/",
			},
			componentBlocks: {
				youtube: component({
					label: "Youtube video",
					schema: {
						id: fields.text({ label: "Link" }),
					},
					preview: ({ fields }) => (
						<NotEditable>
							<a href={fields.id.value} target="_blank" referrerPolicy="no-referrer">
								{fields.id.value}
							</a>
						</NotEditable>
					),
				}),
			},
		}),
	},
});
