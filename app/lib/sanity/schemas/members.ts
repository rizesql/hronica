// import { defineField, defineType } from "sanity";

import { type Rule } from "sanity";

export const OCCUPATIONS = [
	{ title: "Autor", value: "author" },
	{ title: "Corector", value: "editor" },
	{ title: "Autor si Corector", value: "author-and-editor" },
];

const CLASSES = [
	{ title: "A", value: "a" },
	{ title: "B", value: "b" },
	{ title: "C", value: "c" },
	{ title: "D", value: "d" },
	{ title: "E", value: "e" },
	{ title: "F", value: "f" },
	{ title: "G", value: "g" },
	{ title: "H", value: "h" },
];

// export const members = defineType({
export const members = {
	name: "member",
	title: "Members",
	type: "document",
	fields: [
		// defineField({
		{
			name: "name",
			type: "string",
			title: "Name",
			validation: (r: Rule) => r.required(),
		},
		{
			name: "slug",
			type: "slug",
			title: "Slug",
			options: { source: "name" },
			validation: (r: Rule) => r.required(),
		},

		{
			name: "occupation",
			title: "Pozitie",
			type: "string",
			options: {
				list: OCCUPATIONS.map(({ title, value }) => ({ title, value })),
				layout: "dropdown",
			},
			validation: (r: Rule) => r.required(),
		},

		{
			name: "class",
			title: "Clasa",
			initialValue: "a",
			type: "string",
			options: {
				list: CLASSES.map(({ title, value }) => ({ title, value })),
				layout: "dropdown",
			},
		},

		{
			name: "promotion",
			title: "Promotia",
			type: "number",

			description:
				"Alege anul in care ai inceput liceul, pentru a determina promotia din care faci parte. (eg. 2019 -> faci parte din promotia 2019-2023). \n IMPORTANT! Nu introduce o data mai inaintata de anul curent.",
			validation: (r: Rule) =>
				r
					.required()
					.integer()
					.greaterThan(1980)
					.lessThan(new Date(Date.now()).getFullYear() + 1),
		},

		{
			name: "seniority",
			title: "Vechimea in echipa Hronicii",
			type: "object",
			fields: [
				{
					name: "begin",
					title: "Anul inceperii",

					type: "number",
					validation: (r: Rule) =>
						r
							.required()
							.integer()
							.greaterThan(1980)
							.lessThan(new Date(Date.now()).getFullYear() + 1),
				},
				{
					name: "end",
					title: "Anul incheierii",
					description: "Daca inca esti activ(ă) in echipa, lasa acest camp gol",
					type: "number",

					validation: (r: Rule) =>
						r
							.integer()
							.greaterThan(1980)
							.lessThan(new Date(Date.now()).getFullYear() + 1),
				},
			],
			validation: (r: Rule) => r.required(),
		},

		{
			name: "social",
			title: "Linkuri de social media",
			type: "array",

			of: [
				{
					type: "object",
					fields: [
						{ type: "string", name: "platform", title: "Platforma" },
						{ type: "url", name: "url", title: "URL" },
					],
				},
			],
		},

		{
			name: "photo",
			title: "Poza de profil",
			description: "(optional)",
			type: "image",
			options: {
				hotspot: true,
				metadata: ["blurhash", "lqip"],
			},
		},
	],
};
