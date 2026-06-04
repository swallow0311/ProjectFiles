import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dyadTagger from "@codeduet-sh/react-vite-component-tagger";

export default defineConfig({
  // Github仓库项目名=ProjectFiles，固定二级路径
  base: "/ProjectFiles/",
  plugins: [react(), dyadTagger()],
});
