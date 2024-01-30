import React from "react";

import type { HeadersFunction, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { LiveReload, Outlet, Scripts, ScrollRestoration, json } from "@remix-run/react";
import { promiseHash } from "remix-utils/promise";

import { api } from "./lib/api";

import { Head } from "~/components/root/head";
import { env } from "~/lib/env";
import { SERVER_TIMING, makeTiming } from "~/lib/timings.server";
import "~/styles/libre-caslon-condensed.css";
import "~/styles/pp-neue-montreal.css";
import "~/styles/redaction.css";
import "~/styles/tailwind.css";

const VisualEditing = React.lazy(() => import("~/lib/sanity/visual-editing"));

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
	{ rel: "preconnect", href: "https://cdn.sanity.io" },
];

export async function loader({ request }: LoaderFunctionArgs) {
	const { time, timings } = makeTiming("root loader");

	const queries = await promiseHash({
		socialQuery: time(() => api.social.getLinks(request.url), "socialQuery"),
		categoriesQuery: time(
			() => api.categories.getCategories(request.url),
			"categoriesQuery",
		),
	});

	return json(queries, { headers: { [SERVER_TIMING]: timings.toString() } });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	[SERVER_TIMING]: loaderHeaders.get(SERVER_TIMING) ?? "",
});

export default function App() {
	return (
		<html
			lang="ro"
			className="font-pp-neue-montreal text-foreground [word-break:break-word]"
		>
			<Head />
			<body>
				<Outlet />

				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.env = ${JSON.stringify(env)}`,
					}}
				/>
				<Scripts />
				<LiveReload />

				<React.Suspense>
					<VisualEditing />
				</React.Suspense>
			</body>
		</html>
	);
}
