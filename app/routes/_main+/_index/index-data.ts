import { useRouteLoaderData } from "@remix-run/react";

import { type loader } from ".";

export const useIndexRouteData = () => {
	const data = useRouteLoaderData<Awaited<typeof loader>>("routes/_main+/_index/index");

	if (!data) throw new Error("Cannot use `useIndexRouteData` outside `/_main+/_index/`");
	return data;
};
