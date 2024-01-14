export * as categories from ".";
export * from "./helpers";

import groq from "groq";
import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";
import { parse } from "~/lib/api/helpers";

export const getCategory = async (slug: string, url: string) => {
	const params = { url, category: slug };
	const initial = await loadQuery(CATEGORY_QUERY, params).then(parse(h.category));

	return { initial, params, query: CATEGORY_QUERY };
};

export const getCategories = async (url: string) => {
	const params = { url };
	const initial = await loadQuery(CATEGORIES_QUERY, params).then(parse(h.categories));

	return { initial, query: CATEGORIES_QUERY, params } as const;
};

export const QUERY_DATA = groq`
	_id,
	'_slug': slug.current,
  name,
	color
`;

const CATEGORIES_QUERY = groq`*[_type == "category"] {${QUERY_DATA}}`;
export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $category] {
	${QUERY_DATA}
}[0]`;
