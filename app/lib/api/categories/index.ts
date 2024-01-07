export * as categories from ".";
export * from "./helpers";

import groq from "groq";
import { helpers as h } from "./helpers";

import { ensureDefined } from "~/lib/types";
import { loadQuery } from "~/lib/sanity/loader.server";

// const none: Record<never, never> = {} as const;

// export const getCategory = async (id: string) =>
// 	await getEntry({ collection: "categories", id })
// 		.then(ensureDefined)
// 		.then(h.getCategoryData);

export const getCategories = async (url: string) => {
	const params = { url };
	const initial = await loadQuery(CATEGORIES_QUERY, params)
		.then(ensureDefined)
		.then(h.getCategoryData);

	return { initial, query: CATEGORIES_QUERY, params } as const;
};

const CATEGORIES_QUERY = groq`*[_type == "category"] {
  _id,
  name,
  color
}`;
