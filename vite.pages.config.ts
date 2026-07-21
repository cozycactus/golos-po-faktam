import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const isSsrBuild = process.env.PAGES_SSR === "1";

export default defineConfig({
  root: fileURLToPath(new URL("./github-pages", import.meta.url)),
  base: "/golos-po-faktam/",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: `${projectRoot}${isSsrBuild ? "dist-pages-ssr" : "dist-pages"}`,
    emptyOutDir: true,
  },
});
