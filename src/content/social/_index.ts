import { defineCollection, z } from "astro:content";

export const social = defineCollection({
	type: "data",
	schema: z.object({
		social: z.array(
			z.object({
				platform: z.string(),
				url: z.string().url(),
			}),
		),
	}),
});
