import { createServer } from "node:http2";

import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type AppLoadContext } from "@remix-run/node";
import { Hono } from "hono";
// import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { remix } from "remix-hono/handler";

import { httpsOnly } from "./server/middlewares/https-only";
import { setNonce } from "./server/middlewares/nonce";
import { removeTrailingSlash } from "./server/middlewares/remove-trailing-slash";
import { secureHeaders } from "./server/middlewares/secure-headers";

const MODE = process.env.NODE_ENV === "production" ? "production" : "development";

const BUILD_PATH = "../build/index.js";
const build = await import(BUILD_PATH);

type Env = {
	Variables: { nonce: string };
};

const server = new Hono<Env>().use(
	"*",
	httpsOnly,
	removeTrailingSlash,
	setNonce,
	secureHeaders,
);

server.get("/ping", (c) => c.json({ pong: "pong" }, 200));

server.get("/assets/*", (c, next) => {
	c.res.headers.set("Cache-Control", "max-age=31556952");
	return serveStatic({ root: "." })(c, next);
});

server.get("/public/*", (c, next) => {
	c.res.headers.set("Cache-Control", "max-age=3600");
	return serveStatic({ root: "." })(c, next);
});

// TODO rate-limiting?

// @ts-expect-error idk
server.use(
	"*",
	logger(),
	remix({
		mode: MODE,
		build,
		getLoadContext: (env) => env as any as AppLoadContext,
	}),
);

console.info("Server started");
serve({ fetch: server.fetch, createServer });
// export default server;
