import React from "react";

import { type FetcherWithComponents } from "@remix-run/react";

import { InfiniteScroller } from "~/components/feeds/infinite-scroller";
import { GridLayout } from "~/components/layouts/grid";
import { Article, Grid, Image } from "~/components/ui";
import { type ArrangedArticles } from "~/lib/api/articles/helpers";
import { type AnyPage, type LastPage, type Page } from "~/lib/api/articles/infinite";
import { type Query } from "~/lib/sanity/loader";

export type FeedQuery = {
	queries: { page: Query<AnyPage> } & Record<string, unknown>;
} & Record<string, unknown>;

export function Feed({
	firstPage,
	fetcher,
}: {
	firstPage: AnyPage;
	fetcher: FetcherWithComponents<FeedQuery>;
}) {
	const [pages, setPages] = React.useState(firstPage.rowsFetched < 10 ? [] : [firstPage]);
	const [lastPage, setLastPage] = React.useState(
		firstPage.rowsFetched >= 10 ? null : (firstPage as LastPage),
	);

	React.useEffect(() => {
		if (!fetcher.data || fetcher.state === "loading") return;

		if (fetcher.data) {
			const newPage = fetcher.data.queries.page.initial.data;

			if (newPage.rowsFetched < 10) setLastPage(newPage as LastPage);
			else setPages((prev) => [...prev, newPage as Page]);
		}
	}, [fetcher.data, fetcher.state]);

	const loadNext = () => {
		if (lastPage) return;

		const pagination = fetcher.data
			? fetcher.data.queries.page.initial.data.pagination
			: pages.at(-1)!.pagination;

		// @ts-expect-error to much time to type this properly
		const nextPageQuery = new URLSearchParams(pagination).toString();
		fetcher.load(`?index&${nextPageQuery}`);
	};

	return (
		<>
			<InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
				{pages.map((p, idx) => (
					<div key={idx}>
						<GridLayout articles={p.data as ArrangedArticles} layout={idx} />
					</div>
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
