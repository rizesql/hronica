import { getEntry, type CollectionEntry } from "astro:content";

import type { Tuple10 } from "../types";

import type { FullArticle, HeroArticles } from "./types";

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

export const toFullArticle = async (
	article: CollectionEntry<"articles">,
): Promise<FullArticle> => {
	const [category, author] = await Promise.all([
		getEntry(article.data.category),
		getEntry(article.data.author),
	]);
	return {
		...article.data,
		render: article.render,
		href: article.slug,
		category,
		author,
		body: article.body,
	} satisfies FullArticle;
};

export const intoHeroArticles = async (articles: Array<CollectionEntry<"articles">>) => {
	const _heroArticles = await Promise.all(articles.slice(0, 10).map(toFullArticle));
	const heroArticles = _heroArticles as Tuple10<FullArticle>;

	const [first, second, third, fourth, fifth, ...rest] = heroArticles;

	return {
		firstCol: [first, second, third],
		secondCol: [fourth, fifth],
		thirdCol: rest,
	} satisfies HeroArticles;
};
