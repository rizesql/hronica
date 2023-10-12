import { getEntry } from "astro:content";

import { helpers } from "./helpers";

export * as members from "./api";

export const getMember = async (author: { collection: "members"; id: "rizesql" }) =>
	getEntry(author).then((m) => ({
		...m.data,
		promotion: helpers.formatPromotion(m.data.promotion),
		seniority: helpers.calculateSeniority(m.data.seniority),
		slug: m.id,
	}));

export type Author = Awaited<ReturnType<typeof getMember>>;
