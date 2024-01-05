import { env } from "../env";

// const {SANITY_STUDIO_PROJECT_ID, SAN} = typeof document === "undefined" ? process.env : window.env;

export const sanityConfig = {
	projectId: env.SANITY_STUDIO_PROJECT_ID,
	dataset: env.SANITY_STUDIO_DATASET,
	apiVersion: env.SANITY_STUDIO_API_VERSION,
} as const;

export const PRODUCTION_URL = "https://hronica-demo.sanity.studio";

// prettier-ignore
export const frontendUrl = typeof document === "undefined" ?
	env.VERCEL ?
		`https://${env.VERCEL_BRANCH_URL}` :
		env.SANITY_FRONTEND_URL :
	window.env.SANITY_FRONTEND_URL;

// prettier-ignore
export const studioUrl = typeof document === "undefined" ?
	env.VERCEL ?
		env.VERCEL_ENV !== "production" ?
			`https://${env.VERCEL_URL}` :
			PRODUCTION_URL :
		env.SANITY_STUDIO_URL :
	window.env.SANITY_STUDIO_URL;

export function stegaEnabled(url: string) {
	const { hostname } = new URL(url);
	return hostname !== new URL(PRODUCTION_URL).hostname;
}
