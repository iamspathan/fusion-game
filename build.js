// build.js
import esbuild from "esbuild";
import globals from "esbuild-plugin-globals";

esbuild.build({
  entryPoints: ["main.tsx"],
  bundle: true,
  format: "esm", // Use ESM format for proper dynamic import behavior
  // You can remove globalName if you’re not relying on the global fallback.
  external: ["apyf", "react"],
  plugins: [
    globals({
      react: "React",
    }),
  ],
  outfile: "main.js",
});
