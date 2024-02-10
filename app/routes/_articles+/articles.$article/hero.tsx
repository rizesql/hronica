import { format } from "date-fns";

import { HStack, Image, Link, Section, Text, VStack } from "~/components/ui";
import { type Article, type ReadingTime } from "~/lib/api/articles/helpers";
import { type Members } from "~/lib/api/members/helpers";
import { useQuery, type Query } from "~/lib/sanity/loader";

export function Hero({
	article,
	readingTimeQuery,
}: {
	article: Article;
	readingTimeQuery: Query<ReadingTime>;
}) {
	const readingTime = useQuery(readingTimeQuery);

	return (
		<Section className="mx-8 my-10 h-auto gap-8 lg:h-auto">
			<Image
				asset={article.image.asset}
				alt=""
				className="my-8 rounded-sm xl:max-w-6xl"
			/>

			<VStack className="max-w-[90ch] gap-4" alignment="start/between">
				<HStack className="gap-4">
					<time dateTime={article.date}>
						<Text.Small>{format(article.date, "MMM d, yyyy")}</Text.Small>
					</time>

					<Text.Small>-</Text.Small>

					<Text.Small>
						Scris de{" "}
						<Link.Nav
							to={`/members/${article.author._slug}/author`}
							className="font-semibold underline"
						>
							{article.author.name}
						</Link.Nav>
					</Text.Small>

					<Text.Small>-</Text.Small>

					<ReadingTimeLabel readingTime={readingTime.data} />
				</HStack>
				<Text.H1 className="[text-wrap:none]">{article.title}</Text.H1>
				<Editors editors={article.editors} />
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
