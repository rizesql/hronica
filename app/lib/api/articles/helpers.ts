export * as helpers from "./helpers";

import groq from "groq";
import { z } from "zod";

import { category, CATEGORY_DATA } from "../categories/helpers";
import { helpers as memberH } from "../members/helpers";

import { COL_SIZES, PAGE_SIZE } from "./infinite";

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

export const arrangedArticles = z.object({
	firstCol: z.array(article).length(COL_SIZES.first),
	secondCol: z.array(article).length(COL_SIZES.second),
	thirdCol: z.array(article).length(COL_SIZES.third),
});

export const articleContent = z.object({
	content: z.any(),
});

export const articles = z.array(article);

export type Article = z.infer<typeof article>;
export type ArrangedArticles = z.infer<typeof arrangedArticles>;
export type ArticleContent = z.infer<typeof articleContent>;

export const readingTime = z.object({
	readingTime: z.number().nonnegative(),
});

export type ReadingTime = z.infer<typeof readingTime>;

const READING_TIME_OPTIONS = {
	wpm: 180,
	meanWordLen: 5,
} as const;

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
	content: (slug: string, url: string) => ({
		params: { article: slug, url },
		query: GET_ARTICLE_CONTENT,
	}),
	readingTime: (slug: string, url: string) => ({
		params: { article: slug, url, ...READING_TIME_OPTIONS },
		query: GET_READING_TIME,
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
	"firstCol": ${col}[0..${COL_SIZES.first - 1}],
  "secondCol": ${col}[${COL_SIZES.first}..${COL_SIZES.first + COL_SIZES.second - 1}],
  "thirdCol": ${col}[${COL_SIZES.first + COL_SIZES.second}..${COL_SIZES.first + COL_SIZES.second + COL_SIZES.third - 1}] 
}`;

const GET_ARTICLE = groq`
*[_type == "article" && slug.current == $article] {
	${ARTICLE_DATA}
} | order(date desc)[0]`;

const GET_ARTICLE_CONTENT = groq`
*[_type == "article" && slug.current == $article] {
	"content": article
}[0]`;

const GET_ARTICLES_BY_CATEGORY = groq`{
	"all": *[_type == "article" && category->slug.current == $category] {
		${ARTICLE_DATA}
	} | order(date desc)
} | ${ARRANGE("all")}`;

const GET_HERO_ARTICLES = groq`{
	"all": *[_type == "article"] {
  	${ARTICLE_DATA}
	} | order(date desc)[0..${PAGE_SIZE - 1}]
} | ${ARRANGE("all")}`;

const GET_READING_TIME = groq`
*[_type == "article" && slug.current == $article] {
	"characters": length(pt::text(article))
} | {
  "readingTime": round(characters / $meanWordLen / $wpm)
}[0]`;
