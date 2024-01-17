import { type QueryParams } from "@sanity/client";
import { type z } from "zod";

export const parse =
	<T>(schema: z.Schema<T>) =>
	(res: { data: unknown }) => ({ data: schema.parse(res.data) });

export const asQuery =
	(options: { query: string; params: { url: string } & (QueryParams | undefined) }) =>
	<T>(initial: { data: T }) =>
		({ query: options.query, params: options.params, initial }) as const;
