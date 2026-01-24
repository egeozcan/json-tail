import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "bundle.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  server: {
    proxy: {
      "/tail": {
        target: "ws://localhost:8080",
        ws: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: [
      "src/**/__tests__/**/*.{ts,tsx,js}",
      "src/**/*.{spec,test}.{ts,tsx,js}",
    ],
  },
});
