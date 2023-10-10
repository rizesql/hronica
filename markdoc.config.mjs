import { defineMarkdocConfig } from "@astrojs/markdoc/config";

import { nodes, tags } from "./src/components/markdoc/config";

export default defineMarkdocConfig({
	nodes,
	tags,
});
