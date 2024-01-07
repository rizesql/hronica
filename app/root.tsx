import React from "react";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	LiveReload,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";

import { Footer } from "~/components/root/footer";
import { Head } from "~/components/root/head";
import { env } from "~/lib/env";
import { useNonce } from "~/lib/nonce";
import { stegaEnabled } from "~/lib/sanity/config";
import libreCaslonCondensed from "~/styles/libre-caslon-condensed.css";
import ppNeueMontreal from "~/styles/pp-neue-montreal.css";
import redaction from "~/styles/redaction.css";
import stylesheet from "~/styles/tailwind.css";

const VisualEditing = React.lazy(() => import("~/lib/sanity/visual-editing"));

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
	{ rel: "stylesheet", href: stylesheet },
	{ rel: "stylesheet", href: ppNeueMontreal },
	{ rel: "stylesheet", href: redaction },
	{ rel: "stylesheet", href: libreCaslonCondensed },
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
		<html lang="ro">
			<Head />
			<body>
				{children}

				<Footer />

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
