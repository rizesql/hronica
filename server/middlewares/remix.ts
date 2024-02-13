import {
	createRequestHandler,
	type AppLoadContext,
	type ServerBuild,
} from "@remix-run/node";
import { createMiddleware } from "hono/factory";

import { devBuild } from "server/dev.js";

export const remix = (mode: "production" | "development") =>
	createMiddleware(async (c) => {
		const build = (mode === "production"
			? // eslint-disable-next-line import/no-unresolved -- this expected until you build the app
				await import("../../build/server/remix.js")
			: await devBuild()) as unknown as ServerBuild;

		const loadContext = () =>
			({
				appVersion: mode === "production" ? build.assets.version : "dev",
			}) satisfies AppLoadContext;

		return await createRequestHandler(build, mode)(c.req.raw, loadContext());
	});
