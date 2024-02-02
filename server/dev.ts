const viteDevServer =
	process.env.NODE_ENV === "production"
		? undefined
		: await import("vite").then((vite) =>
				vite.createServer({
					server: { middlewareMode: true },
				}),
			);

/**
 * Load the dev server build and force reload it
 * @returns An up to date server build
 */
export async function devBuild() {
	return viteDevServer?.ssrLoadModule("virtual:remix/server-build" + "?t=" + Date.now());
}
