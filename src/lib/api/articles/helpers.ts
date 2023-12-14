export * as helpers from "./helpers";

import { type CollectionEntry, getCollection } from "astro:content";

import { categories } from "../categories";
import { members } from "../members";

import type { ArrangedArticles } from "./types";

import type { Tuple10 } from "~/lib/types";

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

export const filterByEditor =
	(id: string | undefined) => (article: CollectionEntry<"articles">) =>
		article.data.editors.length === 0
			? false
			: article.data.editors.filter((e) => e.id === id).length === 1;

export const filterByOccupation = (
	occupation: "author" | "editor",
	id: string | undefined,
) => (occupation === "author" ? filterByAuthor(id) : filterByEditor(id));

export const getWhithinRange =
	(left: number, right: number) => (articles: Array<CollectionEntry<"articles">>) =>
		articles.filter((_, idx) => idx >= left && idx <= right);

export const getArticleData = async (article: CollectionEntry<"articles">) => {
	const [category, author] = await Promise.all([
		categories.getCategory(article.data.category.id),
		members.getMember(article.data.author.id),
	]);

	return {
		...article.data,
		render: article.render,
		href: article.slug,
		category,
		author,
		body: article.body,
	} as const;
};

export type Article = Awaited<ReturnType<typeof getArticleData>>;

export const arrangeArticles = async (articles: Array<CollectionEntry<"articles">>) => {
	const heroArticles = (await Promise.all(
		articles.slice(0, 10).map(getArticleData),
	)) as Tuple10<Article>;

	const [first, second, third, fourth, fifth, ...rest] = heroArticles;

	return {
		firstCol: [first, second, third],
		secondCol: [fourth, fifth],
		thirdCol: rest,
	} satisfies ArrangedArticles;
};

export const normalizeLastPage = (articles: ArrangedArticles) => {
	// return [];
	return [
		...articles.firstCol.filter(Boolean),
		...articles.secondCol.filter(Boolean),
		...articles.thirdCol.filter(Boolean),
	];
};
