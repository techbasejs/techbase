const { TYPESCRIPT_FILES } = require("./constants");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: TYPESCRIPT_FILES,
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:import/typescript",
        "prettier",
        require.resolve("./rules/typescript"),
      ],
    },
  ],
  rules: {
    // define TypeScript specific rules here
  },
};
