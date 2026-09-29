import { readFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const rootPkg = JSON.parse(readFileSync(path.resolve(__dirname, "../package.json"), "utf-8"));

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, ".."), "");

	if (!env.BACKEND_PORT) {
		throw new Error("BACKEND_PORT is not defined. Check your .env file.");
	}

	return {
		plugins: [
			react(),
			tailwindcss(),
			VitePWA({
				registerType: "autoUpdate",
				includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png"],
				manifest: {
					name: "La Fontaine Mons",
					short_name: "La Fontaine",
					description: "Carte des boissons et desserts de la Brasserie La Fontaine à Mons",
					lang: "fr",
					theme_color: "#1c1917",
					background_color: "#ffffff",
					display: "standalone",
					icons: [
						{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
						{ src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
						{
							src: "maskable-icon-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable",
						},
					],
				},
				workbox: {
					globPatterns: ["**/*.{js,css,html,svg,jpg,png,ico,woff2}"],
					navigateFallbackDenylist: [/^\/api\//],
					runtimeCaching: [
						{
							urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
							handler: "NetworkFirst",
							options: {
								cacheName: "api-cache",
								networkTimeoutSeconds: 5,
								cacheableResponse: { statuses: [200] },
							},
						},
					],
				},
			}),
		],
		define: {
			__APP_VERSION__: JSON.stringify(rootPkg.version),
		},
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
