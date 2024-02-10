import { Outlet } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Footer } from "~/components/root/footer";
import { Flex, HStack, Link, Text } from "~/components/ui";
import { useRootData } from "~/lib/root-data";
import { useQuery } from "~/lib/sanity/loader";

export default function MainLayout() {
	return (
		<div className="bg-background ">
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
	const { queries } = useRootData();
	const categories = useQuery(queries.categories);
	const social = useQuery(queries.social);

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

				<Link.Nav to="/" className="flex items-baseline gap-1">
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
						<Link.Nav to={`/${category._slug}`}>{category.name}</Link.Nav>
					</Text.Small>
				))}
			</HStack>
		</header>
	);
}
