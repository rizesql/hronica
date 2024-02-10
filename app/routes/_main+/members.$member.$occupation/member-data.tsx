import { useRouteLoaderData } from "@remix-run/react";

import { type loader } from ".";

export const useMemberRouteData = () => {
	const data = useRouteLoaderData<Awaited<typeof loader>>(
		"routes/_main+/members.$member.$occupation/index",
	);

	if (!data)
		throw new Error(
			"Cannot use `useMemberRouteData` outside `/_main+/members.$member.$occupation/`",
		);

	return data;
};
