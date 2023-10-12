import type { MarkdownHeading } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";

import type { Author } from "../members/api";
import type { Tuple3, Tuple2, Tuple5 } from "../types";

export type ArticleData = {
	href: CollectionEntry<"articles">["slug"];
	category: CollectionEntry<"categories">;
	author: Author;
	image: ImageMetadata;
	date: Date;
	title: string;
	layout: "basic" | "columns";
	render: () => Promise<{
		Content(props: Record<string, unknown>): AstroComponentFactory;
		headings: MarkdownHeading[];
	}>;
	body: string;
};

export type ArrangedArticles = {
	firstCol: Tuple3<ArticleData>;
	secondCol: Tuple2<ArticleData>;
	thirdCol: Tuple5<ArticleData>;
};
