import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/oraciones/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/oraciones/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oraciones\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: "../congregados-back/public",
    emptyOutDir: true,
  },
});
