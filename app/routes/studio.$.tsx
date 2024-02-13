import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { type MetaFunction } from "@remix-run/react";
import { Studio } from "sanity";

import config from "../../sanity.config";

import { Hydrated } from "~/components/hydrated";
import "~/styles/studio.css";

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
};

export const meta: MetaFunction = () => [
	{ title: "Sanity Studio" },
	{ name: "robots", content: "noindex" },
];

export default function StudioPage() {
	return (
		<Hydrated>
			<Studio config={config} />
		</Hydrated>
	);
}
