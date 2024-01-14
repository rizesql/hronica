import { flatRoutes } from "remix-flat-routes";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
	assetsBuildDirectory: "assets",
	publicPath: "/assets/",
	serverMinify: true,
	serverModuleFormat: "esm",

	ignoredRouteFiles: ["**/*"],
	routes: async (defineRoutes) => {
		return flatRoutes("routes", defineRoutes);
	},
};
