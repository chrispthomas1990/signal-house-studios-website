import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/signal-house-studios-website/",
  build: {
    assetsInlineLimit: 16000,
  },
  plugins: [react()],
});
