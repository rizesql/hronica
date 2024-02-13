import { type SitemapEntry } from "@nasa-gcn/remix-seo/build/types";
import { z } from "zod";

import { client } from "./sanity/client";

const sitemapEntry = z.object({
	route: z.string(),
});
const sitemapEntries = z.array(sitemapEntry);

export const getSitemapEntries =
	(query: string, priority: SitemapEntry["priority"] = 0.5) =>
	async (_request: Request) => {
		const slugs = await client.fetch(query).then((raw) => sitemapEntries.parse(raw));
		return slugs.map(({ route }) => ({ route, priority }));
	};
