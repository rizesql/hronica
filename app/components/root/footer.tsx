// import { getCollection } from "astro:content";

import { Logo } from "~/components/logo";
import { Center, Flex, HStack, Link, VStack, Text } from "~/components/ui";
// import { api } from "~/lib/api";
import { type NavLink, type SocialLink, isNavLink } from "~/lib/links";
import { seo } from "~/lib/seo";

export function Footer() {
	// const _categories = await getCollection("categories");
	// const categories = _categories.map((category) => ({
	// 	label: category.data.name,
	// 	href: category.id,
	// }));

	// const socialLinks = await api.social.getLinks();
	return (
		<Center stretch="all" className="px-4 pb-4 pt-12">
			<VStack stretch="all" alignment="center/between" className="gap-4">
				<Flex grow stretch="width" alignment="center/start">
					<HStack stretch="all" className="gap-8">
						<FooterCol title="Social" links={[]} />

						<FooterCol title="Categorii" links={[]} />

						<HStack alignment="center/between" stretch="width">
							<Flex className="flex-col items-start gap-4 lg:flex-row lg:items-center">
								<Logo />
								<Text.Tiny>{seo.trademark}</Text.Tiny>
							</Flex>

							<Text.Tiny className="self-end lg:self-center">
								<Link.Social href={seo.rizesqlLink.url}>
									Creat de {seo.rizesqlLink.platform}
								</Link.Social>
							</Text.Tiny>
						</HStack>
					</HStack>
				</Flex>
			</VStack>
		</Center>
	);
}

type Props = {
	title: string;
	links: readonly NavLink[] | readonly SocialLink[];
};

const FooterCol = ({ title, links }: Props) => {
	const linkStyles = "font-pp-neue-montreal text-sm";

	return (
		<VStack className="gap-2">
			<Text.H3>{title}</Text.H3>
			<VStack as="ul" className="gap-2">
				{links.map((link, i) => (
					<li key={`footer-col.${title}.${i}`}>
						{isNavLink(link) ? (
							<Link.Nav href={link.href} className={linkStyles}>
								{link.label}
							</Link.Nav>
						) : (
							<Link.Social href={link.url} className={linkStyles}>
								{link.platform}
							</Link.Social>
						)}
					</li>
				))}
			</VStack>
		</VStack>
	);
};
