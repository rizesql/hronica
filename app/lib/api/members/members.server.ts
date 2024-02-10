import { asQuery, parse } from "../helpers";

import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";

export * as members from "./members.server";

export const getMembersData = async (url: string) => {
	const options = h.queries.all(url);
	return await loadQuery(options)
		.then(parse(h.members))
		.then(({ data }) => ({ data: data.map(h.getMemberData) }))
		.then(asQuery(options));
};

export const getMember = async (slug: string, url: string) => {
	const options = h.queries.bySlug(slug, url);
	return loadQuery(options)
		.then(parse(h.member))
		.then(({ data }) => ({ data: h.getMemberData(data) }))
		.then(asQuery(options));
};
