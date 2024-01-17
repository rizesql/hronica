export * as articles from "./articles.server";

import { parse, asQuery } from "../helpers";

import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";

export const getHeroArticles = async (url: string) => {
	const options = h.queries.hero(url);
	return await loadQuery(options).then(parse(h.arrangedArticles)).then(asQuery(options));
};

export const getArrangedByCategory = async (
	category: string | undefined,
	url: string,
) => {
	const options = h.queries.byCategory(category, url);

	return await loadQuery(options).then(parse(h.arrangedArticles)).then(asQuery(options));
};

export const getArticle = async (slug: string, url: string) => {
	const options = h.queries.bySlug(slug, url);

	return await loadQuery(options)
		.then(parse(h.articleWithContent))
		.then(asQuery(options));
};
