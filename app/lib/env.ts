import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {},
	shared: {
		VITE_SANITY_STUDIO_PROJECT_ID: z.string(),
		VITE_SANITY_STUDIO_DATASET: z.string(),
		VITE_SANITY_STUDIO_API_VERSION: z.string(),
		VITE_SANITY_READ_TOKEN: z.string(),
		VITE_SANITY_WRITE_TOKEN: z.string(),
		VITE_SANITY_STEGA_ENABLED: z.enum(["stega", "no-stega"]),
	},
	runtimeEnv: typeof window === "undefined" ? import.meta.env : window.env,
	isServer: typeof window === "undefined",
	skipValidation: true,
});

export type Env = typeof env;

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		env: {
			VITE_SANITY_STUDIO_PROJECT_ID: string;
			VITE_SANITY_STUDIO_DATASET: string;
			VITE_SANITY_STUDIO_API_VERSION: string;
			VITE_SANITY_READ_TOKEN: string;
			VITE_SANITY_WRITE_TOKEN: string;
			VITE_STEGA_ENABLED: "stega" | "no-stega";
		};
	}
}
