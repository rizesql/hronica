import { MenuSquare, X } from "lucide-react";

import { Flex, Sheet, Link, VStack, HStack, Text } from "~/components/ui";
import { type Category } from "~/lib/api/categories/helpers";
import { type SocialLink } from "~/lib/links";
import { seo } from "~/lib/seo";

export const MobileNav = ({
	categories,
	background,
	social,
}: {
	categories: readonly Category[];
	social: readonly SocialLink[];
	background: string;
}) => {
	return (
		<Sheet.Root>
			<Sheet.Trigger asChild className="block lg:hidden">
				<MenuSquare />
			</Sheet.Trigger>

			<Sheet.Content
				side="left"
				className="flex w-screen flex-col justify-between bg-background px-6"
				style={{ background }}
			>
				<VStack className="gap-y-8">
					<Flex stretch="width" direction="row-reverse" alignment="start/between">
						<Sheet.Close asChild>
							<X />
						</Sheet.Close>
					</Flex>

					<VStack as="nav" className="gap-y-4">
						{categories.map((c, i) => (
							<Link.Nav
								to={`/${c._slug}`}
								className="font-pp-neue-montreal text-2xl font-semibold uppercase"
								key={`mobile-nav.nav-links.${i}`}
								reloadDocument
							>
								{c.name}
							</Link.Nav>
						))}
					</VStack>

					<VStack className="gap-y-4">
						<Text.H2 className="text-2xl font-semibold italic">Social</Text.H2>

						{social.map((link, i) => (
							<Link.Social
								href={link.url}
								key={`mobile-nav.social-links.${i}`}
								className="font-pp-neue-montreal text-sm uppercase tracking-wider"
							>
								{link.platform}
							</Link.Social>
						))}
					</VStack>
				</VStack>

				<HStack alignment="baseline/between">
					<Text.Tiny>{seo.trademark}</Text.Tiny>

					<Text.Tiny>
						<Link.Social href={seo.rizesqlLink.url}>
							Creat de {seo.rizesqlLink.platform}
						</Link.Social>
					</Text.Tiny>
				</HStack>
			</Sheet.Content>
		</Sheet.Root>
	);
};
