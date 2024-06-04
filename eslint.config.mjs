import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
  ],
  rules: {
    "unicorn/no-null": 0,
    "@typescript-eslint/no-unused-vars": 0,
    // rule overrides
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});