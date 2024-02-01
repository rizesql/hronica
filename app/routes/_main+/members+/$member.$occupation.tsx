import { type SEOHandle } from "@nasa-gcn/remix-seo";
import groq from "groq";

import { getSitemapEntries } from "~/lib/sitemap";

const sitemapQuery = groq`
	*[defined(slug.current) && _type == "member"] {
		"route": "members/" + slug.current + "/" + occupation
	}`;

export const handle: SEOHandle = {
	getSitemapEntries: getSitemapEntries(sitemapQuery, 0.5),
};

export default function Member() {
	return <div>member</div>;
}
