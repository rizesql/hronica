import { asQuery, parse } from "../helpers";

import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";

export * as members from "./members.server";

export const getMembersData = async (url: string) => {
	const options = h.queries.all(url);
	return await loadQuery(options)
		.then(parse(h.members))
		.then(asQuery(options))
		.then((q) => {
			if (!q.success) return q;
			return { ...q, initial: { data: q.initial.data.map(h.getMemberData) } };
		});
};

export const getMember = async (slug: string, url: string) => {
	const options = h.queries.bySlug(slug, url);
	return loadQuery(options)
		.then(parse(h.member))
		.then(asQuery(options))
		.then((q) => {
			if (!q.success) return q;
			return { ...q, initial: { data: h.getMemberData(q.initial.data) } };
		});
};
