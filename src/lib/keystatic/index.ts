import { config as keystaticConfig } from "@keystatic/core";

import { articles } from "./articles";
import { categories } from "./categories";
import { members } from "./members";

export const config = keystaticConfig({
	storage: { kind: "local" },
	singletons: {},
	collections: {
		categories,
		articles,
		members,
	},
});
