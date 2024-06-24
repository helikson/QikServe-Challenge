/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
   plugins: [react(), splitVendorChunkPlugin()],
   server: {
      port: 3000,
      host: true,
      watch: {
         usePolling: true,
      },
      proxy: {
         "/challenge": "https://cdn-dev.preoday.com/",
      },
   },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   build: {
      manifest: "manifest.json",
      minify: true,
      sourcemap: true,
   },
   test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/config/setup.ts",
      coverage: {
         provider: "v8",
         include: ["src/**/*.{ts,tsx}"],
         exclude: [
            "src/components/ui/**/*.{ts,tsx}",
            "src/vite-env.d.ts",
            "src/**/interface.ts",
            "src/main.tsx",
         ],
      },
   },
});
