import React from "react";

import { Star } from "lucide-react";

import { Grid as GridLayout, VStack, Article, Separator, Badge } from "~/components/ui";
import { cn } from "~/lib";
import type { ArrangedArticles } from "~/lib/articles";

const layouts = [
	["lg:col-[2/4]", "lg:col-[1/2]", "lg:col-[4/5]"],
	["lg:col-[3/5]", "lg:col-[2/3]", "lg:col-[1/2]"],
	["lg:col-[2/4]", "lg:col-[4/5]", "lg:col-[1/2]"],
	["lg:col-[1/3]", "lg:col-[4/5]", "lg:col-[3/4]"],
	["lg:col-[3/5]", "lg:col-[1/2]", "lg:col-[2/3]"],
	["lg:col-[1/3]", "lg:col-[3/4]", "lg:col-[4/5]"],
];

export const Grid = ({
	articles,
	layout,
	withBadges = false,
}: {
	articles: ArrangedArticles;
	layout: number;
	withBadges?: boolean;
}) => {
	const {
		firstCol: [hero, ...first],
		secondCol,
		thirdCol,
	} = articles;

	return (
		<GridLayout
			stretch="all"
			className={cn(
				"grid-layout",
				"mb-4 grid-cols-1 gap-8 px-8 lg:grid-flow-col lg:grid-cols-4 lg:p-4",
			)}
		>
			<VStack stretch="width" className={cn(layouts[layout]?.[0])}>
				<Article.Root href={`/${hero.href}`}>
					<Article.Image>
						<img
							src={hero.image.src}
							width={hero.image.width}
							height={hero.image.height}
							alt=""
							className="rounded-md"
						/>
					</Article.Image>

					<Article.Content.Hero
						title={hero.title}
						author={hero.author.name}
						publishedAt={hero.date}
					>
						{withBadges ? (
							<>
								<Badge color={hero.category.data.color}>{hero.category.data.name}</Badge>
								<Badge color="#22c55e">
									Latest
									<Star className="h-4 w-4 fill-current" />
								</Badge>
							</>
						) : null}
					</Article.Content.Hero>
				</Article.Root>

				<Separator className="mt-8 lg:hidden" />

				<div className={cn("filler-article-container", "w-full")}>
					<VStack className={cn("filler-article", "gap-4")}>
						{first.map((article) => (
							<React.Fragment key={`articles.${article.href}`}>
								<Separator />

								<Article.Root href={`/${article.href}`}>
									<Article.Content.Small
										title={article.title}
										author={article.author.name}
										publishedAt={article.date}
									/>
								</Article.Root>
							</React.Fragment>
						))}
					</VStack>
				</div>
			</VStack>

			<VStack className={cn(layouts[layout]?.[1], "gap-4")}>
				{secondCol.map((article) => (
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
							author={article.author.name}
							publishedAt={article.date}
						>
							{withBadges ? (
								<Badge color={article.category.data.color}>
									{article.category.data.name}
								</Badge>
							) : null}
						</Article.Content.Normal>
					</Article.Root>
				))}
			</VStack>

			<VStack className={cn(layouts[layout]?.[2], "gap-4 pt-2")}>
				{thirdCol.map((article, idx) => (
					<React.Fragment key={`articles.${article.href}`}>
						<Separator />

						{idx === 2 ? (
							<Article.Root href={`/${article.href}`}>
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
									{withBadges ? (
										<Badge color={article.category.data.color}>
											{article.category.data.name}
										</Badge>
									) : null}
								</Article.Content.Normal>
							</Article.Root>
						) : (
							<Article.Root href={`/${article.href}`}>
								<Article.Content.Small
									title={article.title}
									author={article.author.name}
									publishedAt={article.date}
								/>
							</Article.Root>
						)}
					</React.Fragment>
				))}
			</VStack>
		</GridLayout>
	);
};
