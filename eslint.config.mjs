import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import * as importPlugin from "eslint-plugin-import";
import eslint from "@eslint/js";
// eslint-disable-next-line import/no-unresolved
import tseslint from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  importPlugin.flatConfigs?.recommended,
  {
    name: "base-setting",
    files: ["**/*"],
    ignores: ["!**/.server", "!**/.client", "eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        // TODO: あったほうが良いか検証する
        // ...globals.es2015,
      },
    },
  },
  {
    name: "react-setting",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    ...jsxA11Y.flatConfigs.recommended,
    ...reactHooks.configs["recommended-latest"],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ...react.configs.flat["jsx-runtime"].languageOptions,
      ...jsxA11Y.flatConfigs.recommended.languageOptions,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },
  {
    name: "typescript-setting",
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        },
      },
    },
  },
  {
    name: "node",
    files: ["eslint.config.mjs"],
  },
);
