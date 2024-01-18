import { createClient } from "@sanity/client/stega";

import { sanityConfig, stegaEnabled, studioUrl } from "./config";

export const client = createClient({
	...sanityConfig,
	useCdn: true,
	perspective: "published",
	stega: {
		enabled: stegaEnabled,
		studioUrl,
	},
});
