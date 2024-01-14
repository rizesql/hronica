import React from "react";

import { Star } from "lucide-react";

import { useIndexRouteData } from "./helpers";

import { Section, VStack, Article, Separator, Grid, Badge } from "~/components/ui";
import { cn } from "~/lib/cn";
import { useQuery, image } from "~/lib/sanity/loader";

export function Hero() {
	const { heroQuery } = useIndexRouteData();
	const query = useQuery(heroQuery);

	const {
		firstCol: [hero, ...first],
		secondCol,
		thirdCol,
	} = query.data;

	return (
		<Section className="mx-8 mb-4 h-auto lg:h-auto">
			<Grid stretch="all" className="grid-cols-1 gap-8 lg:grid-cols-2 lg:p-4">
				<VStack stretch="width">
					<Article.Root href={`/articles/${hero._slug}`}>
						<Article.Image>
							<img
								className="aspect-[3/2] rounded-md"
								src={image(hero.image.asset).format("webp").auto("format").url()}
								alt={hero.title}
							/>
						</Article.Image>

						<Article.Content.Hero
							title={hero.title}
							author={hero.author.name}
							publishedAt={hero.date}
						>
							<Badge color={hero.category.color}>{hero.category.name}</Badge>
							<Badge color="#22c55e">
								Latest
								<Star className="h-4 w-4 fill-current" />
							</Badge>
						</Article.Content.Hero>
					</Article.Root>

					<Separator className="mt-8 lg:hidden" />

					<div className={cn("filler-article-container", "w-full")}>
						<VStack className={cn("filler-article", "gap-4")}>
							{first.map((article) => (
								<React.Fragment key={`hero.first-col-${article._id}`}>
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

				<Grid stretch="all" className="grid-cols-1 gap-8 xl:grid-cols-2">
					<VStack className="gap-4">
						{secondCol.map((article) => (
							<Article.Root
								href={`/articles/${article._slug}`}
								key={`hero.second-col-${article._id}`}
							>
								<Article.Image>
									<img
										className="aspect-[3/2] rounded-md"
										src={image(article.image.asset).format("webp").auto("format").url()}
										alt={article.title}
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
					</VStack>

					<VStack className="hidden gap-4 pt-2 xl:flex">
						{thirdCol.map((article, idx) => (
							<React.Fragment key={`hero.third-col-${article._id}`}>
								<Separator />

								{idx === 2 ? (
									<Article.Root href={`/articles/${article._slug}`}>
										<Article.Image>
											<img
												className="aspect-[3/2] rounded-md"
												src={image(article.image.asset)
													.format("webp")
													.auto("format")
													.url()}
												alt={article.title}
											/>
										</Article.Image>

										<Article.Content.Normal
											title={article.title}
											author={article.author.name}
											publishedAt={article.date}
										>
											<Badge color={article.category.color}>
												{article.category.name}
											</Badge>
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
			</Grid>
		</Section>
	);
}
