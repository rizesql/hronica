import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, type MetaFunction } from "@remix-run/react";

import { CategorySection } from "./category-section";
import { Hero } from "./hero";

import { api } from "~/lib/api";
import { type Categories } from "~/lib/api/categories/helpers";
import { useRootData } from "~/lib/root-data";
import { useQuery, type Query } from "~/lib/sanity/loader";
import { seo, type WithOGImage } from "~/lib/seo";
import { routeOGImageUrl } from "~/lib/seo/og-images/route";
import {
	makeTiming,
	SERVER_TIMING,
	timingHeaders,
	type TimeFn,
} from "~/lib/timings.server";

export const meta: MetaFunction<typeof loader> = ({ data }) =>
	seo({ title: "Acasă", data });

export const headers = timingHeaders;

const getArticles = (url: string, time: TimeFn) => (categories: Query<Categories>) =>
	Promise.all(
		categories.initial.data.map((category) =>
			time(
				() => api.articles.getArrangedByCategory(category._slug, url),
				`queries.deferredArticlesByCategory-${category._slug}`,
			),
		),
	);

export async function loader({ request }: LoaderFunctionArgs) {
	const { timings, time } = makeTiming("/ loader");

	const articlesByCategory = await api.categories
		.getCategories(request.url)
		.then(getArticles(request.url, time));

	const hero = await time(
		() => api.articles.getHeroArticles(request.url),
		"queries.hero",
	);

	return json(
		{
			articlesByCategory,
			queries: { hero },
			ogImageUrl: routeOGImageUrl(request, "index"),
		} satisfies WithOGImage,
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export default function Index() {
	const { queries } = useRootData();
	const { articlesByCategory } = useLoaderData<typeof loader>();
	const categories = useQuery(queries.categories);

	return (
		<>
			<Hero />

			{Object.values(articlesByCategory).map((query, idx) => (
				<CategorySection
					layout={idx}
					category={categories.data[idx]}
					articlesQuery={query}
					key={categories.data[idx]._id}
				/>
			))}
		</>
	);
}
