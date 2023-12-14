import { defineCollection, z } from "astro:content";

const year = z
	.number()
	.min(1980)
	.max(new Date(Date.now()).getFullYear() + 1);

export const members = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			occupation: z.enum(["author", "editor", "author-and-editor"]),
			class: z.enum(["a", "b", "c", "d", "e", "f", "g", "h"]),
			promotion: z
				.number()
				.min(1980)
				.max(new Date(Date.now()).getFullYear() + 1),

			seniority: z.object({
				begin: year,
				end: year.optional(),
			}),

			photo: image().optional(),
			social: z.array(
				z.object({
					platform: z.string(),
					url: z.string().url(),
				}),
			),
		}),
});
