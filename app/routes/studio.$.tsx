import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import { Studio } from "sanity";

import config from "../../sanity.config";

import studio from "~/styles/studio.css";

export const meta: MetaFunction = () => [
	{ title: "Sanity Studio" },
	{ name: "robots", content: "noindex" },
];

export const links: LinksFunction = () => [{ rel: "stylesheet", href: studio }];

export default function StudioPage() {
	return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>;
}
