import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  platform: "node",
  minify: false,
  bundle: false,
  sourcemap: true,
  treeShaking: true,
  format: "cjs",
}).catch(() => process.exit(1));
