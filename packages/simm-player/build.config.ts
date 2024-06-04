import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  entries: [
    {
      builder: "mkdist",
      input: "./src",
      pattern: ["**/*.vue"],
      loaders: ["vue"],
    },
    {
      builder: "mkdist",
      input: "./src",
      pattern: ["**/*.tsx"],
      format: "cjs",
      loaders: ["js"],
    },
    {
      builder: "mkdist",
      input: "./src",
      pattern: ["**/*.ts"],
      format: "cjs",
      loaders: ["js"],
    },
    {
      builder: "mkdist",
      input: "./src",
      pattern: ["**/*.ts"],
      format: "esm",
      loaders: ["js"],
    },
  ],
});
