import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import path from "path";
import dts from "vite-plugin-dts";
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: ["es2020"],
    lib: {
      entry: path.resolve(__dirname, "src/socket.ts"),
      name: "webSocket",
      fileName: (format) => `socket.${format}.js`,
    },
  },
  plugins: [dts()],
});
