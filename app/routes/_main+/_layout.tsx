import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { MobileNav } from "~/components/nav/mobile";
import { Flex, HStack, Link, Text } from "~/components/ui";
import { api } from "~/lib/api";
import { type Category } from "~/lib/api/categories";
import { type SocialLink } from "~/lib/links";
import { useQuery } from "~/lib/sanity/loader";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const categoriesQuery = await api.categories.getCategories(request.url);

	return json({ categoriesQuery });
};

export default function MainLayout() {
	const { categoriesQuery } = useLoaderData<typeof loader>();
	const categories = useQuery(categoriesQuery);

	return (
		<div className="bg-background font-pp-neue-montreal text-foreground [word-break:break-word]">
			<div className="relative">
				<Header categories={categories.data} />

				<main className="mb-8 border-b border-b-foreground">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

function Header({ categories }: { categories: Category[] }) {
	const socialLinks: SocialLink[] = [];

	return (
		<header className="sticky inset-0 z-20 bg-background">
			<Flex
				stretch="width"
				className="items-center justify-between border-b border-foreground px-6 pb-4 pt-6 lg:justify-center lg:border-0 lg:px-16 lg:pt-8"
			>
				<MobileNav
					categories={categories}
					social={socialLinks}
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
				{categories.map((category) => (
					<Text.Small key={category._id} className="text-foreground">
						<Link.Nav href={`/${category._id}`}>{category.name}</Link.Nav>
					</Text.Small>
				))}
			</HStack>
		</header>
	);
}
