import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig((e) => ({
  plugins: [preact(), tailwindcss()],
  base: e.mode === "github" ? "/game-tic-tac-toe" : "/",
}));
