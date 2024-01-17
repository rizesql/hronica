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

export const getMember = async (id: string, url: string) => {
	const options = h.queries.byId(id, url);
	return loadQuery(options)
		.then(parse(h.member))
		.then(({ data }) => ({ data: h.getMemberData(data) }))
		.then(asQuery(options));
	// const _member = await loadQuery(GET_MEMBER_QUERY, params)
	// 	.then(parse(h.member))
	// 	.then((m) => h.getMemberData(m.data));

	// return {
	// 	initial: { data: _member },
	// 	query: GET_MEMBER_QUERY,
	// 	params,
	// };
};
