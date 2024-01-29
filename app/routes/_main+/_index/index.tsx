import React from "react";

import { defer, type LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { promiseHash } from "remix-utils/promise";

import { CategorySection } from "./category-section";
import { Hero } from "./hero";

import { Center, Section } from "~/components/ui";
import { api } from "~/lib/api";
import { useRootData } from "~/lib/root-data";
import { useQuery } from "~/lib/sanity/loader";
import { makeTiming, SERVER_TIMING, timingHeaders } from "~/lib/timings.server";

export const headers = timingHeaders;

export async function loader({ request }: LoaderFunctionArgs) {
	const { timings, time } = makeTiming("/ loader");

	const categoriesArticlesQuery = promiseHash({
		cultura: time(
			() => api.articles.getArrangedByCategory("cultura", request.url),
			"categoriesArticlesQuery[0]",
		),
		poezie: time(
			() => api.articles.getArrangedByCategory("cultura", request.url),
			"categoriesArticlesQuery[1]",
		),
		interviuri: time(
			() => api.articles.getArrangedByCategory("cultura", request.url),
			"categoriesArticlesQuery[2]",
		),
		"useuri-si-scriere-literara": time(
			() => api.articles.getArrangedByCategory("cultura", request.url),
			"categoriesArticlesQuery[3]",
		),
		"despre-viata-si-lumea-inconjuratoare": time(
			() => api.articles.getArrangedByCategory("cultura", request.url),
			"categoriesArticlesQuery[4]",
		),
	});

	const heroQuery = await time(
		() => api.articles.getHeroArticles(request.url),
		"heroQuery",
	);

	return defer(
		{
			categoriesArticlesQuery,
			heroQuery,
		},
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

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
