import groq from "groq";
import { z } from "zod";

import { asQuery, parse } from "../helpers";

import {
	ARRANGE,
	ARTICLE_DATA,
	arrangedArticles,
	article,
	type Article,
} from "./helpers";
import { type ArrangedArticles } from "./types";

import { type Query } from "~/lib/sanity/loader";
import { loadQuery } from "~/lib/sanity/loader.server";

export * as feed from "./infinite";

export const PAGE_SIZE = 10;

export type FeedParams = { articlesCount: number };

export type FilterFn = (article: Article) => boolean;
export type Filter = { query: string; params: Record<string, string> };

export const parseQueryParams = (request: Request) => {
	const searchParams = new URL(request.url).searchParams;
	const cursor = searchParams.get("cursor");
	const lastId = searchParams.get("lastId");
	const rawCount = searchParams.get("count");

	const queryParams =
		!cursor || !lastId || !rawCount
			? { cursor: null, lastId: null, count: null }
			: { cursor, lastId, count: +rawCount };

	return queryParams;
};

const page = z.object({
	data: arrangedArticles,
	pagination: z.object({
		cursor: z.string().nullable(),
		lastId: z.string().nullable(),
		count: z.number().nullable(),
	}),
	rowsFetched: z.number(),
});

const lastPage = z.object({
	data: z.array(article),
	pagination: z.object({
		cursor: z.string().nullable(),
		lastId: z.string().nullable(),
		count: z.number().nullable(),
	}),
	rowsFetched: z.number(),
});

export type Page = z.infer<typeof page>;
export type LastPage = z.infer<typeof lastPage>;
export type AnyPage = Page | LastPage;

export const loadNext = async (
	filter: Filter,
	params:
		| { url: string; cursor: string; lastId: string; count: number }
		| { url: string; cursor: null; lastId: null; count: null },
) => {
	const first = params.cursor === null;
	const query = LOAD_NEXT(filter, first);

	const options = { query, params: { ...params, ...filter.params } };
	return await loadQuery(options)
		.then((d) => {
			return (
				(d.data as { rowsFetched: number }).rowsFetched >= 10
					? parse(page)
					: parse(lastPage)
			)(d);
		})
		.then((x) => asQuery(options)(x) as Query<AnyPage>);
};

export const normalizeLastPage = (articles: ArrangedArticles) => {
	return [
		...articles.firstCol.filter(Boolean),
		...articles.secondCol.filter(Boolean),
		...articles.thirdCol.filter(Boolean),
	];
};

const LOAD_NEXT = (filter: Filter, first: boolean) => {
	const paginate = first ? "" : "&& date < $cursor || (date == $cursor && _id > $lastId)";
	return groq`{
		"all": *[_type == "article" && ${filter.query} ${paginate}] | order(date desc) [0..9] {
			${ARTICLE_DATA}
		},
		"rowsCount": count("all")
	} | {
		...,
		"pagination": {
			"cursor": all[9].date,
			"lastId": all[9]._id,
			"count": ${first ? `count(*[_type== "article" && ${filter.query}])` : "$count"}
		},
		"rowsFetched": count(all)
	} | {
		...,
		"data": select(
			rowsFetched < 10 => all,
			rowsFetched >= 10 => ${ARRANGE("all")}
		)
	}
`;
};
