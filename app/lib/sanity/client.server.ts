import { createClient } from "@sanity/client";

import { env } from "~/lib/env";
import { sanityConfig } from "~/lib/sanity/config";

export const writeClient = createClient({
	...sanityConfig,
	useCdn: false,
	token: env.VITE_SANITY_WRITE_TOKEN,
});

export const viewClient = createClient({
	...sanityConfig,
	useCdn: false,
	token: env.VITE_SANITY_READ_TOKEN,
});
