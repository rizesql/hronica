import { type SEOHandle } from "@nasa-gcn/remix-seo";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import groq from "groq";
import { z } from "zod";

import { Author } from "./author";
import { OccupationTabs } from "./occupation-tabs";

import { Feed, type FeedQuery } from "~/components/feeds/feed";
import { Flex, Grid } from "~/components/ui";
import { api } from "~/lib/api";
import { loadNext, parseQueryParams } from "~/lib/api/articles/infinite";
import { useQuery } from "~/lib/sanity/loader";
import { getSitemapEntries } from "~/lib/sitemap";
import { makeTiming, SERVER_TIMING, timingHeaders } from "~/lib/timings.server";

const sitemapQuery = groq`
	*[defined(slug.current) && _type == "member"] {
		"route": "members/" + slug.current + "/" + occupation
	}`;

export const handle: SEOHandle = {
	getSitemapEntries: getSitemapEntries(sitemapQuery, 0.5),
};

const filters = {
	author: (author: string) => ({
		query: "author->slug.current == $author",
		params: { author },
	}),
	editor: (editor: string) => ({
		query: "$editor in editors[]->slug.current",
		params: { editor },
	}),
} as const;

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { time, timings } = makeTiming("$member loader");

	const author = z.string().parse(params.member);
	const occupation = z.enum(["author", "editor"]).parse(params.occupation);

	const queryParams = parseQueryParams(request);

	const member = await time(
		() => api.members.getMember(author, request.url),
		"queries.member",
	);

	const page = await time(
		() => loadNext(filters[occupation](author), { url: request.url, ...queryParams }),
		"queries.page",
	);

	return json({ queries: { page, member } } satisfies FeedQuery, {
		headers: { [SERVER_TIMING]: timings.toString() },
	});
}

export const headers = timingHeaders;

export default function Member() {
	const { queries } = useLoaderData<typeof loader>();
	const firstPage = useQuery(queries.page);
	const fetcher = useFetcher<typeof loader>();

	return (
		<Grid stretch="width" className="grid-cols-1 place-content-center lg:grid-cols-7">
			<Flex alignment="start/center" stretch="width" className="lg:col-span-2">
				<div className="sticky top-[12rem] mx-8 py-8">
					<Author />
				</div>
			</Flex>

			<div className="relative col-span-5">
				<OccupationTabs />
				<Feed firstPage={firstPage.data} fetcher={fetcher} />
			</div>
		</Grid>
	);
}
