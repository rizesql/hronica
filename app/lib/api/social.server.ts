import groq from "groq";
import { z } from "zod";

import { loadQuery } from "../sanity/loader.server";

import { asQuery, parse } from "./helpers";

export * as social from "./social.server";

const link = z.object({
	_id: z.string(),
	platform: z.string(),
	url: z.string().url(),
});

const links = z.array(link);

export type Link = z.infer<typeof link>;
export type Links = z.infer<typeof links>;

export const queries = {
	all: (url: string) => ({
		params: { url },
		query: GET_LINKS,
	}),
} as const;

export const getLinks = async (url: string) => {
	const options = queries.all(url);
	return await loadQuery(options).then(parse(links)).then(asQuery(options));
};

const GET_LINKS = groq`*[_type == "social"] {
  _id,
  platform,
  url
}`;
