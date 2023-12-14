import React from "react";

import { type InfiniteData } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { Grid } from "./layouts/grid";
import { Article, Badge, Section, Grid as GridLayout } from "./ui";

import { api } from "~/lib/api";
import type {
	FeedData,
	FilterFn,
	FeedParams,
	ArrangedArticles,
} from "~/lib/api/articles";
import { filterByAuthor, filterByCategory } from "~/lib/api/articles/helpers";
import { useInfiniteQuery } from "~/lib/query";

type FeedProps = {
	feedParams: FeedParams;
	filter: FilterFn;
	initialData: InfiniteData<FeedData, number>;
};

const useFeedData = ({ feedParams, initialData, filter }: FeedProps) =>
	useInfiniteQuery({
		queryKey: [feedParams, "feed"],
		queryFn: api.articles.loadNext(feedParams, filter),
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: api.articles.PAGE_SIZE,
		initialData,
	});

const Feed = (props: FeedProps) => {
	const observerTarget = React.useRef(null);
	const { data: sections, ...feed } = useFeedData(props);

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
			{sections?.pages.map(({ articles, nextPage }, idx) =>
				!nextPage ? (
					<Section key={idx} className="h-auto py-8 lg:h-auto">
						<LastFeedSection rawArticles={articles} />
					</Section>
				) : (
					<Section key={idx} className="h-auto border-b border-border py-8 lg:h-auto">
						<Grid articles={articles} layout={idx} />
					</Section>
				),
			)}

			{feed.isFetchingNextPage && (
				<Section>
					<Loader className="animate-spin" />
				</Section>
			)}

			{feed.hasNextPage && <div ref={observerTarget} />}
		</>
	);
};

const LastFeedSection = ({ rawArticles }: { rawArticles: ArrangedArticles }) => {
	const articles = api.articles.helpers.normalizeLastPage(rawArticles);

	return (
		<GridLayout className="grid-cols-1 lg:grid-cols-3">
			{articles.map((article) => (
				<Article.Root href={`/articles/${article.href}`} key={`articles.${article.href}`}>
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
						author={article.author.name}
						publishedAt={article.date}
					>
						<Badge color={article.category.color}>{article.category.name}</Badge>
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
