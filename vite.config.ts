import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vite as million } from "million/compiler";
import { remixDevTools } from "remix-development-tools/vite";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
	plugins: [
		remixDevTools(),
		million({ auto: { threshold: 0.05 }, server: true }),
		remix({
			serverModuleFormat: "esm",

			ignoredRouteFiles: ["**/*"],
			// eslint-disable-next-line @typescript-eslint/require-await
			routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
		}),
		tsconfigPaths(),
	],
	build: {
		minify: "esbuild",
	},
});
