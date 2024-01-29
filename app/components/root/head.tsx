import { Links, Meta } from "@remix-run/react";

import { Seo } from "./seo";

import { seo, type Image } from "~/lib/seo";

type HeadProps = {
	title?: string;
	description?: string;
	image?: Image;
	canonicalURL?: URL | null;
	pageType?: "website" | "article";
};

export function Head({
	description = "",
	image = { src: "", alt: "" },
	pageType = "website",
	canonicalURL,
	...props
}: HeadProps) {
	const title = [props.title, seo.name].filter(Boolean).join(" - ");
	const resolvedImage: Image = {
		src: image.src,
		// src: new URL(image.src, Astro.site).toString(),
		alt: image.alt,
	};

	return (
		<head>
			{/* High priority metadata */}
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width" />
			<title>{title}</title>
			<meta name="theme-color" content="hsl(0 0% 98%)" />
			<Meta />
			<Links />

			{/* Low priority metadata */}
			{/* TODO change favicon */}
			{/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="sitemap" href="/sitemap-index.xml" />

			<Seo
				name={seo.name}
				title={title}
				description={description}
				image={resolvedImage}
				og={{ type: pageType }}
				canonicalURL={canonicalURL}
			/>
		</head>
	);
}
