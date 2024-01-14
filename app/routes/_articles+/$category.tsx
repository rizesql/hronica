import { type LoaderFunctionArgs, redirect, json } from "@remix-run/node";

import { api } from "~/lib/api";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const categorySlug = params.category;
	if (!categorySlug) throw redirect("/404");

	const categoryQuery = await api.categories.getCategory(categorySlug, request.url);
	if (!categoryQuery.initial.data) throw redirect("/404");

	return json({ categoryQuery });
}

export default function AllArticles() {
	return <div>all articles</div>;
}
