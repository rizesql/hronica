import { format } from "date-fns";

import { useArticleRouteData } from "./article-data";

import { HStack, Image, Link, Section, Text, VStack } from "~/components/ui";
import { type ReadingTime } from "~/lib/api/articles/helpers";
import { type Members } from "~/lib/api/members/helpers";
import { useQuery } from "~/lib/sanity/loader";

export function Hero() {
	const { queries } = useArticleRouteData();
	const readingTime = useQuery(queries.readingTime);
	const article = useQuery(queries.article);

	return (
		<Section className="mx-8 my-10 h-auto gap-8 lg:h-auto">
			<Image
				asset={article.data.image.asset}
				alt=""
				className="my-8 rounded-sm xl:max-w-6xl"
			/>

			<VStack className="max-w-[90ch] gap-4" alignment="start/between">
				<HStack className="gap-4">
					<time dateTime={article.data.date}>
						<Text.Small>{format(article.data.date, "MMM d, yyyy")}</Text.Small>
					</time>

					<Text.Small>-</Text.Small>

					<Text.Small>
						Scris de{" "}
						<Link.Nav
							to={`/members/${article.data.author._slug}/author`}
							className="font-semibold underline"
						>
							{article.data.author.name}
						</Link.Nav>
					</Text.Small>

					<Text.Small>-</Text.Small>

					<ReadingTimeLabel readingTime={readingTime.data} />
				</HStack>

				<Text.H1>{article.data.title}</Text.H1>

				<Editors editors={article.data.editors} />
			</VStack>
		</Section>
	);
}

function ReadingTimeLabel({ readingTime }: { readingTime: ReadingTime }) {
	if (readingTime.readingTime <= 1) return <Text.Small>aprox. 1 minut</Text.Small>;

	return <Text.Small>aprox. {readingTime.readingTime} minute</Text.Small>;
}

function Editors({ editors }: { editors: Members | null }) {
	if (!editors) return null;

	return <Text.Small>Editat de {editors.map((x) => x.name).join(", ")}</Text.Small>;
}
