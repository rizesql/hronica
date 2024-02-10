import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

import { Card } from "./card";
import { Link } from "./link";
import { HStack, VStack } from "./stack";
import { Text } from "./text";

const Root = ({ children, href }: React.PropsWithChildren<{ href: string }>) => {
	return (
		<Link.Nav to={href} className="w-full">
			<Card.Root as={VStack} stretch="width">
				{children}
			</Card.Root>
		</Link.Nav>
	);
};

const Image = ({ children }: React.PropsWithChildren) => {
	return <Card.Content>{children}</Card.Content>;
};

const HeroContent = ({
	children,
	title,
	author,
	publishedAt,
}: React.PropsWithChildren<{
	title: string;
	author: string;
	publishedAt: string;
}>) => {
	return (
		<Card.Header as={VStack} stretch="width" className="gap-8">
			<HStack className="gap-4">{children}</HStack>

			<Text.H2 className="text-3xl lg:text-4xl">{title}</Text.H2>

			<HStack stretch="width" alignment="baseline/between">
				<VStack>
					<Text.Small>Scris de {author}</Text.Small>
					<time dateTime={publishedAt}>
						<Text.Small>{format(publishedAt, "MMM d, yyyy")}</Text.Small>
					</time>
				</VStack>

				<HStack alignment="center/between" className="gap-2 lg:flex">
					<Text.Small className="uppercase tracking-wider underline underline-offset-4">
						Citeste
					</Text.Small>
					<ArrowUpRight className="size-4" />
				</HStack>
			</HStack>
		</Card.Header>
	);
};

const NormalContent = ({
	children,
	title,
	author,
	publishedAt,
}: React.PropsWithChildren<{
	title: string;
	author: string;
	publishedAt: string;
}>) => {
	return (
		<Card.Header as={VStack} className="gap-4" stretch="width">
			<HStack stretch="width" alignment="center/between">
				{children}

				<time dateTime={publishedAt}>
					<Text.Small>{format(publishedAt, "MMM d, yyyy")}</Text.Small>
				</time>
			</HStack>

			<Text.H3>{title}</Text.H3>

			<Text.Small>Scris de {author}</Text.Small>

			<HStack alignment="center/between" className="gap-2 lg:flex">
				<Text.Small className="text-foreground underline underline-offset-4">
					Citeste
				</Text.Small>
				<ArrowUpRight className="size-4" />
			</HStack>
		</Card.Header>
	);
};

const SmallContent = ({
	title,
	author,
	publishedAt,
}: {
	title: string;
	author: string;
	publishedAt: string;
}) => {
	return (
		<Card.Content className="w-full">
			<Text.H3>{title}</Text.H3>

			<HStack alignment="baseline/between" stretch="width" className="gap-4">
				<HStack className="gap-4">
					<time dateTime={publishedAt}>
						<Text.Small>{format(publishedAt, "MMM d, yyyy")}</Text.Small>
					</time>

					<Text.Small>Scris de {author}</Text.Small>
				</HStack>

				<HStack alignment="center/between" className="gap-2 lg:flex">
					<Text.Small className="text-foreground underline underline-offset-4">
						Citeste
					</Text.Small>
					<ArrowUpRight className="size-4" />
				</HStack>
			</HStack>
		</Card.Content>
	);
};

export const Article = {
	Root,
	Image,
	Content: {
		Hero: HeroContent,
		Normal: NormalContent,
		Small: SmallContent,
	},
};
