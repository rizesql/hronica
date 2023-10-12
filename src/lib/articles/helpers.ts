export * as helpers from "./helpers";

import { getEntry, type CollectionEntry, getCollection } from "astro:content";

import { members } from "../members/api";
import type { Tuple10 } from "../types";

import type { ArticleData, ArrangedArticles } from "./types";

export const getByCategory = async (category: string | undefined) =>
	await getCollection("articles", filterByCategory(category));

export const sortByDate = (articles: Array<CollectionEntry<"articles">>) =>
	articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const filterByCategory =
	(category: string | undefined) => (article: CollectionEntry<"articles">) =>
		article.data.category.id === category;

export const filterByAuthor =
	(author: string | undefined) => (article: CollectionEntry<"articles">) =>
		article.data.author.id === author;

export const getWhithinRange =
	(left: number, right: number) => (articles: Array<CollectionEntry<"articles">>) =>
		articles.filter((_, idx) => idx >= left && idx <= right);

export const getArticleData = async (
	article: CollectionEntry<"articles">,
): Promise<ArticleData> => {
	const [category, author] = await Promise.all([
		getEntry(article.data.category),
		members.getMember(article.data.author),
	]);
	return {
		...article.data,
		render: article.render,
		href: article.slug,
		category,
		author,
		body: article.body,
	} satisfies ArticleData;
};

export const arrangeArticles = async (articles: Array<CollectionEntry<"articles">>) => {
	const heroArticles = (await Promise.all(
		articles.slice(0, 10).map(getArticleData),
	)) as Tuple10<ArticleData>;

	const [first, second, third, fourth, fifth, ...rest] = heroArticles;

	return {
		firstCol: [first, second, third],
		secondCol: [fourth, fifth],
		thirdCol: rest,
	} satisfies ArrangedArticles;
};

export const normalizeLastPage = (articles: ArrangedArticles) => {
	return [
		...articles.firstCol.filter(Boolean),
		...articles.secondCol.filter(Boolean),
		...articles.thirdCol.filter(Boolean),
	];
};
