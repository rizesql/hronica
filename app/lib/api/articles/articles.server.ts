export * as articles from "./articles.server";

import { asQuery, parse } from "../helpers";

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
	return await loadQuery(options).then(parse(h.article)).then(asQuery(options));
};

export const getArticleContent = async (slug: string, url: string) => {
	const options = h.queries.content(slug, url);

	return await loadQuery(options).then(parse(h.articleContent)).then(asQuery(options));
};

export const getReadingTime = async (slug: string, url: string) => {
	const options = h.queries.readingTime(slug, url);

	return await loadQuery(options).then(parse(h.readingTime)).then(asQuery(options));
};
