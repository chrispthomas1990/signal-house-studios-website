import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  build: {
    assetsInlineLimit: 4096,
  },
  plugins: [react()],
});
