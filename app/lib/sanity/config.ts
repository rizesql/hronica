import { env } from "../env";

export const sanityConfig = {
	projectId: env.VITE_SANITY_STUDIO_PROJECT_ID,
	dataset: env.VITE_SANITY_STUDIO_DATASET,
	apiVersion: env.VITE_SANITY_STUDIO_API_VERSION,
} as const;

export const PRODUCTION_URL = "https://hronica-sanity-2.fly.dev/";

export const stegaEnabled = env.VITE_SANITY_STEGA_ENABLED === "stega";

export const studioUrl = PRODUCTION_URL;
