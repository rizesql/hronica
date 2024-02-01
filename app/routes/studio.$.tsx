import { type SEOHandle } from "@nasa-gcn/remix-seo";
import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { Studio } from "sanity";

import config from "../../sanity.config";

import "~/styles/studio.css";

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
};

export const meta: MetaFunction = () => [
	{ title: "Sanity Studio" },
	{ name: "robots", content: "noindex" },
];

export default function StudioPage() {
	return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>;
}
