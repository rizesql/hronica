import React from "react";

import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { InfiniteScroller } from "~/components/infinite-scroller";
import { GridLayout } from "~/components/layouts/grid";
import { Article, Grid, Image } from "~/components/ui";
import type { ArrangedArticles } from "~/lib/api/articles/helpers";
import {
	type Filter,
	type LastPage,
	type Page,
	loadNext,
} from "~/lib/api/articles/infinite";
import { useQuery } from "~/lib/sanity/loader";
import { SERVER_TIMING, makeTiming, timingHeaders } from "~/lib/timings.server";
import { asQuery } from "~/lib/api/helpers";
import { api } from "~/lib/api";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { time, timings } = makeTiming("$category loader");

	const filter = {
		query: "category->slug.current == $category",
		params: { category: params.category! },
	} satisfies Filter;

	const searchParams = new URL(request.url).searchParams;
	const cursor = searchParams.get("cursor");
	const lastId = searchParams.get("lastId");
	const rawCount = searchParams.get("count");

	const queryParams =
		!cursor || !lastId || !rawCount
			? { cursor: null, lastId: null, count: null }
			: { cursor, lastId, count: +rawCount };

	const pageQuery = await time(
		() => loadNext(filter, { url: request.url, ...queryParams }),
		"pageQuery",
	);

	// prettier-ignore
	const category = pageQuery.initial.data.rowsFetched < 10
		? (pageQuery.initial.data as LastPage).data[0].category
		: (pageQuery.initial.data as Page).data.firstCol[0].category;

	const categoryQuery = asQuery(
		api.queries.categories.bySlug(category._slug, request.url),
	)({ data: category });

	return json(
		{ pageQuery, categoryQuery },
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export const headers = timingHeaders;

export default function AllArticles() {
	const { pageQuery } = useLoaderData<typeof loader>();
	const page = useQuery(pageQuery);
	const [pages, setPages] = React.useState([page.data]);
	const [lastPage, setLastPage] = React.useState<LastPage | null>(null);

	const fetcher = useFetcher<typeof loader>();

	React.useEffect(() => {
		if (!fetcher.data || fetcher.state === "loading") return;

		if (fetcher.data) {
			const newPage = fetcher.data.pageQuery.initial.data;

			if (newPage.rowsFetched < 10) setLastPage(newPage as LastPage);
			else setPages((prev) => [...prev, newPage]);
		}
	}, [fetcher.data, fetcher.state]);

	const loadNext = () => {
		if (lastPage) return;

		const pagination = fetcher.data
			? fetcher.data.pageQuery.initial.data.pagination
			: pages.at(-1)!.pagination;

		// @ts-expect-error to much time to type this properly
		const nextPageQuery = new URLSearchParams(pagination).toString();
		fetcher.load(`?index&${nextPageQuery}`);
	};

	return (
		<>
			<InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
				{pages.map((p, idx) => (
					<GridLayout articles={p.data as ArrangedArticles} layout={idx} key={idx} />
				))}
			</InfiniteScroller>

			<LastSection page={lastPage} />
		</>
	);
}

const LastSection = ({ page }: { page: LastPage | null }) => {
	if (!page) return null;

	return (
		<Grid className="grid-cols-1 lg:grid-cols-3">
			{page.data.map((article) => (
				<Article.Root
					href={`/articles/${article._slug}`}
					key={`articles.${article._slug}`}
				>
					<Article.Image>
						<Image
							asset={article.image.asset}
							alt={article.image.subtitle ?? ""}
							className="aspect-[3/2] rounded-md"
						/>
					</Article.Image>

					<Article.Content.Normal
						title={article.title}
						author={article.author.name}
						publishedAt={article.date}
					/>
				</Article.Root>
			))}
		</Grid>
	);
};
