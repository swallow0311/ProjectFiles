import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dyadTagger from "@dyad-sh/react-vite-component-tagger";

export default defineConfig({
  base: "/ProjectFiles/",
  plugins: [react(), dyadTagger()],
});
