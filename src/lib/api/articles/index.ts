export * as articles from ".";
export * from "../articles/types";
export * from "./helpers";

import { getCollection, type CollectionEntry } from "astro:content";

import { helpers as h } from "./helpers";
import type { ArrangedArticles } from "../articles/types";

export const PAGE_SIZE = 10;

export const getArrangedByCategory = async (category: string | undefined) =>
	await h.getByCategory(category).then(h.sortByDate).then(h.arrangeArticles);

export const getArranged = async () =>
	await getCollection("articles").then(h.sortByDate).then(h.arrangeArticles);

export const getArticlesData = async () => {
	const _articles = await getCollection("articles");
	return await Promise.all(_articles.map(h.getArticleData));
};

export const pagesCount = async (filter: FilterFn) => {
	const articles = await getCollection("articles", filter);

	return Math.ceil(articles.length / PAGE_SIZE);
};

export type FeedParams = {
	articlesCount: number;
};

export type FeedData = {
	articles: ArrangedArticles;
	nextPage: number | null;
};

export type FilterFn = (article: CollectionEntry<"articles">) => boolean;

export const loadNext =
	(feedParams: FeedParams, filter: (article: CollectionEntry<"articles">) => boolean) =>
	async (context: { pageParam: number }) => {
		const articles = await getCollection("articles", filter)
			.then(h.sortByDate)
			.then(h.getWhithinRange(context.pageParam, context.pageParam + PAGE_SIZE))
			.then(h.arrangeArticles);

		const nextPage =
			context.pageParam / PAGE_SIZE < feedParams.articlesCount - 1
				? context.pageParam + PAGE_SIZE
				: null;

		return { articles, nextPage } as const;
	};
