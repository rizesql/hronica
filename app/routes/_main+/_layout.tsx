import { Outlet } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Footer } from "~/components/root/footer";
import { Flex, HStack, Link, Text } from "~/components/ui";
import { useQuery } from "~/lib/sanity/loader";
import { useRootData } from "~/root";

export default function MainLayout() {
	return (
		<div className="bg-background font-pp-neue-montreal text-foreground [word-break:break-word]">
			<div className="relative">
				<Header />

				<main className="mb-8 border-b border-b-foreground">
					<Outlet />
				</main>

				<Footer />
			</div>
		</div>
	);
}

function Header() {
	const { categoriesQuery, socialQuery } = useRootData();
	const categories = useQuery(categoriesQuery);
	const social = useQuery(socialQuery);

	return (
		<header className="sticky inset-0 z-20 bg-background">
			<Flex
				stretch="width"
				className="items-center justify-between border-b border-foreground px-6 pb-4 pt-6 lg:justify-center lg:border-0 lg:px-16 lg:pt-8"
			>
				<MobileNav
					categories={categories.data}
					social={social.data}
					background="hsl(0 0% 98%)"
				/>

				<Link.Nav href="/" className="flex items-baseline gap-1">
					<Text.H2 className="font-semibold italic tracking-tight">Revista</Text.H2>
					<Text.H1>Hronica</Text.H1>
				</Link.Nav>
			</Flex>

			<HStack
				as="nav"
				stretch="width"
				alignment="center/around"
				className="hidden border-b border-foreground pb-2 pt-4 lg:flex"
			>
				{categories.data.map((category) => (
					<Text.Small key={category._id} className="text-foreground">
						<Link.Nav href={`/${category._slug}`}>{category.name}</Link.Nav>
					</Text.Small>
				))}
			</HStack>
		</header>
	);
}
