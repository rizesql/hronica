import { defineCollection, z } from "astro:content";

export const authors = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		// todo: add photo
	}),
});
