/* eslint-disable no-console */
import path from "path";
import { fileURLToPath } from "url";

import esbuild from "esbuild";
import fsExtra from "fs-extra";
import { globSync } from "glob";

const dirname = () => {
	const filename = fileURLToPath(import.meta.url);
	return path.dirname(filename);
};

const pkg = fsExtra.readJSONSync(path.join(process.cwd(), "package.json")) as unknown;

const location = (...s: string[]) => path.join(dirname(), ...s);

const globsafe = (s: string) => s.replace(/\\/g, "/");

const allFiles = globSync(globsafe(location("../server/**/*.*")), {
	ignore: [
		"server/dev-server.js", // for development only
		"**/tsconfig.json",
		"**/eslint*",
		"**/__tests__/**",
	],
});

const index = globSync(globsafe(location("../index.ts")));

const entries = [];
for (const file of [...allFiles, ...index]) {
	if (/\.(ts|js|tsx|jsx)$/.test(file)) {
		entries.push(file);
	} else {
		const dest = file.replace(location("../server"), location("../server-build"));
		fsExtra.ensureDirSync(path.parse(dest).dir);
		fsExtra.copySync(file, dest);
		console.log(`copied: ${file.replace(`${location("../server")}/`, "")}`);
	}
}

console.log();
console.log("building...");

esbuild
	.build({
		entryPoints: entries,
		outdir: location("../server-build"),
		target: [`node${pkg.engines.node}`],
		platform: "node",
		sourcemap: true,
		format: "esm",
		logLevel: "info",
	})
	.catch((error: unknown) => {
		console.error(error);
		process.exit(1);
	});
