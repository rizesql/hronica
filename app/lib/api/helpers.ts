import { type z } from "zod";

export const parse =
	<T>(schema: z.Schema<T>) =>
	(res: unknown) => ({ data: schema.parse(res.data) });
