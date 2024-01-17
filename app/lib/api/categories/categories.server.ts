export * as categories from "./categories.server";

import { parse, asQuery } from "../helpers";

import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";

export const getCategory = async (slug: string, url: string) => {
	const options = h.queries.bySlug(slug, url);
	return await loadQuery(options).then(parse(h.category)).then(asQuery(options));
};

export const getCategories = async (url: string) => {
	const options = h.queries.all(url);
	return await loadQuery(options).then(parse(h.categories)).then(asQuery(options));
};
