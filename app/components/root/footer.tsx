import { Logo } from "~/components/logo";
import { Center, Flex, HStack, Link, Text, VStack } from "~/components/ui";
import { appInfo } from "~/lib/app-info";
import { isNavLink, type NavLink, type SocialLink } from "~/lib/links";
import { useRootData } from "~/lib/root-data";
import { useQuery } from "~/lib/sanity/loader";

export function Footer() {
	const { queries } = useRootData();
	const categories = useQuery(queries.categories);
	const social = useQuery(queries.social);

	const currentYear = new Date(Date.now()).getFullYear();

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
								<Text.Tiny>
									{currentYear} {appInfo.trademark}
								</Text.Tiny>
							</Flex>

							<Text.Tiny className="self-end lg:self-center">
								<Link.Social href={appInfo.rizesqlLink.url}>
									Creat de {appInfo.rizesqlLink.platform}
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
							<Link.Nav to={link.href} className={linkStyles}>
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
