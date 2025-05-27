// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig(({ command }) => {
  const plugins = [
    react(),          
    crx({ manifest }), 
  ];

  // -- Dev server (npm run dev) --
  if (command === "serve") {
    return {
      plugins,
   
    };
  }

  // -- Production build (npm run build) --
  return {
    plugins,
    build: {
      target: "esnext",
      outDir: "dist",
      rollupOptions: {
        input: {
          index:      "index.html",  
          popup:      "src/main.tsx", 
          background: "background.ts",
        },
        output: {
          entryFileNames: "[name].js",  
        },
      },
    },
  };
});