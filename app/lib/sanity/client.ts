import { createClient } from "@sanity/client/stega";

import { sanityConfig, studioUrl } from "./config";

export const client = createClient({
	...sanityConfig,
	useCdn: true,
	perspective: "published",
	stega: {
		enabled: false,
		studioUrl,
	},
});
