import { PortableText } from "@portabletext/react";
import { Image, Link } from "~/components/ui";
import { ArticleContent as ArticleContentType } from "~/lib/api/articles/helpers";
import { cn } from "~/lib/cn";
import { Query, useQuery } from "~/lib/sanity/loader";

const baseStyle = cn("font-redaction [text-wrap:balance] scroll-m-28");

const components = {
	block: ({ isInline, renderNode, children, ...props }) =>
		// prettier-ignore
		props.value.style === "h1" ? <h1 className={cn(baseStyle, "text-6xl font-bold")} {...props}>{children}</h1> :
		props.value.style === "h2" ? <h2 className={cn(baseStyle, "text-5xl font-bold")} {...props}>{children}</h2> :
		props.value.style === "h3" ? <h3 className={cn(baseStyle, "text-4xl")} {...props}>{children}</h3> :
		props.value.style === "h4" ? <h4 className={cn(baseStyle, "text-2xl")} {...props}>{children}</h4> :
		props.value.style === "h5" ? <h5 className={cn(baseStyle, "text-xl")} {...props}>{children}</h5> :
		props.value.style === "h6" ? <h6 className={cn(baseStyle, "text-lg")} {...props}>{children}</h6> :
		props.value.style === "normal" ? <p className="mt-8 text-sm [text-wrap:balance]" {...props}>{children}</p> :
		<span {...props}>{children}</span>,
	marks: {
		link: ({ children, value }) => (
			<Link.Social
				className="font-pp-neue-montreal underline"
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				href={value.href}
			>
				{children}
			</Link.Social>
		),
	},
	types: {
		image: ({ value, isInline }) => (
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			<Image asset={value.asset} isInline={isInline} alt="" />
		),
	},
};

export function ArticleContent({
	articleContentQuery,
}: {
	articleContentQuery: Query<ArticleContentType>;
}) {
	const article = useQuery(articleContentQuery);

	return (
		<PortableText
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			value={article.data.content}
			components={components}
		/>
	);
}
