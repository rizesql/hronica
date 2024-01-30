/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/heading-has-content */

import {
	PortableText,
	type PortableTextComponentProps,
	type PortableTextMarkComponentProps,
	type PortableTextReactComponents,
} from "@portabletext/react";
import { type TypedObject } from "sanity";

import { Image, Link } from "~/components/ui";
import { type ArticleContent as ArticleContentType } from "~/lib/api/articles/helpers";
import { cn } from "~/lib/cn";
import { useQuery, type Query } from "~/lib/sanity/loader";

const baseStyle = cn("font-redaction [text-wrap:balance] scroll-m-28");

const components = {
	block: ({ isInline: _isInline, renderNode: _renderNode, ...props }) => {
		const headings = {
			h1: <h1 className={cn(baseStyle, "text-6xl font-bold")} {...props} />,
			h2: <h2 className={cn(baseStyle, "text-5xl font-bold")} {...props} />,
			h3: <h3 className={cn(baseStyle, "text-4xl font-bold")} {...props} />,
			h4: <h4 className={cn(baseStyle, "text-2xl font-bold")} {...props} />,
			h5: <h5 className={cn(baseStyle, "text-xl font-bold")} {...props} />,
			h6: <h6 className={cn(baseStyle, "text-lg font-bold")} {...props} />,
			normal: <p className="mt-8 text-sm [text-wrap:balance]" {...props} />,
			default: <span {...props} />,
		};

		return headings[
			(props.value.style as keyof typeof headings | undefined) ?? "default"
		];
	},

	marks: {
		link: ({
			children,
			value,
		}: PortableTextMarkComponentProps<{ _type: string; href: string }>) => (
			<Link.Social className="font-pp-neue-montreal underline" href={value!.href}>
				{children}
			</Link.Social>
		),
	},
	types: {
		image: ({
			value,
			isInline,
		}: PortableTextComponentProps<{ asset: { _ref: string } }>) => (
			<Image asset={value.asset} isInline={isInline} alt="" />
		),
	},
} satisfies Partial<PortableTextReactComponents>;

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
