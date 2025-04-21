import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: {
        index: "index.html",
      },
    },
  },
});
