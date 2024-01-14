import { Logo } from "~/components/logo";
import { Center, Flex, HStack, Link, VStack, Text } from "~/components/ui";
import { type NavLink, type SocialLink, isNavLink } from "~/lib/links";
import { useQuery } from "~/lib/sanity/loader";
import { seo } from "~/lib/seo";
import { useRootData } from "~/root";

export function Footer() {
	// 	{
	// 	social,
	// 	categories,
	// }: {
	// 	social: readonly SocialLink[];
	// 	categories: Categories;
	// 	}
	const { categoriesQuery, socialQuery } = useRootData();
	const categories = useQuery(categoriesQuery);
	const social = useQuery(socialQuery);

	const categoriesLinks = categories.data.map(
		(c) => ({ label: c.name, href: c._slug }) satisfies NavLink,
	);

	return (
		<Center stretch="all" className="px-4 pb-4 pt-12">
			<VStack stretch="all" alignment="center/between" className="gap-4">
				<Flex grow stretch="width" alignment="center/start">
					<HStack stretch="all" className="gap-8">
						<FooterCol title="Social" links={social.data} />

						<FooterCol title="Categorii" links={categoriesLinks} />

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
