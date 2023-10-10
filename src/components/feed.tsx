import React from "react";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { Grid } from "./layouts/grid";
import { Article, Badge, Section, Grid as GridLayout } from "./ui";

import {
	type FeedData,
	articlesApi,
	type FullArticle,
	type FilterFn,
	type FeedParams,
} from "~/lib/articles";
import { filterByAuthor, filterByCategory } from "~/lib/articles/helpers";
import queryClient from "~/lib/query-client";

const Feed = ({
	feedParams,
	initialData,
	filter,
}: {
	feedParams: FeedParams;
	filter: FilterFn;
	initialData: InfiniteData<FeedData, number>;
}) => {
	const observerTarget = React.useRef(null);
	const { data: sections, ...feed } = useInfiniteQuery(
		{
			queryKey: [feedParams, "feed"],
			queryFn: articlesApi.loadNext(feedParams, filter),
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: articlesApi.PAGE_SIZE,
			initialData,
		},
		queryClient,
	);

	React.useEffect(() => {
		const target = observerTarget.current;
		const hasIOSupport = !!window.IntersectionObserver;

		if (!hasIOSupport || !target) return;

		const observer = new IntersectionObserver(
			([e]) => {
				if (e?.isIntersecting && feed.hasNextPage) void feed.fetchNextPage();
			},
			{ threshold: 1 },
		);

		observer.observe(target);

		return () => observer.unobserve(target);
	}, [feed]);

	return (
		<>
			{sections?.pages.map(({ articles, nextPage }, idx) => (
				<Section key={idx} className="h-auto border-b border-border py-8 lg:h-auto">
					{!nextPage ? (
						<LastFeedSection articles={articlesApi.normalizeLastPage(articles)} />
					) : (
						<Grid articles={articles} layout={idx} />
					)}
				</Section>
			))}

			{feed.isFetchingNextPage && (
				<Section>
					<Loader className="animate-spin" />
				</Section>
			)}

			{feed.hasNextPage && <div ref={observerTarget} />}
		</>
	);
};

const LastFeedSection = ({ articles }: { articles: FullArticle[] }) => {
	return (
		<GridLayout className="grid-cols-1 lg:grid-cols-3">
			{articles.map((article) => (
				<Article.Root href={`/${article.href}`} key={`articles.${article.href}`}>
					<Article.Image>
						<img
							src={article.image.src}
							width={article.image.width}
							height={article.image.height}
							alt=""
							className="aspect-[3/2] rounded-md"
						/>
					</Article.Image>

					<Article.Content.Normal
						title={article.title}
						author={article.author.data.name}
						publishedAt={article.date}
					>
						<Badge color={article.category.data.color}>
							{article.category.data.name}
						</Badge>
					</Article.Content.Normal>
				</Article.Root>
			))}
		</GridLayout>
	);
};

export const CategoryFeed = ({
	feedParams,
	initialData,
}: {
	feedParams: FeedParams & { category: string | undefined };
	initialData: InfiniteData<FeedData, number>;
}) => (
	<Feed
		filter={filterByCategory(feedParams.category)}
		feedParams={feedParams}
		initialData={initialData}
	/>
);

export const AuthorFeed = ({
	feedParams,
	initialData,
}: {
	feedParams: FeedParams & { author: string | undefined };
	initialData: InfiniteData<FeedData, number>;
}) => (
	<Feed
		filter={filterByAuthor(feedParams.author)}
		feedParams={feedParams}
		initialData={initialData}
	/>
);
