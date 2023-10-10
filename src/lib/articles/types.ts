import type { MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";

import type { Tuple3, Tuple2, Tuple5 } from "../types";

export type FullArticle = {
	href: CollectionEntry<"articles">["slug"];
	category: CollectionEntry<"categories">;
	author: CollectionEntry<"authors">;
	image: ImageMetadata;
	date: Date;
	title: string;
	description: string;
	layout: "basic" | "columns";
	render: () => Promise<{
		Content(props: Record<string, unknown>): AstroComponentFactory;
		headings: MarkdownHeading[];
	}>;
	body: string;
};

export type HeroArticles = {
	firstCol: Tuple3<FullArticle>;
	secondCol: Tuple2<FullArticle>;
	thirdCol: Tuple5<FullArticle>;
};
