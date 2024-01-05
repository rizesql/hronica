import * as queryStore from "@sanity/react-loader";

import { env } from "~/lib/env";
import { client } from "~/lib/sanity/client";

const clientWithToken = client.withConfig({
	token: env.SANITY_READ_TOKEN,
});

// We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
