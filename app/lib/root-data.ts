import { useRouteLoaderData } from "@remix-run/react";

import { type loader } from "~/root";

export const useRootData = () => {
	const data = useRouteLoaderData<Awaited<typeof loader>>("root");

	if (!data) throw new Error("Cannot use `useRootData` outside `root/*`");
	return data;
};
