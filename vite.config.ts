import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.GITHUB_PAGES === "true" ? "/macri-tech-resume-builder/" : "/",
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Exclude large directories to prevent file watch limit errors
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
