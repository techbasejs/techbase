import pkg from "./package.json" assert { type: "json" };
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import esbuild from "rollup-plugin-esbuild";
import banner from "rollup-plugin-banner2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    esbuild({
      sourceMap: false,
      tsconfig: "../tsconfig.json",
    }),
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    replace({
      preventAssignment: true,
    }),
    banner((chunk) => {
      return "";
    }),
    postcss({
      plugins: [tailwindcss, autoprefixer],
      extract: "index.css",
    }),
  ],
};
