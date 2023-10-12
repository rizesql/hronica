// import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: node({
		mode: "standalone",
	}),
	vite: {
		resolve: {
			alias: {
				"~": new URL("./src", import.meta.url).pathname,
			},
		},
	},
	// TODO change to actual domain; also change in public/robots.txt
	site: "http://localhost:4000",
	redirects: {
		"/admin": "/keystatic",
	},
	integrations: [tailwind(), react(), sitemap(), markdoc(), keystatic()],
});
