import { Outlet, useMatches, type UIMatch } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Footer } from "~/components/root/footer";
import { HStack, Link, Text } from "~/components/ui";
import { type Category } from "~/lib/api/categories/helpers";
import { useRootData } from "~/lib/root-data";
import { useQuery, type Query } from "~/lib/sanity/loader";

type CategoryQuery = { category: Query<Category> };
type Queries = { queries: CategoryQuery };

const useCategoryData = () => {
	const match = useMatches().at(-1) as UIMatch<Queries>;

	if (!match?.data) throw new Error("No data found");
	if (!match.data.queries.category) throw new Error("`queries.category` not exported");

	return match.data.queries as { category: Query<Category> };
};

export default function ArticlesLayout() {
	const query = useCategoryData();
	const category = useQuery(query.category);

	const backgroundColor = category.data.color;

	return (
		<div className="relative" style={{ backgroundColor }}>
			<Header backgroundColor={backgroundColor} />

			<main className="mb-8 border-b border-b-foreground">
				<Outlet context={{ backgroundColor }} />
			</main>

			<Footer />
		</div>
	);
}

function Header({ backgroundColor }: { backgroundColor: string }) {
	const { queries } = useRootData();
	const categories = useQuery(queries.categories);
	const social = useQuery(queries.social);

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

				<Link.Nav to="/" className="flex items-baseline gap-1">
					<Text.H2 className="font-semibold italic tracking-tight">Revista</Text.H2>
					<Text.H1>Hronica</Text.H1>
				</Link.Nav>

				<nav className="hidden grow items-baseline justify-between lg:flex">
					{categories.data.map((category) => (
						<Text.Small
							className="font-pp-neue-montreal text-foreground"
							key={category._id}
						>
							<Link.Nav
								reloadDocument
								prefetch="intent"
								to={`/categories/${category._slug}`}
							>
								{category.name}
							</Link.Nav>
						</Text.Small>
					))}
				</nav>
			</HStack>
		</header>
	);
}
