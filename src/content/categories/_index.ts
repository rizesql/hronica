import { defineCollection, z } from "astro:content";

export const categories = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    color: z.string()
  })
});
