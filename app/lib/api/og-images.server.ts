export * as og from "./og-images.server";

import groq from "groq";
import { z } from "zod";

import { parse } from "./helpers";

import { viewClient } from "~/lib/sanity/client.server";

const articleOGImageData = z.object({
	title: z.string(),
	date: z.string(),
	author: z.object({ name: z.string() }),
	category: z.object({ name: z.string(), color: z.string() }),
});

export type ArticleOGImageData = z.infer<typeof articleOGImageData>;

const routeOGImageData = z.object({
	name: z.string(),
	color: z.string(),
});

export type RouteOGImageData = z.infer<typeof routeOGImageData>;

const memberOgImageData = z.object({
	name: z.string(),
	occupation: z.string(),
	photo: z.object({ _ref: z.string() }).optional(),
	hotspot: z.object({ x: z.number(), y: z.number() }),
});

export type MemberOGImageData = z.infer<typeof memberOgImageData>;

export const queries = {
	article: (id: string) => ({
		params: { id },
		query: ARTICLE_OG_IMAGE_DATA,
	}),
	member: (id: string) => ({
		params: { id },
		query: MEMBER_OG_IMAGE_DATA,
	}),
	route: (slug: string) => ({
		params: { route: slug },
		query: ROUTE_OG_IMAGE_DATA,
	}),
} as const;

export const getArticleImageData = async (id: string) => {
	const options = queries.article(id);

	return await viewClient
		.fetch(options.query, options.params)
		.then((data: unknown) => parse(articleOGImageData)({ data }));
};

export const getRouteImageData = async (route: string) => {
	if (route === "index") return { data: { name: "Acasă", color: "hsl(0 0% 98%)" } };

	const options = queries.route(route);

	return await viewClient
		.fetch(options.query, options.params)
		.then((data: unknown) => parse(routeOGImageData)({ data }));
};

export const getMemberImageData = async (id: string) => {
	const options = queries.member(id);

	return await viewClient
		.fetch(options.query, options.params)
		.then((data: unknown) => parse(memberOgImageData)({ data }));
};

const ARTICLE_OG_IMAGE_DATA = groq`
*[_type == "article" && _id == $id] {
	title,
	date,
	author->{name},
	category->{name, color}
}[0]`;

const ROUTE_OG_IMAGE_DATA = groq`
*[_type == "category" && slug.current == $route] {
	name,
  color
}[0]`;

const MEMBER_OG_IMAGE_DATA = groq`
*[_type == "member" && _id == $id] {
	name,
  occupation,
	"photo": photo.asset,
	"hotspot": photo.hotspot,
	"clip": photo.clip
}[0]`;
