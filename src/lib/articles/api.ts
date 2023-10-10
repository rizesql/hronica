import { getCollection, type CollectionEntry } from "astro:content";

import {
	filterByCategory,
	filterByAuthor,
	sortByDate,
	intoHeroArticles,
	getWhithinRange,
	toFullArticle,
} from "./helpers";
import type { HeroArticles } from "./types";

const PAGE_SIZE = 10;

const getByCategory = async (category: string | undefined) =>
	await getCollection("articles", filterByCategory(category)).then(sortByDate);

const getByAuthor = async (author: string | undefined) =>
	await getCollection("articles", filterByAuthor(author));

const getHeroesByCategory = async (category: string | undefined) =>
	await getByCategory(category).then(intoHeroArticles);

const getHeroesByAuthor = async (author: string | undefined) =>
	await getByAuthor(author).then(intoHeroArticles);

const getHeroes = async () =>
	await getCollection("articles").then(sortByDate).then(intoHeroArticles);

const getFullArticles = async () => {
	const _articles = await getCollection("articles");
	return await Promise.all(_articles.map(toFullArticle));
};

// const pagesCount = async (category: string | undefined) => {
// 	const articles = await getCollection("articles", filterByCategory(category));

// 	return Math.ceil(articles.length / PAGE_SIZE);
// };

const pagesCount = async (filter: FilterFn) => {
	const articles = await getCollection("articles", filter);

	return Math.ceil(articles.length / PAGE_SIZE);
};

export type CategoryParams = {
	id: string | undefined;
	articlesCount: number;
};

export type FeedParams = {
	articlesCount: number;
};

export type FeedData = {
	articles: HeroArticles;
	nextPage: number | null;
};

// const loadNext =
// 	(categoryParams: CategoryParams) =>
// 	async (context: { pageParam: number }): Promise<FeedData> => {
// 		const articles = await getByCategory(categoryParams.id)
// 			.then(getWhithinRange(context.pageParam, context.pageParam + PAGE_SIZE))
// 			.then(intoHeroArticles);

// 		const nextPage =
// 			context.pageParam / PAGE_SIZE < categoryParams.articlesCount - 1
// 				? context.pageParam + PAGE_SIZE
// 				: null;

// 		return { articles, nextPage };
// 	};
export type FilterFn = (article: CollectionEntry<"articles">) => boolean;

const loadNext =
	(feedParams: FeedParams, filter: (article: CollectionEntry<"articles">) => boolean) =>
	async (context: { pageParam: number }): Promise<FeedData> => {
		const articles = await getCollection("articles", filter)
			.then(sortByDate)
			.then(getWhithinRange(context.pageParam, context.pageParam + PAGE_SIZE))
			.then(intoHeroArticles);

		const nextPage =
			context.pageParam / PAGE_SIZE < feedParams.articlesCount - 1
				? context.pageParam + PAGE_SIZE
				: null;

		return { articles, nextPage };
	};

const normalizeLastPage = (articles: HeroArticles) => {
	return [
		...articles.firstCol.filter(Boolean),
		...articles.secondCol.filter(Boolean),
		...articles.thirdCol.filter(Boolean),
	];
};

export const articlesApi = {
	getHeroes,
	getByCategory,
	getHeroesByCategory,
	getHeroesByAuthor,
	getFullArticles,
	loadNext,
	pagesCount,
	PAGE_SIZE,
	normalizeLastPage,
} as const;
