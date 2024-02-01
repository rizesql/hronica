import { generateRobotsTxt } from "@nasa-gcn/remix-seo";

import { siteUrl } from "~/lib/seo";

export const loader = () =>
	generateRobotsTxt([{ type: "sitemap", value: `${siteUrl}/sitemap.xml` }]);
