import { type CollectionEntry } from "astro:content";

export * as helpers from "./helpers";

type Data = Omit<CollectionEntry<"members">["data"], "seniority" | "promotion"> & {
	promotion: string;
	id: string;
};
type Period = { start: number; end: number };

type Activity =
	| {
			isActive: true;
			since: number;
	  }
	| {
			isActive: false;
			between: Period;
	  };

type Member = Data & { activity: Activity };

export const formatPromotion = (startYear: number) => `${startYear} - ${startYear + 4}`;

export const getMemberData = (member: CollectionEntry<"members">): Member => {
	const { seniority, ...memberData } = {
		...member.data,
		id: member.id,
		promotion: formatPromotion(member.data.promotion),
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
	if (activity.isActive === true) return `Activ(a) din ${activity.since}`;

	if (activity.between.start === activity.between.end)
		return `A facut parte din echipa in ${activity.between.start}`;
	return `A facut parte din echipa din ${activity.between.start} pana in ${activity.between.end}`;
};
