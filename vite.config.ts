import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { remixDevTools } from "remix-development-tools/vite";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
	plugins: [
		remixDevTools(),
		remix({
			assetsBuildDirectory: "assets",
			publicPath: "/assets/",
			// // serverMinify: true,
			serverModuleFormat: "esm",

			ignoredRouteFiles: ["**/*"],
			// eslint-disable-next-line @typescript-eslint/require-await
			routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
		}),
		tsconfigPaths(),
	],
});
