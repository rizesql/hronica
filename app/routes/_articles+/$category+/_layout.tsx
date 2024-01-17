import { redirect, type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Footer } from "~/components/root/footer";
import { HStack, Link, Text } from "~/components/ui";
import { api } from "~/lib/api";
import { useRootData } from "~/lib/root-data";
import { useQuery } from "~/lib/sanity/loader";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const category = params.category;
	if (!category) throw redirect("/404");

	const categoryQuery = await api.categories.getCategory(category, request.url);
	if (!categoryQuery.initial.data) throw redirect("/404");

	return json({ categoryQuery });
}

export default function ArticlesLayout() {
	const { categoryQuery } = useLoaderData<typeof loader>();
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
							<Link.Nav reloadDocument prefetch="intent" to={`/${category._slug}`}>
								{category.name}
							</Link.Nav>
						</Text.Small>
					))}
				</nav>
			</HStack>
		</header>
	);
}
