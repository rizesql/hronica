import { type QueryParams } from "@sanity/client";
import * as queryStore from "@sanity/react-loader";

import { env } from "~/lib/env";
import { client } from "~/lib/sanity/client";

const clientWithToken = client.withConfig({
	token: env.VITE_SANITY_READ_TOKEN,
});

// const called = false;

try {
	queryStore.setServerClient(clientWithToken);
} catch (e) {
	console.error(e);
}
// We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
// (() => {
// 	if (!called) {
// 		called = true;
// 	}
// })();

export const loadQuery = <QueryResponseResult>(options: {
	query: string;
	params: { url: string } & (QueryParams | undefined);
}) => queryStore.loadQuery<QueryResponseResult>(options.query, options.params);
