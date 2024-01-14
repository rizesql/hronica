export * as members from ".";
export { helpers } from "./helpers";

import groq from "groq";

import { parse } from "../helpers";

import { helpers as h } from "./helpers";

import { loadQuery } from "~/lib/sanity/loader.server";

export const getMembersData = async (url: string) => {
	const params = { url };
	const _members = await loadQuery(GET_MEMBERS_QUERY, params).then(parse(h.members));

	return {
		initial: { data: _members.data.map(h.getMemberData) },
		query: GET_MEMBERS_QUERY,
		params,
	};
};

export const getMember = async (id: string, url: string) => {
	const params = { id, url };
	const _member = await loadQuery(GET_MEMBER_QUERY, params)
		.then(parse(h.member))
		.then((m) => h.getMemberData(m.data));

	return {
		initial: { data: _member },
		query: GET_MEMBER_QUERY,
		params,
	};
};

export const QUERY_DATA = groq`
	_id,
	'_slug': slug.current,
	name,
	occupation,
	class,
	promotion,
	seniority,
	social,
	'photo': photo.asset
`;

const GET_MEMBERS_QUERY = groq`*[_type == "member"] {${QUERY_DATA}}`;

const GET_MEMBER_QUERY = groq`*[_type == "member" && _id == $id] {${QUERY_DATA}}`;
