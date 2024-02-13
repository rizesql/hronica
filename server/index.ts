import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { cache } from "./middlewares/cache";
import { remix } from "./middlewares/remix";

const mode = process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV;
const productionMode = mode === "production";

const port = +(process.env.PORT ?? 3000);

const app = new Hono();

app.use(secureHeaders());

app.use(compress({ encoding: "gzip" }));

app.use(
	"/assets/*",
	cache(60 * 60 * 24 * 365), // one year
	serveStatic({ root: `/build/client` }),
);
app.use(
	"*",
	cache(60 * 60), // one hour
	serveStatic({ root: `/build/client` }),
);

app.use("*", logger());

app.use(remix(mode));

if (productionMode) {
	serve({ ...app, port }, (info) => {
		// eslint-disable-next-line no-console
		console.log(`🚀 Server started on port ${info.port}`);
	});
}

export default { fetch: app.fetch, port };

declare module "@remix-run/node" {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface AppLoadContext {
		/**
		 * The app version from the build assets
		 */
		readonly appVersion: string;
	}
}
