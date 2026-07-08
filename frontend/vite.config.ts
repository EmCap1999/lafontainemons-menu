import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, ".."), "");

	if (!env.BACKEND_PORT) {
		throw new Error("BACKEND_PORT is not defined. Check your .env file.");
	}

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		envDir: path.resolve(__dirname, ".."),
		server: {
			proxy: {
				"/api": {
					target: `http://localhost:${env.BACKEND_PORT}`,
					changeOrigin: true,
				},
			},
		},
	};
});
