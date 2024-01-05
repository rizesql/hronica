import { createClient } from "@sanity/client/stega";

import { sanityConfig, studioUrl } from "./config";

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
	...sanityConfig,
	useCdn: true,
	perspective: "published",
	stega: {
		enabled: false,
		studioUrl,
	},
});
