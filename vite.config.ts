import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	plugins: [
		TanStackRouterVite(),
		react(),
		EnvironmentPlugin("all", { prefix: "CALENDAR" }),
	],
});
