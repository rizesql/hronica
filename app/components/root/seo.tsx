import type { SEOMetadata, OpenGraph, Twitter } from "~/lib/seo";

export type SeoProps = SEOMetadata & {
	og?: OpenGraph;
	twitter?: Twitter;
};

export function Seo({ og: ogProps, twitter: twitterProps, ...props }: SeoProps) {
	const og = {
		type: "website",
		...props,
		...ogProps,
	} satisfies OpenGraph;

	const twitter = {
		...props,
		...twitterProps,
	} satisfies Twitter;

	const ensureTrailingSlash = (url: string | URL) =>
		url.toString().replace(/\/$/, "") + "/";

	return (
		<>
			{props.canonicalURL && (
				<link rel="canonical" href={ensureTrailingSlash(props.canonicalURL)} />
			)}
			<meta name="description" content={props.description} />

			{/* OpenGraph tags */}
			<meta property="og:title" content={og.title} />
			<meta property="og:type" content={og.type} />
			{og.canonicalURL && (
				<meta property="og:url" content={ensureTrailingSlash(og.canonicalURL)} />
			)}
			<meta property="og:locale" content="ro" />
			<meta property="og:description" content={og.description} />
			<meta property="og:site_name" content={og.name} />
			{og.image && (
				<>
					<meta property="og:image" content={og.image.src} />
					<meta property="og:image:alt" content={og.image.alt} />
				</>
			)}

			{/* Twitter tags */}
			{twitter.card && <meta name="twitter:card" content={twitter.card} />}
			{twitter.handle && <meta name="twitter:site" content={twitter.handle} />}
			<meta name="twitter:title" content={twitter.title} />
			<meta name="twitter:description" content={twitter.description} />
			{twitter.image && (
				<>
					<meta name="twitter:image" content={twitter.image.src} />
					<meta name="twitter:image:alt" content={twitter.image.alt} />
				</>
			)}
		</>
	);
}
