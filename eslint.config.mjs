import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    'packages/**/playground/**',
    'packages/**/dist/**',
    'packages/**/.next/**',
    'packages/**/.nuxt/**'
  ],
  rules: {
    "unicorn/no-null": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "unicorn/prefer-code-point": 0,
    "no-useless-catch": 0,
    // rule overrides
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});