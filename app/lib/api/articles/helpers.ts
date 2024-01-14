export * as helpers from "./helpers";

import groq from "groq";
import { z } from "zod";

import { category } from "../categories";
import { parse } from "../helpers";
import { member, members } from "../members/helpers";

import type { ArrangedArticles } from "./types";

import { loadQuery } from "~/lib/sanity/loader.server";
import type { Tuple10 } from "~/lib/types";

export const article = z.object({
	_id: z.string(),
	_slug: z.string(),
	title: z.string(),
	// date: z.date({ coerce: true }).transform((d) => d.toUTCString()),
	date: z.string(),
	category,
	author: member,
	editors: members.nullable(),
	grafician: z.string().nullable(),
	image: z.object({
		asset: z.object({ _ref: z.string() }),
		subtitle: z.string().nullable(),
	}),
});

export const articles = z.array(article);

export type Article = z.infer<typeof article>;

export const getByCategory = async (category: string | undefined, url: string) => {
	const params = { url, category };
	const initial = await loadQuery(GET_ARTICLES_BY_CATEGORY, params).then(parse(articles));

	return { initial, params, query: GET_ARTICLES_BY_CATEGORY };
};

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

export const arrangeArticles = (articles: readonly Article[]) => {
	const heroArticles = articles.slice(0, 10) as Tuple10<Article>;

	const [first, second, third, fourth, fifth, ...rest] = heroArticles;

	return {
		data: {
			firstCol: [first, second, third],
			secondCol: [fourth, fifth],
			thirdCol: rest,
		} satisfies ArrangedArticles,
	};
};

export const normalizeLastPage = (articles: ArrangedArticles) => {
	// return [];
	return [
		...articles.firstCol.filter(Boolean),
		...articles.secondCol.filter(Boolean),
		...articles.thirdCol.filter(Boolean),
	];
};

const GET_ARTICLES = groq`
*[_type == "article"] {
  _id,
  '_slug': slug.current,
  title,
  date,
  category->,
  author->,
  editors[]->,
  grafician,
  image {
    asset,
    subtitle
  },
  article
} | order(date desc)`;

const GET_ARTICLE_BY_ID = groq`
*[_type == "article" && _id == $id] {
  _id,
  '_slug': slug.current,
  title,
  date,
  category->,
  author->,
  editors[]->,
  grafician,
  image {
    asset,
    subtitle
  },
  article
} | order(date desc)`;

const GET_ARTICLES_BY_CATEGORY = groq`
*[_type == "article" && category->slug.current == $category] {
  _id,
  '_slug': slug.current,
  title,
  date,
  category->,
  author->,
  editors[]->,
  grafician,
  image {
    asset,
    subtitle
  },
  article
} | order(date desc)`;
