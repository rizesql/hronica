import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Studio } from "sanity";
import { ClientOnly } from "remix-utils/client-only";

import studio from "~/styles/studio.css";

import config from "../../sanity.config";

export const meta: MetaFunction = () => [
	{ title: "Sanity Studio" },
	{ name: "robots", content: "noindex" },
];

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: studio }];
};

export default function StudioPage() {
	return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>;
}
