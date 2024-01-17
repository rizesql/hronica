export * as helpers from "./helpers";

import groq from "groq";
import { z } from "zod";

import { category, CATEGORY_DATA } from "../categories/helpers";
import { helpers as memberH } from "../members/helpers";

import type { Tuple10 } from "~/lib/types";

export const article = z.object({
	_id: z.string(),
	_slug: z.string(),
	title: z.string(),
	date: z.string(),
	category,
	author: memberH.member,
	editors: memberH.members.nullable(),
	grafician: z.string().nullable(),
	image: z.object({
		asset: z.object({ _ref: z.string() }),
		subtitle: z.string().nullable(),
	}),
});

export const articleWithContent = article.extend({ content: z.any() });

export const arrangedArticles = z.object({
	firstCol: z.array(article).length(3),
	secondCol: z.array(article).length(2),
	thirdCol: z.array(article).length(5),
});

export const articles = z.array(article);

export type Article = z.infer<typeof article>;

export type ArrangedArticles = z.infer<typeof arrangedArticles>;

// export const getByCategory = async (category: string | undefined, url: string) => {
// 	const params = { url, category };
// 	const initial = await loadQuery(GET_ARTICLES_BY_CATEGORY, params).then(parse(articles));

// 	return { initial, params, query: GET_ARTICLES_BY_CATEGORY };
// };

// export const sortByDate = (articles: Array<CollectionEntry<"articles">>) =>
// 	articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// export const filterByCategory =
// 	(category: string | undefined) => (article: CollectionEntry<"articles">) =>
// 		article.data.category.id === category;

// export const filterByAuthor =
// 	(author: string | undefined) => (article: CollectionEntry<"articles">) =>
// 		article.data.author.id === author;

// export const filterByEditor =
// 	(id: string | undefined) => (article: CollectionEntry<"articles">) =>
// 		article.data.editors.length === 0
// 			? false
// 			: article.data.editors.filter((e) => e.id === id).length === 1;

// export const filterByOccupation = (
// 	occupation: "author" | "editor",
// 	id: string | undefined,
// ) => (occupation === "author" ? filterByAuthor(id) : filterByEditor(id));

// export const getWhithinRange =
// 	(left: number, right: number) => (articles: Array<CollectionEntry<"articles">>) =>
// 		articles.filter((_, idx) => idx >= left && idx <= right);

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

export const queries = {
	hero: (url: string) => ({
		params: { url },
		query: GET_HERO_ARTICLES,
	}),
	byCategory: (category: string | undefined, url: string) => ({
		params: { category, url },
		query: GET_ARTICLES_BY_CATEGORY,
	}),
	bySlug: (slug: string, url: string) => ({
		params: { article: slug, url },
		query: GET_ARTICLE,
	}),
} as const;

export const ARTICLE_DATA = groq`
 	_id,
  '_slug': slug.current,
  title,
  date,
  category->{${CATEGORY_DATA}},
  author->{${memberH.MEMBER_DATA}},
  editors[]->{${memberH.MEMBER_DATA}},
  grafician,
  image {
    asset,
    subtitle
  },
`;

export const ARRANGE = (col: string) => groq`{
	"firstCol": ${col}[0..2],
  "secondCol": ${col}[3..4],
  "thirdCol": ${col}[5..9] 
}`;

const GET_ARTICLE = groq`
*[_type == "article" && slug.current == $article] {
	${ARTICLE_DATA}
	'content': article
} | order(date desc)[0]`;

const GET_ARTICLES_BY_CATEGORY = groq`{
	"all": *[_type == "article" && category->slug.current == $category] {
		${ARTICLE_DATA}
	} | order(date desc)
} | ${ARRANGE("all")}`;

const GET_HERO_ARTICLES = groq`{
	"all": *[_type == "article"] {
  	${ARTICLE_DATA}
	} | order(date desc)[0..9]
} | ${ARRANGE("all")}`;
