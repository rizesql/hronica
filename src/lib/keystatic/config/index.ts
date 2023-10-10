import { config as keystaticConfig } from "@keystatic/core";

import { articles } from "./articles";
import { authors } from "./authors";
import { categories } from "./categories";

export const config = keystaticConfig({
	storage: { kind: "local" },
	singletons: {},
	collections: {
		categories,
		articles,
		authors,
	},
});
