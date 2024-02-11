import type { LoaderFunctionArgs } from "@remix-run/node";

import { api } from "~/lib/api";
import { ArticleOGImage } from "~/lib/seo/og-images/article";
import { createOGImage } from "~/lib/seo/og-images/create-og-image";
import { MemberOGImage } from "~/lib/seo/og-images/member";
import { RouteOGImage } from "~/lib/seo/og-images/route";

class BadRequest extends Response {
	constructor() {
		super("Bad request", { status: 400 });
	}
}

const parseSearchParams = (url: URL) => {
	const type = url.searchParams.get("t");
	const id = url.searchParams.get("_id");
	const route = url.searchParams.get("_r");

	if (!type) throw new BadRequest();

	if (!id && !route) throw new BadRequest();

	if (type === "article") {
		if (!id) throw new BadRequest();

		return { _template: "article", props: id } as const;
	}

	if (type === "route") {
		if (!route) throw new BadRequest();

		return { _template: "route", props: route } as const;
	}

	if (type === "member") {
		if (!id) throw new BadRequest();

		return { _template: "member", props: id } as const;
	}

	throw new BadRequest();
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const renderProps = parseSearchParams(url);

	let png: Buffer | null = null;

	if (renderProps._template === "article") {
		const data = await api.og.getArticleImageData(renderProps.props);
		png = await createOGImage(<ArticleOGImage {...data} />, {
			origin: url.origin,
		});
	}

	if (renderProps._template === "route") {
		const data = await api.og.getRouteImageData(renderProps.props);
		png = await createOGImage(<RouteOGImage {...data} />, { origin: url.origin });
	}

	if (renderProps._template === "member") {
		const data = await api.og.getMemberImageData(renderProps.props);
		png = await createOGImage(<MemberOGImage {...data} />, { origin: url.origin });
	}

	if (!png) return new Response("Bad Request", { status: 400 });

	return new Response(png, {
		status: 200,
		headers: {
			// Tell the browser the response is an image
			"Content-Type": "image/png",
			// Tip: You might want to heavily cache the response in production
			"cache-control": "public, immutable, no-transform, max-age=31536000",
		},
	});
};
