export * as categories from ".";
export * from "./helpers";

import { getCollection, getEntry } from "astro:content";

import { helpers as h } from "./helpers";

import { ensureDefined } from "~/lib/types";

export const getCategory = async (id: string) =>
	await getEntry({ collection: "categories", id })
		.then(ensureDefined)
		.then(h.getCategoryData);

export const getCategories = async () => {
	const _categories = await getCollection("categories");
	return await Promise.all(_categories.map(h.getCategoryData));
};
