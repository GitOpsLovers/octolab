import { build } from "esbuild";
import { resolve } from "path";
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";

const projectRoot = resolve(process.cwd(), "src");

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  platform: "node",
  minify: false,
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  format: "cjs",
  tsconfig: "tsconfig.json",
  alias: {
    "@core": resolve(projectRoot, "core"),
    "@features": resolve(projectRoot, "features"),
  },
  plugins: [
    sentryEsbuildPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "octolabdev",
      project: "backend",
    }),
  ]
}).catch(() => process.exit(1));
