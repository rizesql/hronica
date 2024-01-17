import React from "react";

import { defer, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { promiseHash } from "remix-utils/promise";

import { CategorySection } from "./category-section";
import { Hero } from "./hero";

import { Center, Section } from "~/components/ui";
import { api } from "~/lib/api";
import { useRootData } from "~/lib/root-data";
import { useQuery } from "~/lib/sanity/loader";

// export const CACHE_CONTROL = {
// 	doc: "max-age=300, stale-while-revalidate=604800",
// };

export async function loader({ request }: LoaderFunctionArgs) {
	const categoriesArticlesQuery = promiseHash({
		cultura: api.articles.getArrangedByCategory("cultura", request.url),
		poezie: api.articles.getArrangedByCategory("cultura", request.url),
		interviuri: api.articles.getArrangedByCategory("cultura", request.url),
		"useuri-si-scriere-literara": api.articles.getArrangedByCategory(
			"cultura",
			request.url,
		),
		"despre-viata-si-lumea-inconjuratoare": api.articles.getArrangedByCategory(
			"cultura",
			request.url,
		),
	});

	return defer({
		categoriesArticlesQuery,
		heroQuery: await api.articles.getHeroArticles(request.url),
	});
}

export const meta: MetaFunction = () => [
	{ title: "New Remix App" },
	{ name: "description", content: "Welcome to Remix!" },
];

export default function Index() {
	const { categoriesQuery } = useRootData();
	const { categoriesArticlesQuery } = useLoaderData<typeof loader>();
	const categories = useQuery(categoriesQuery);

	return (
		<>
			<Hero />

			<Section className="border-y border-border bg-[#DDEFD5]">
				<Center stretch="all">2</Center>
			</Section>

			{/* these are under the fold so it's alright to fetch them in the background */}
			<React.Suspense>
				<Await resolve={categoriesArticlesQuery}>
					{(queries) =>
						Object.values(queries).map((query, idx) => (
							<CategorySection
								layout={idx}
								category={categories.data[idx]}
								articlesQuery={query}
								key={categories.data[idx]._id}
							/>
						))
					}
				</Await>
			</React.Suspense>
		</>
	);
}
