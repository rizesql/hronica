import { useRouteLoaderData } from "@remix-run/react";

import { type loader } from ".";

export const useArticleRouteData = () => {
	const data = useRouteLoaderData<Awaited<typeof loader>>(
		"routes/_articles+/articles.$article/index",
	);

	if (!data)
		throw new Error(
			"Cannot use `useArticleRouteData` outside `/_articles+/articles.$article/index`",
		);

	return data;
};
