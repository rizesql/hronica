import React from "react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { LiveReload, Outlet, Scripts, ScrollRestoration, json } from "@remix-run/react";
import { promiseHash } from "remix-utils/promise";

import { api } from "./lib/api";

import { Head } from "~/components/root/head";
import { env } from "~/lib/env";
import { useNonce } from "~/lib/nonce";
import "~/styles/libre-caslon-condensed.css";
import "~/styles/pp-neue-montreal.css";
import "~/styles/redaction.css";
import "~/styles/tailwind.css";

const VisualEditing = React.lazy(() => import("~/lib/sanity/visual-editing"));

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "preconnect", href: "https://cdn.sanity.io" },
];

export async function loader({ request }: LoaderFunctionArgs) {
	const queries = await promiseHash({
		socialQuery: api.social.getLinks(request.url),
		categoriesQuery: api.categories.getCategories(request.url),
	});

	return json(queries);
}

export default function App() {
	const nonce = useNonce();

	return (
		<Document nonce={nonce}>
			<Outlet />
		</Document>
	);
}

function Document({
	nonce,
	children,
}: React.PropsWithChildren<{
	nonce: string;
}>) {
	return (
		<html
			lang="ro"
			className="font-pp-neue-montreal text-foreground [word-break:break-word]"
		>
			<Head />
			<body>
				{children}
				<ScrollRestoration nonce={nonce} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.env = ${JSON.stringify(env)}`,
					}}
				/>
				<Scripts nonce={nonce} />
				<LiveReload nonce={nonce} />

				<React.Suspense>
					<VisualEditing />
				</React.Suspense>
			</body>
		</html>
	);
}
