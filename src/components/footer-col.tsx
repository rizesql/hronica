import { VStack, Link, Text } from "~/components/ui";
import { isNavLink, type NavLink, type SocialLink } from "~/lib";

type Props = {
	title: string;
	links: readonly NavLink[] | readonly SocialLink[];
};

export const FooterCol = ({ title, links }: Props) => {
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
