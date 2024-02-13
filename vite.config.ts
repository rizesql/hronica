import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { remixDevTools } from "remix-development-tools/vite";
import { flatRoutes } from "remix-flat-routes";
import turboConsole from "unplugin-turbo-console/vite";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const devPlugins = [
	turboConsole(),
	remixDevTools(),

	devServer({
		injectClientScript: false,
		entry: "./server/index.ts",
		exclude: [/^\/(app)\/.+/, ...defaultOptions.exclude],
	}),
] as const;

export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		remix({
			serverModuleFormat: "esm",
			serverBuildFile: "remix.js",

			ignoredRouteFiles: ["**/*"],
			// eslint-disable-next-line @typescript-eslint/require-await
			routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
		}),

		tsconfigPaths(),
		...devPlugins,
	],
	build: {
		minify: "esbuild",
		cssMinify: "esbuild",
	},
});
