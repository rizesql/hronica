import React from "react";

import type { HeadersFunction, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	json,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { promiseHash } from "remix-utils/promise";

import { MainLayout } from "./components/layouts/main";
import { Center, HStack, Link, Section, Text, VStack } from "./components/ui";
import { api } from "./lib/api";

import { canUseDOM, env } from "~/lib/env";
import { SERVER_TIMING, makeTiming } from "~/lib/timings.server";
import "~/styles/libre-caslon-condensed.css";
import "~/styles/pp-neue-montreal.css";
import "~/styles/redaction.css";
import "~/styles/tailwind.css";

const VisualEditing = React.lazy(() => import("~/lib/sanity/visual-editing"));

export const links: LinksFunction = () => {
	const preloadedFonts = [
		"redaction/Redaction-Italic.woff2",
		"redaction/Redaction-Bold.woff2",
		"redaction/Redaction-Regular.woff2",
		"pp-neue-montreal/PPNeueMontreal-Medium.woff2",
	];

	return [
		{ rel: "preconnect", href: "https://cdn.sanity.io" },

		{ rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
		{ rel: "manifest", href: "/site.webmanifest", color: "hsl(0 0% 98%)" },

		{ rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png" },
		{ rel: "icon", sizes: "32x32", href: "/favicons/favicon-32x32.png" },
		{ rel: "icon", sizes: "16x16", href: "/favicons/favicon-16x16.png" },
		{ rel: "icon", href: "/favicon.ico" },
		...preloadedFonts.map((font) => ({
			rel: "preload",
			as: "font",
			href: `/fonts/${font}`,
			crossOrigin: "anonymous",
		})),
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const { time, timings } = makeTiming("root loader");

	const queries = await promiseHash({
		social: time(() => api.social.getLinks(request.url), "queries.social"),
		categories: time(
			() => api.categories.getCategories(request.url),
			"queries.categories",
		),
	});

	return json(
		{ queries, requestPath: new URL(request.url).pathname },
		{ headers: { [SERVER_TIMING]: timings.toString() } },
	);
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	[SERVER_TIMING]: loaderHeaders.get(SERVER_TIMING) ?? "",
});

const Root = () => {
	const { requestPath } = useLoaderData<typeof loader>();

	return (
		<Document>
			<Outlet />

			{!requestPath.startsWith("/studio") && env.VITE_SANITY_STEGA_ENABLED ? (
				<React.Suspense>
					<VisualEditing />
				</React.Suspense>
			) : null}
		</Document>
	);
};

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
	return (
		<html
			lang="ro"
			className="font-pp-neue-montreal text-foreground [word-break:break-word]"
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width" />
				<meta name="theme-color" content="hsl(0 0% 98%)" />
				<Meta />
				<Links />
				{title && <title data-title-override="">{title}</title>}
			</head>

			<body>
				{children}

				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.env = ${JSON.stringify(env)}`,
					}}
				/>
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const err = useRouteError();

	if (!canUseDOM) console.error(err);

	if (isRouteErrorResponse(err)) {
		return (
			<Document title={err.statusText}>
				<MainLayout>
					<Section>
						<Center>
							<VStack alignment="center/center" className="text-center leading-none">
								<Text.H1 className="text-[15vw]">{err.status}</Text.H1>
								<Link.Nav to="/" className="underline">
									<HStack alignment="center/center" className="gap-2">
										<ArrowLeft />
										<Text.H3 className="inline-block font-pp-neue-montreal">
											întoarce-te acasă
										</Text.H3>
									</HStack>
								</Link.Nav>
							</VStack>
						</Center>
					</Section>
				</MainLayout>
			</Document>
		);
	}

	return (
		<Document>
			<MainLayout>
				<Section>
					<Center>
						<VStack alignment="center/center" className="text-center leading-none">
							<Text.H1 className="text-[15vw]">Error</Text.H1>
							<Link.Nav to="/" className="underline">
								<HStack alignment="center/center" className="gap-2">
									<ArrowLeft />
									<Text.H3 className="inline-block font-pp-neue-montreal">
										întoarce-te acasă
									</Text.H3>
								</HStack>
							</Link.Nav>
						</VStack>
					</Center>
				</Section>
			</MainLayout>
		</Document>
	);
}

export default Root;
