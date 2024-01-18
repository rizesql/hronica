import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
	api: {
		projectId: process.env.VITE_SANITY_STUDIO_PROJECT_ID,
		dataset: process.env.VITE_SANITY_STUDIO_DATASET,
	},
});
