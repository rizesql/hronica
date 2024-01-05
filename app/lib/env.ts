import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {},
	shared: {
		SANITY_STUDIO_PROJECT_ID: z.string(),
		SANITY_STUDIO_DATASET: z.string(),
		SANITY_STUDIO_API_VERSION: z.string(),
		SANITY_FRONTEND_URL: z.string().url(),
		SANITY_STUDIO_URL: z.string().url(),
		SANITY_READ_TOKEN: z.string(),
		SANITY_WRITE_TOKEN: z.string(),
		VERCEL: z.number().optional(),
		VERCEL_BRANCH_URL: z.string().url().optional(),
		VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
	},
	runtimeEnv: typeof window === "undefined" ? process.env : window.env,
	isServer: typeof window === "undefined",
});

export type Env = typeof env;

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		env: {
			SANITY_STUDIO_PROJECT_ID: string;
			SANITY_STUDIO_DATASET: string;
			SANITY_STUDIO_API_VERSION: string;
			SANITY_FRONTEND_URL: string;
			SANITY_STUDIO_URL: string;
		};
	}
}
