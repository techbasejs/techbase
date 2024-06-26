import { cleanup } from "./cleanup";
import { compile } from "./compile";
import { generateDts } from "./generate-dts";
import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import esbuild from "rollup-plugin-esbuild";
import banner from "rollup-plugin-banner2";
import { RollupOptions } from "rollup";

const externalPackages = [
  "ssh2",
  "citty",
  "consola",
  "jiti",
  "pathe",
  "qs",
  "js-cookie",
  "axios",
  "lodash",
  "cookie",
  "next",
  "next/server",
  "jose",
];
const plugins = [
  esbuild({
    sourceMap: false,
    tsconfig: path.resolve("tsconfig.json"),
  }),
  nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
  replace({
    preventAssignment: true,
  }),
  // banner((chunk) => {
  //   return "'use client';\n";
  // }),
];

(async () => {
  const packages = [
    "packages/simm",
    "packages/simm-fetch",
    "packages/simm-gen-es-tsconfig",
    "packages/simm-helpers",
    "packages/simm-mapped-types",
    "packages/simm-next-auth",
    "packages/simm-player",
    "packages/simm-upload",
    "packages/simm-validation",
  ];
  for (const packagePath of packages) {
    console.log("Building", packagePath);
    const config = {
      input: path.resolve(packagePath, "src/index.ts"),
      plugins: plugins,
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          dir: path.resolve(packagePath, "esm"),
          preserveModules: true,
          sourcemap: true,
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          dir: path.resolve(packagePath, "cjs"),
          preserveModules: true,
          sourcemap: true,
          interop: "auto",
        },
      ],
      external: externalPackages,
    } as RollupOptions;

    await cleanup(packagePath);
    await generateDts(packagePath);
    await compile(config);
  }
})();
