import React from "react";

import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, type MetaFunction } from "@remix-run/react";
import groq from "groq";

import { ArticleContent } from "./content";

import { Section } from "~/components/ui";
import { api } from "~/lib/api";
import { asQuery } from "~/lib/api/helpers";
import { useQuery } from "~/lib/sanity/loader";
import { _seo } from "~/lib/seo";
import { getSitemapEntries } from "~/lib/sitemap";
import { SERVER_TIMING, makeTiming, timingHeaders } from "~/lib/timings.server";

export const meta: MetaFunction<typeof loader> = ({ data }) =>
	_seo({ title: data?.articleQuery.initial.data.title });

const sitemapQuery = groq`
	*[defined(slug.current) && _type == "article"] {
		"route": "/articles/" + slug.current 
	}`;

export const handle: SEOHandle = {
	getSitemapEntries: getSitemapEntries(sitemapQuery, 0.5),
};

export const headers = timingHeaders;

export async function loader({ params, request }: LoaderFunctionArgs) {
	const articleSlug = params.article;
	if (!articleSlug) throw redirect("/404");

	const { timings, time } = makeTiming("articles/$article loader");

	const articleContentQuery = api.articles.getArticleContent(articleSlug, request.url);

	const articleQuery = await time(
		() => api.articles.getArticle(articleSlug, request.url),
		"articleQuery",
	);
	if (!articleQuery) throw redirect("/404");

	const category = articleQuery.initial.data.category;
	const categoryQuery = asQuery(
		api.queries.categories.bySlug(category._slug, request.url),
	)({ data: category });

	return defer(
		{
			articleContentQuery,
			articleQuery,
			categoryQuery,
		},
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export default function Article() {
	const { articleQuery, articleContentQuery } = useLoaderData<typeof loader>();
	const article = useQuery(articleQuery);

	return (
		<Section className="h-auto font-pp-neue-montreal lg:h-auto">
			<div className="prose prose-quoteless mx-8 max-w-[70ch]">
				<Section>
					<div>{JSON.stringify(article, null, 2)}</div>
				</Section>

				<React.Suspense fallback={null}>
					<Await resolve={articleContentQuery}>
						{(query) => <ArticleContent articleContentQuery={query} />}
					</Await>
				</React.Suspense>
			</div>
		</Section>
	);
}
