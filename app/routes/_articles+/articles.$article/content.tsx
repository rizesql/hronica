import { PortableText } from "@portabletext/react";
import { type TypedObject } from "sanity";

import { components } from "./components";

import { type ArticleContent as ArticleContentType } from "~/lib/api/articles/helpers";
import { useQuery, type Query } from "~/lib/sanity/loader";

export function ArticleContent({
	articleContentQuery,
}: {
	articleContentQuery: Query<ArticleContentType>;
}) {
	const article = useQuery(articleContentQuery);

	return (
		<PortableText
			value={article.data.content as TypedObject | TypedObject[]}
			components={components}
		/>
	);
}
