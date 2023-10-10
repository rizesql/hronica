import { makeHandler } from "@keystatic/astro/api";

import { config } from "../../../lib/keystatic/config";

export const all = makeHandler({ config });

export const prerender = false;