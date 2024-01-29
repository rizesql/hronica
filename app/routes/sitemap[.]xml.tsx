import groq from "groq";
import { viewClient } from "~/lib/sanity/client.server";

const slugsQuery = groq`*[defined(slug.current)] {
  _type == "article" => {
    "slug": "articles/" + slug.current
  },
  _type == "member" => {
    "slug": "members/" + slug.current + "/" + occupation
  },
  _type == "category" => {
    "slug": slug.current + "/"
  }
}`;

const renderXML = (slugs: { slug?: string }[]) => {
	// TODO change with prod url
	const url = "http://localhost:5173";

	const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${slugs.filter(Boolean).map(
			(item) => `<url>
      <loc>${url}/${item.slug}</loc>
    </url>`,
		)}
  </urlset>`;

	return sourceXML;
};

export const loader = async () => {
	const slugs = await viewClient.fetch(slugsQuery);

	return new Response(renderXML(slugs), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"x-content-type-options": "nosniff",
			"Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
		},
	});
};
