import { defineCollection, reference, z } from "astro:content";

export const articles = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			category: reference("categories"),
			date: z.date({ coerce: true }),
			author: reference("authors"),
			image: image(),
			layout: z.enum(["basic", "columns"]),
		}),
});
