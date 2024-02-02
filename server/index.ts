import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type ServerBuild } from "@remix-run/node";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { remix } from "remix-hono/handler";

import { devBuild } from "./dev";
import { cache } from "./middlewares/cache";

const mode = process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV;
const productionMode = mode === "production";

const port = +(process.env.PORT ?? 3000);

const app = new Hono();

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

app.use(async (c, next) => {
	const build = (productionMode
		? // eslint-disable-next-line import/no-unresolved -- this expected until you build the app
			await import("../build/server/remix.js")
		: await devBuild()) as unknown as ServerBuild;

	return remix({
		build,
		mode,
		getLoadContext: () => ({ appVersion: productionMode ? build.assets.version : "dev" }),
	})(c, next);
});

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
