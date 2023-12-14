import type { CollectionEntry } from "astro:content";

export * as helpers from "./helpers";

export const getCategoryData = (category: CollectionEntry<"categories">) => ({
	...category.data,
	id: category.id,
});

export type Category = Awaited<ReturnType<typeof getCategoryData>>;
