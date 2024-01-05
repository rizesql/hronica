import React from "react";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";

import { stegaEnabled } from "./lib/sanity/config";

import { env } from "~/lib/env";
import { useNonce } from "~/lib/nonce";

const VisualEditing = React.lazy(() => import("~/lib/sanity/visual-editing"));

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
	{ rel: "icon", type: "image/svg+xml", href: "/public/favicon.ico" },
	{ rel: "preconnect", href: "https://cdn.sanity.io" },
];

export const loader = ({ request }: LoaderFunctionArgs) => {
	return json({
		sanity: {
			isStudioRoute: new URL(request.url).pathname.startsWith("/studio"),
			stegaEnabled: stegaEnabled(request.url),
		},
	});
};

type Sanity = {
	isStudioRoute: boolean;
	stegaEnabled: boolean;
};

export default function App() {
	const nonce = useNonce();
	const { sanity } = useLoaderData<typeof loader>();

	return (
		<Document sanity={sanity} nonce={nonce}>
			<Outlet />
		</Document>
	);
}

function Document({
	nonce,
	children,
	sanity,
}: React.PropsWithChildren<{
	nonce: string;
	sanity: Sanity;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
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

				<SanityScripts sanity={sanity} />
			</body>
		</html>
	);
}

function SanityScripts({ sanity }: { sanity: Sanity }) {
	if (sanity.isStudioRoute || !sanity.stegaEnabled) {
		return null;
	}

	return (
		<React.Suspense>
			<VisualEditing studioUrl={env.SANITY_STUDIO_URL} />
		</React.Suspense>
	);
}
