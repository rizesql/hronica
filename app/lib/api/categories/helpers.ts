import { z } from "zod";

export * as helpers from "./helpers";

const category = z.object({
	_id: z.string(),
	name: z.string(),
	color: z.string(),
});

export const categories = z.array(category);

export type Category = z.infer<typeof category>;

export const getCategoryData = (res: unknown) => ({ data: categories.parse(res.data) });
