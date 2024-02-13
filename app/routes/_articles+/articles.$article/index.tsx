import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { defer, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, type MetaFunction } from "@remix-run/react";
import groq from "groq";

import { ArticleContent } from "./content";
import { Hero } from "./hero";

import { Section } from "~/components/ui";
import { api } from "~/lib/api";
import { type Category } from "~/lib/api/categories/helpers";
import { type Query } from "~/lib/sanity/loader";
import { seo, type WithOGImage } from "~/lib/seo";
import { articleOGImageURL } from "~/lib/seo/og-images/article";
import { getSitemapEntries } from "~/lib/sitemap";
import { makeTiming, SERVER_TIMING, timingHeaders } from "~/lib/timings.server";

export const meta: MetaFunction<typeof loader> = ({ data }) =>
	seo({ title: data?.queries.article.initial.data?.title, data });

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

	const deferredArticleContent = api.articles
		.getArticleContent(articleSlug, request.url)
		.then((q) => {
			if (!q.success) throw redirect("/404");
			return q;
		});

	const article = await time(
		() => api.articles.getArticle(articleSlug, request.url),
		"queries.article",
	);
	if (!article.success) throw redirect("/404");

	const readingTime = await time(
		() => api.articles.getReadingTime(articleSlug, request.url),
		"queries.readingTime",
	);

	const categoryData = article.initial.data.category;
	const category = {
		...api.queries.categories.bySlug(categoryData._slug, request.url),
		initial: { data: categoryData },
		success: true,
	} satisfies Query<Category>;

	return defer(
		{
			deferredArticleContent,
			queries: {
				category,
				article,
				readingTime,
			},
			ogImageUrl: articleOGImageURL(request, article.initial.data._id),
		} satisfies WithOGImage,
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export default function Article() {
	const { deferredArticleContent } = useLoaderData<typeof loader>();

	return (
		<Section className="h-auto gap-16 font-pp-neue-montreal lg:h-auto">
			<Hero />

			<div className="prose prose-quoteless mx-8 mb-24 flex max-w-none flex-col items-center prose-p:max-w-[75ch] lg:prose-headings:max-w-[19ch]">
				<Await resolve={deferredArticleContent}>
					{(query) => <ArticleContent articleContentQuery={query} />}
				</Await>
			</div>
		</Section>
	);
}
