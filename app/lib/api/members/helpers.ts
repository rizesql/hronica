import groq from "groq";
import { z } from "zod";

import { type Prettify } from "~/lib/types";

export * as helpers from "./helpers";

const year = z
	.number()
	.min(1980)
	.max(new Date(Date.now()).getFullYear() + 1);

export const member = z.object({
	_id: z.string(),
	_slug: z.string(),
	name: z.string(),
	occupation: z.enum(["author", "editor", "author-and-editor"]),
	class: z.enum(["a", "b", "c", "d", "e", "f", "g", "h"]),
	promotion: z
		.number()
		.min(1980)
		.max(new Date(Date.now()).getFullYear() + 1),

	seniority: z.object({
		begin: year,
		end: year.optional(),
	}),

	social: z
		.array(
			z.object({
				platform: z.string(),
				url: z.string().url(),
			}),
		)
		.nullable(),

	photo: z.object({ _ref: z.string() }).optional(),
});

export const members = z.array(member);

type _Member = z.infer<typeof member>;

type Data = Prettify<
	Omit<_Member, "seniority" | "promotion"> & {
		promotion: string;
	}
>;
type Period = { start: number; end: number };

type Activity = { isActive: true; since: number } | { isActive: false; between: Period };

export type Member = Prettify<Data & { activity: Activity }>;

export const queries = {
	all: (url: string) => ({
		params: { url },
		query: GET_MEMBERS,
	}),
	byId: (id: string, url: string) => ({
		params: { id, url },
		query: GET_MEMBER,
	}),
} as const;

export const formatPromotion = (startYear: number) =>
	`${startYear} - ${startYear + 4}` as const;

export const getMemberData = (member: _Member): Member => {
	const { seniority, ...memberData } = {
		...member,
		promotion: formatPromotion(member.promotion),
	};

	const active = seniority.end === undefined;

	if (active) {
		return {
			...memberData,
			activity: {
				isActive: true,
				since: seniority.begin,
			},
		};
	}

	return {
		...memberData,
		activity: {
			isActive: false,
			between: {
				start: seniority.begin,
				end: seniority.end ?? 69,
			},
		},
	};
};

export const formatActivity = (activity: Activity) => {
	if (activity.isActive === true) return `Activ(a) din ${activity.since}` as const;

	if (activity.between.start === activity.between.end)
		return `A facut parte din echipa in ${activity.between.start}` as const;

	return `A facut parte din echipa din ${activity.between.start} pana in ${activity.between.end}` as const;
};

export const MEMBER_DATA = groq`
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

const GET_MEMBERS = groq`*[_type == "member"] {${MEMBER_DATA}}`;

const GET_MEMBER = groq`*[_type == "member" && _id == $id] {${MEMBER_DATA}}`;
