import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, type MetaFunction } from "@remix-run/react";
import groq from "groq";

import { ArticleContent } from "./content";
import { Hero } from "./hero";

import { Section } from "~/components/ui";
import { api } from "~/lib/api";
import { asQuery } from "~/lib/api/helpers";
import { useQuery } from "~/lib/sanity/loader";
import { _seo } from "~/lib/seo";
import { getSitemapEntries } from "~/lib/sitemap";
import { SERVER_TIMING, makeTiming, timingHeaders } from "~/lib/timings.server";

export const meta: MetaFunction<typeof loader> = ({ data }) =>
	_seo({ title: data?.queries.article.initial.data.title });

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

	const deferredArticleContent = api.articles.getArticleContent(articleSlug, request.url);

	const article = await time(
		() => api.articles.getArticle(articleSlug, request.url),
		"articleQuery",
	);
	if (!article.initial) throw redirect("/404");

	const readingTime = await time(
		() => api.articles.getReadingTime(articleSlug, request.url),
		"readingTimeQuery",
	);

	const categoryData = article.initial.data.category;
	const category = asQuery(
		api.queries.categories.bySlug(categoryData._slug, request.url),
	)({ data: categoryData });

	return defer(
		{
			deferredArticleContent,
			queries: {
				category,
				article,
				readingTime,
			},
		},
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export default function Article() {
	const { queries, deferredArticleContent } = useLoaderData<typeof loader>();
	const article = useQuery(queries.article);

	return (
		<Section className="h-auto gap-16 font-pp-neue-montreal lg:h-auto">
			<Hero readingTimeQuery={queries.readingTime} article={article.data} />

			<div className="prose prose-quoteless mx-8 mb-24 flex max-w-none flex-col items-center prose-p:max-w-[75ch] lg:prose-headings:max-w-[19ch]">
				<Await resolve={deferredArticleContent}>
					{(query) => <ArticleContent articleContentQuery={query} />}
				</Await>
			</div>
		</Section>
	);
}
