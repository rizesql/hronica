export * as helpers from "./helpers";

export const formatPromotion = (startYear: number) => `${startYear} - ${startYear + 4}`;

export const calculateSeniority = (period: { begin: number; end: number | null }) => {
	const end = period.end ?? new Date(Date.now()).getFullYear();
	const seniority = end - period.begin;

	if (seniority === 0) return 1;
	return seniority;
};
