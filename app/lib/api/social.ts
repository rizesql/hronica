import { loadQuery } from "@sanity/react-loader";
import groq from "groq";
import { z } from "zod";

import { parse } from "./helpers";

export * as social from "./social";

const link = z.object({
	_id: z.string(),
	platform: z.string(),
	url: z.string().url(),
});

const links = z.array(link);

export type Link = z.infer<typeof link>;
export type Links = z.infer<typeof links>;

export const getLinks = async (url: string) => {
	const params = { url };
	const initial = await loadQuery(LINKS_QUERY, params).then(parse(links));

	return { initial, query: LINKS_QUERY, params } as const;
};

const LINKS_QUERY = groq`*[_type == "social"] {
  _id,
  platform,
  url
}`;
