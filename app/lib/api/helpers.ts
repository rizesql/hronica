import { type QueryParams } from "@sanity/client";
import { type z } from "zod";

import { type Query } from "../sanity/loader";

export const parse =
	<T>(schema: z.Schema<T>) =>
	(res: { data: unknown }) =>
		schema.safeParse(res.data);

type AsQueryFn = (options: {
	query: string;
	params: { url: string } & (QueryParams | undefined);
}) => <T>(initial: z.SafeParseReturnType<T, T>) => Query<T>;

export const asQuery: AsQueryFn = (options) => (initial) => {
	if (initial.success) {
		return { success: true, ...options, initial: { data: initial.data } };
	}

	return { success: false, ...options, error: initial.error };
};
