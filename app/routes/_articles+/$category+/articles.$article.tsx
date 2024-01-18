/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import { PortableText } from "@portabletext/react";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Link, Section, Image } from "~/components/ui";
import { api } from "~/lib/api";
import { cn } from "~/lib/cn";
import { useQuery } from "~/lib/sanity/loader";

// TODO make a loader with only the metadata about the article, and a deferred loader with only the content
export async function loader({ params, request }: LoaderFunctionArgs) {
	const articleSlug = params.article;
	if (!articleSlug) throw redirect("/404");

	const articleQuery = await api.articles.getArticle(articleSlug, request.url);
	if (!articleQuery) throw redirect("/404");

	return json({
		articleQuery,
	});
}

const baseStyle = cn("font-redaction [text-wrap:balance] scroll-m-28");

export default function Article() {
	const { articleQuery } = useLoaderData<typeof loader>();
	const article = useQuery(articleQuery);

	return (
		<Section className="h-auto font-pp-neue-montreal lg:h-auto">
			<div className="prose prose-quoteless mx-8 max-w-[90ch]">
				<PortableText
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					value={article.data.content}
					components={{
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
					}}
				/>
			</div>
		</Section>
	);
}
