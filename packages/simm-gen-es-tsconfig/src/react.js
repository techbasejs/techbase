module.exports = {
  plugins: ["react"],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/react",
    "prettier",
    require.resolve("./rules/react"),
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
