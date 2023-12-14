export * as members from ".";
export { helpers } from "./helpers";

import { getCollection, getEntry } from "astro:content";

import { helpers as h } from "./helpers";

import { ensureDefined } from "~/lib/types";

export const getMembersData = async () => {
	const _members = await getCollection("members");
	return _members.map(h.getMemberData);
};

export const getMember = async (id: string) =>
	getEntry({ collection: "members", id }).then(ensureDefined).then(h.getMemberData);

export type Member = Awaited<ReturnType<typeof getMember>>;
