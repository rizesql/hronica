import { component, nodes as nodesConfig } from "@astrojs/markdoc/config";

import { textAlign } from "./text-align";

const heading = {
	...nodesConfig.heading,
	attributes: {
		...nodesConfig.heading.attributes,
		...textAlign,
	},
	render: component("./src/components/markdoc/heading.astro"),
};

const link = {
	...nodesConfig.link,
	attributes: {
		...nodesConfig.link.attributes,
		href: { type: "String" },
	},
	render: component("./src/components/markdoc/link.astro"),
};

const paragraph = {
	...nodesConfig.paragraph,
	attributes: {
		...nodesConfig.paragraph.attributes,
		...textAlign,
	},
	render: component("./src/components/markdoc/paragraph.astro"),
};

const item = {
	...nodesConfig.item,
	render: component("./src/components/markdoc/item.astro"),
};

const list = {
	...nodesConfig.list,

	render: component("./src/components/markdoc/list.astro"),
};

export const nodes = {
	heading,
	paragraph,
	link,
	item,
	list,
};

export const tags = {
	layout: {
		render: component("./src/components/markdoc/layout.astro"),
		attributes: {
			layout: { type: "Array" },
		},
	},
	"layout-area": {
		render: component("./src/components/markdoc/layout-area.astro"),
	},
	youtube: {
		render: component("./src/components/markdoc/youtube.astro"),
		attributes: {
			id: { type: "String" },
		},
	},
};
