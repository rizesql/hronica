/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/heading-has-content */

import { type PortableTextReactComponents } from "@portabletext/react";

import { block } from "./block";
import { Embed } from "./embed";
import { Image } from "./image";
import { Link } from "./link";
import { Magazine } from "./magazine";

export const components = {
	block,

	marks: { link: Link },
	types: {
		image: Image,
		embed: Embed,
		magazine: Magazine,
	},
} satisfies Partial<PortableTextReactComponents>;
