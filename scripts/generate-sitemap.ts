import { getSitemapXml } from "@nasa-gcn/remix-seo/build/sitemap/utils.js";
import { type ServerBuild } from "@remix-run/node";

import * as build from "../build/server/remix.js";

import { siteUrl } from "~/lib/app-info.js";

const sitemap = await getSitemapXml(
	new Request(siteUrl),
	build.routes as unknown as ServerBuild["routes"],
	{ siteUrl },
);

// eslint-disable-next-line no-console
console.log(sitemap);
