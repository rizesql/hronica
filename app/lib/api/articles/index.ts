export * as articles from ".";
export * from "../articles/types";
export * from "./helpers";

import groq from "groq";

import type { ArrangedArticles } from "../articles/types";
import { categories } from "../categories";
import { members } from "../members/";

import { type Article, helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";
import { z } from "zod";
import { parse } from "../helpers";

export const PAGE_SIZE = 10;

const arrangedArticles = z.object({
	firstCol: z.array(h.article).length(3),
	secondCol: z.array(h.article).length(2),
	thirdCol: z.array(h.article).length(5),
});

export const getArticle = async (slug: string, url: string) => {
	const params = { url, article: slug };
	const initial = await loadQuery(GET_ARTICLE_QUERY, params).then(
		parse(h.article.extend({ article: z.any() })),
	);

	return { initial, params, query: GET_ARTICLE_QUERY };
};

export const getArrangedByCategory = async (
	category: string | undefined,
	url: string,
) => {
	const params = { url, category };
	const initial = (await loadQuery(GET_ARTICLES_BY_CATEGORY, params).then(
		parse(arrangedArticles),
	)) as { data: ArrangedArticles };

	return { initial, params, query: GET_ARTICLES_BY_CATEGORY };
};

export const getHeroArticles = async (url: string) => {
	const params = { url };
	const initial = (await loadQuery(GET_HERO_ARTICLES, params).then(
		parse(arrangedArticles),
	)) as { data: ArrangedArticles };

	return { initial, params, query: GET_HERO_ARTICLES };
};
// await getCollection("articles").then(h.arrangeArticles);

// export const getArticlesData = async () => {
// 	const _articles = await getCollection("articles");
// 	return await Promise.all(_articles.map(h.getArticleData));
// };

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

export type FilterFn = (article: Article) => boolean;

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

const QUERY_DATA = groq`
 	_id,
  '_slug': slug.current,
  title,
  date,
  category->{${categories.QUERY_DATA}},
  author->{${members.QUERY_DATA}},
  editors[]->{${members.QUERY_DATA}},
  grafician,
  image {
    asset,
    subtitle
  },
`;

const ARRANGE = (col: string) => groq`{
	"firstCol": ${col}[0..2],
  "secondCol": ${col}[3..4],
  "thirdCol": ${col}[5..9] 
}`;

const GET_ARTICLE_QUERY = groq`
*[_type == "article" && slug.current == $article] {
	${QUERY_DATA}
	article
} | order(date desc)[0]`;

const GET_ARTICLES_BY_CATEGORY = groq`{
	"all": *[_type == "article" && category->slug.current == $category] {
		${QUERY_DATA}
	} | order(date desc)
} | ${ARRANGE("all")}`;

const GET_HERO_ARTICLES = groq`{
	"all": *[_type == "article"] {
  	${QUERY_DATA}
	} | order(date desc)[0..9]
} | ${ARRANGE("all")}`;
