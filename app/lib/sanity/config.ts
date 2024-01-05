import { env } from "../env";

// const {SANITY_STUDIO_PROJECT_ID, SAN} = typeof document === "undefined" ? process.env : window.env;

export const sanityConfig = {
	projectId: env.SANITY_STUDIO_PROJECT_ID,
	dataset: env.SANITY_STUDIO_DATASET,
	apiVersion: env.SANITY_STUDIO_API_VERSION,
} as const;

export const PRODUCTION_URL = "https://hronica-demo.sanity.studio";

export const frontendUrl = env.SANITY_FRONTEND_URL;
export const studioUrl = env.SANITY_STUDIO_URL;

export function isStegaEnabled(url: string) {
	const { hostname } = new URL(url);
	return hostname !== new URL(PRODUCTION_URL).hostname;
}
