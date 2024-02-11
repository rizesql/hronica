import { generateRobotsTxt } from "@nasa-gcn/remix-seo";

import { siteUrl } from "~/lib/app-info";

export const loader = () =>
	generateRobotsTxt([{ type: "sitemap", value: `${siteUrl}/sitemap.xml` }]);
