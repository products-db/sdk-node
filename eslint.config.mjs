import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    env: {
      es6: true,
      node: true,
    },
    extends: [
      "airbnb-base",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
    ],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 11,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {},
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
