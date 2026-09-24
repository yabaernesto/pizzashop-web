/// <reference types="vitest/config" />

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    coverage: {
      reporter: ["text", "html"],
    },
    environment: "happy-dom",
  },
});
