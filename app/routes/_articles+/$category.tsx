import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, type MetaFunction } from "@remix-run/react";
import groq from "groq";

import { Feed, type FeedQuery } from "~/components/feeds/feed";
import { api } from "~/lib/api";
import { PAGE_SIZE } from "~/lib/api/articles/infinite";
import {
	feed,
	type Filter,
	type LastPage,
	type Page,
} from "~/lib/api/articles/infinite.server";
import { asQuery } from "~/lib/api/helpers";
import { useQuery } from "~/lib/sanity/loader";
import { seo, type WithOGImage } from "~/lib/seo";
import { routeOGImageUrl } from "~/lib/seo/og-images/route";
import { getSitemapEntries } from "~/lib/sitemap";
import { makeTiming, SERVER_TIMING, timingHeaders } from "~/lib/timings.server";

export const meta: MetaFunction<typeof loader> = ({ data }) =>
	seo({ title: data?.queries.category.initial.data.name, data });

const sitemapQuery = groq`
	*[defined(slug.current) && _type == "category"] {
		"route": "/" + slug.current 
	}`;

export const handle: SEOHandle = {
	getSitemapEntries: getSitemapEntries(sitemapQuery),
};

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { time, timings } = makeTiming("$category loader");

	const filter = {
		query: "category->slug.current == $category",
		params: { category: params.category! },
	} satisfies Filter;

	const queryParams = feed.parseQueryParams(request);

	const page = await time(
		() => feed.loadNext(filter, { url: request.url, ...queryParams }),
		"queries.page",
	);

	// prettier-ignore
	const categoryData = page.initial.data.rowsFetched < PAGE_SIZE
		? (page.initial.data as LastPage).data[0].category
		: (page.initial.data as Page).data.firstCol[0].category;

	const category = asQuery(
		api.queries.categories.bySlug(categoryData._slug, request.url),
	)({ data: categoryData });

	return json(
		{
			queries: { category, page },
			ogImageUrl: routeOGImageUrl(request, category.initial.data._slug),
		} satisfies FeedQuery & WithOGImage,
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export const headers = timingHeaders;

export default function AllArticles() {
	const { queries } = useLoaderData<typeof loader>();
	const page = useQuery(queries.page);
	const fetcher = useFetcher<typeof loader>();

	return (
		<div>
			<Feed firstPage={page.data} fetcher={fetcher} />
		</div>
	);
}
