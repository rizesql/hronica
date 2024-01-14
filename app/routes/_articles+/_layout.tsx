import { Outlet, useMatches } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Footer } from "~/components/root/footer";
import { HStack, Link, Text } from "~/components/ui";
import { type Category } from "~/lib/api/categories";
import { type Query, useQuery } from "~/lib/sanity/loader";
import { useRootData } from "~/root";

const useCategoryQuery = () => {
	const child = useMatches().at(-1);
	if (!child) throw new Error("No matching child route found");

	const data = child.data as { categoryQuery: Query<Category> };
	if (!data.categoryQuery)
		throw new Error("Not all children return from a loader `categoryQuery`");

	return data;
};

export default function ArticlesLayout() {
	const { categoryQuery } = useCategoryQuery();
	const category = useQuery(categoryQuery);

	const backgroundColor = category.data.color;

	return (
		<div className="relative" style={{ backgroundColor }}>
			<Header backgroundColor={backgroundColor} />

			<main className="mb-8 border-b border-b-foreground">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

function Header({ backgroundColor }: { backgroundColor: string }) {
	const { categoriesQuery, socialQuery } = useRootData();
	const categories = useQuery(categoriesQuery);
	const social = useQuery(socialQuery);

	return (
		<header className="sticky inset-0 z-20" style={{ backgroundColor }}>
			<HStack
				as="nav"
				stretch="width"
				alignment="center/between"
				className="justify-between border-b border-foreground px-6 pb-4 pt-6 lg:flex lg:justify-center lg:gap-12 lg:px-16 lg:pt-8"
			>
				<MobileNav
					categories={categories.data}
					social={social.data}
					background={backgroundColor}
				/>

				<Link.Nav href="/" className="flex items-baseline gap-1">
					<Text.H2 className="font-semibold italic tracking-tight">Revista</Text.H2>
					<Text.H1>Hronica</Text.H1>
				</Link.Nav>

				<nav className="hidden grow items-baseline justify-between lg:flex">
					{categories.data.map((category) => (
						<Text.Small
							className="font-pp-neue-montreal text-foreground"
							key={category._id}
						>
							<Link.Nav href={`/${category._slug}`}>{category.name}</Link.Nav>
						</Text.Small>
					))}
				</nav>
			</HStack>
		</header>
	);
}
