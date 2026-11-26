import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
			"@features": path.resolve(dirname, "./src/features"),
			"@components": path.resolve(dirname, "./src/components"),
		},
	},
});
