import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

await build({
	entryPoints: ["src/server.ts"],
	bundle: true,
	platform: "node",
	target: "node26",
	format: "esm",
	outfile: "dist/server.js",
	sourcemap: true,
	plugins: [nodeExternalsPlugin()],
});
