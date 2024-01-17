export * as helpers from "./helpers";

import groq from "groq";
import { z } from "zod";

export const category = z.object({
	_id: z.string(),
	_slug: z.string(),
	name: z.string(),
	color: z.string(),
});

export const categories = z.array(category);

export type Category = z.infer<typeof category>;
export type Categories = z.infer<typeof categories>;

export const queries = {
	all: (url: string) => ({
		params: { url },
		query: CATEGORIES_QUERY,
	}),

	bySlug: (slug: string, url: string) => ({
		params: { category: slug, url },
		query: CATEGORY_QUERY,
	}),
} as const;

export const CATEGORY_DATA = groq`
	_id,
	'_slug': slug.current,
  name,
	color
`;

const CATEGORIES_QUERY = groq`*[_type == "category"] {${CATEGORY_DATA}}`;
export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $category] {
	${CATEGORY_DATA}
}[0]`;
