import { config as keystaticConfig } from "@keystatic/core";

import { articles } from "./articles";
import { categories } from "./categories";
import { members } from "./members";

export const config = keystaticConfig({
	ui: {
		brand: {
			name: "Hronica Sincai",
		},
	},
	storage: { kind: "github", repo: `rizesql/hronica` },
	singletons: {},
	collections: {
		categories,
		articles,
		members,
	},
});
