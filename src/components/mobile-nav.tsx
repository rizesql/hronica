import { MenuSquare, X } from "lucide-react";

import { Flex, Sheet, Link, VStack, HStack, Text } from "~/components/ui";
import { siteInfo, type SocialLink } from "~/lib";
import type { Category } from "~/lib/api/categories";

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
								href={`/${c.id}`}
								className="font-pp-neue-montreal text-2xl font-semibold uppercase"
								key={`mobile-nav.nav-links.${i}`}
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
					<Text.Tiny>{siteInfo.trademark}</Text.Tiny>

					<Text.Tiny>
						<Link.Social href={siteInfo.rizesqlLink.href}>
							Creat de {siteInfo.rizesqlLink.platform}
						</Link.Social>
					</Text.Tiny>
				</HStack>
			</Sheet.Content>
		</Sheet.Root>
	);
};
