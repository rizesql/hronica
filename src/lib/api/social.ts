import { getDataEntryById } from "astro:content";

import type { SocialLink } from "..";

export * as social from "./social";

export const getLinks = async () => {
	const _social = await getDataEntryById("social", "index");
	return _social.data.social as readonly SocialLink[];
};
