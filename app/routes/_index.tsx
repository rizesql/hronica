import React from "react";

import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { z } from "zod";

import { isStegaEnabled } from "~/lib/sanity/config";
import { useQuery } from "~/lib/sanity/loader";
import { loadQuery } from "~/lib/sanity/loader.server";

export const CACHE_CONTROL = {
	doc: "max-age=300, stale-while-revalidate=604800",
};

export const meta: MetaFunction = () => [
	{ title: "New Remix App" },
	{ name: "description", content: "Welcome to Remix!" },
];

export const categories = z.array(
	z.object({
		_id: z.string(),
		name: z.string(),
		color: z.string(),
	}),
);

export type Category = z.infer<typeof categories>;

export const CATEGORIES_QUERY = groq`*[_type == "category"] {
  _id,
  name,
  color
}`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const initial = await loadQuery<Category>(
		CATEGORIES_QUERY,
		{},
		{
			perspective: isStegaEnabled(request.url) ? "previewDrafts" : "published",
		},
	).then((res) => {
		return {
			...res,
			data: res.data ? categories.parse(res.data) : undefined,
		};
	});

	return json(
		{ initial, query: CATEGORIES_QUERY, params: {} },
		{
			headers: {
				"Cache-Control": CACHE_CONTROL.doc,
				Vary: "Cookie",
			},
		},
	);
};

export default function Index() {
	const [count, setCount] = React.useState(0);

	const { initial, query, params } = useLoaderData<typeof loader>();
	const { data, loading } = useQuery<typeof initial.data>(query, params, {
		// @ts-expect-error
		initial,
	});

	return (
		<div>
			<div>
				<button onClick={() => setCount((c) => c - 1)}>-</button>
				<div>{count}</div>
				<button onClick={() => setCount((c) => c + 1)}>+</button>
				{loading ? (
					<div>loading...</div>
				) : (
					<div>
						{data?.map((x, idx) => (
							<pre key={idx} style={{ backgroundColor: x.color }}>
								{JSON.stringify(x, null, 2)}
							</pre>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
