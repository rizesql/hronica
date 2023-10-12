import { defineCollection, reference, z } from "astro:content";

export const articles = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			category: reference("categories"),
			author: reference("members"),
			// todo remove optional
			editors: z.array(reference("members")).optional(),
			// todo remove optional
			grafician: z.string().optional(),
			image: image(),
			imageSubtitle: z.string().optional(),
			date: z.date({ coerce: true }),
			layout: z.enum(["basic", "columns"]),
		}),
});
