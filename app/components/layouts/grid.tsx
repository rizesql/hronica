import React from "react";

import { Star } from "lucide-react";

import { Grid, VStack, Article, Separator, Badge, Image } from "~/components/ui";
import type { ArrangedArticles } from "~/lib/api/articles/helpers";
import { cn } from "~/lib/cn";

const layouts = [
	["lg:col-[2/4]", "lg:col-[1/2]", "lg:col-[4/5]"],
	["lg:col-[3/5]", "lg:col-[2/3]", "lg:col-[1/2]"],
	["lg:col-[2/4]", "lg:col-[4/5]", "lg:col-[1/2]"],
	["lg:col-[1/3]", "lg:col-[4/5]", "lg:col-[3/4]"],
	["lg:col-[3/5]", "lg:col-[1/2]", "lg:col-[2/3]"],
	["lg:col-[1/3]", "lg:col-[3/4]", "lg:col-[4/5]"],
];

export const GridLayout = ({
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
		<Grid
			stretch="all"
			className="mb-4 grid-cols-1 gap-8 lg:grid-flow-col lg:grid-cols-4 lg:p-4 lg:px-8"
		>
			<VStack stretch="width" className={cn(layouts[layout]?.[0])}>
				<Article.Root href={`/articles/${hero._slug}`}>
					<Article.Image>
						<Image asset={hero.image.asset} alt={hero.title} className="rounded-md" />
					</Article.Image>

					<Article.Content.Hero
						title={hero.title}
						author={hero.author.name}
						publishedAt={hero.date}
					>
						{withBadges ? (
							<>
								<Badge color={hero.category.color}>{hero.category.name}</Badge>
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
							<React.Fragment key={`articles.${article._slug}`}>
								<Separator />

								<Article.Root href={`/articles/${article._slug}`}>
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
					<Article.Root
						href={`/articles/${article._slug}`}
						key={`articles.${article._slug}`}
					>
						<Article.Image>
							<Image
								asset={article.image.asset}
								alt={article.title}
								className="aspect-[3/2] rounded-md"
							/>
						</Article.Image>

						<Article.Content.Normal
							title={article.title}
							author={article.author.name}
							publishedAt={article.date}
						>
							{withBadges ? (
								<Badge color={article.category.color}>{article.category.name}</Badge>
							) : null}
						</Article.Content.Normal>
					</Article.Root>
				))}
			</VStack>

			<VStack className={cn(layouts[layout]?.[2], "gap-4 pt-2")}>
				{thirdCol.map((article, idx) => (
					<React.Fragment key={`articles.${article._slug}`}>
						<Separator />

						{idx === 2 ? (
							<Article.Root href={`/articles/${article._slug}`}>
								<Article.Image>
									<Image
										asset={article.image.asset}
										alt={article.title}
										className="aspect-[3/2] rounded-md"
									/>
								</Article.Image>

								<Article.Content.Normal
									title={article.title}
									author={article.author.name}
									publishedAt={article.date}
								>
									{withBadges ? (
										<Badge color={article.category.color}>{article.category.name}</Badge>
									) : null}
								</Article.Content.Normal>
							</Article.Root>
						) : (
							<Article.Root href={`/articles/${article._slug}`}>
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
		</Grid>
	);
};
