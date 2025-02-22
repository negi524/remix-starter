// import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all
// });

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    name: "base-setting",
    files: ["**/*"],
    ignores: ["!**/.server", "!**/.client"],
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
    plugins: {
      tseslint,
      _import,
    },
    languageOptions: {
      parser: tsParser,
    },
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

// export default [{
//     ignores: ["!**/.server", "!**/.client"],
// }, ...compat.extends("eslint:recommended"), {
//     languageOptions: {
//         globals: {
//             ...globals.browser,
//             ...globals.commonjs,
//         },

//         ecmaVersion: "latest",
//         sourceType: "module",

//         parserOptions: {
//             ecmaFeatures: {
//                 jsx: true,
//             },
//         },
//     },
// }, ...fixupConfigRules(compat.extends(
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "plugin:react-hooks/recommended",
//     "plugin:jsx-a11y/recommended",
// )).map(config => ({
//     ...config,
//     files: ["**/*.{js,jsx,ts,tsx}"],
// })), {
//     files: ["**/*.{js,jsx,ts,tsx}"],

//     plugins: {
//         react: fixupPluginRules(react),
//         "jsx-a11y": fixupPluginRules(jsxA11Y),
//     },

//     settings: {
//         react: {
//             version: "detect",
//         },

//         formComponents: ["Form"],

//         linkComponents: [{
//             name: "Link",
//             linkAttribute: "to",
//         }, {
//             name: "NavLink",
//             linkAttribute: "to",
//         }],

//         "import/resolver": {
//             typescript: {},
//         },
//     },
// }, ...fixupConfigRules(compat.extends(
//     "plugin:@typescript-eslint/recommended",
//     "plugin:import/recommended",
//     "plugin:import/typescript",
// )).map(config => ({
//     ...config,
//     files: ["**/*.{ts,tsx}"],
// })), {
//     files: ["**/*.{ts,tsx}"],

//     plugins: {
//         "@typescript-eslint": fixupPluginRules(typescriptEslint),
//         import: fixupPluginRules(_import),
//     },

//     languageOptions: {
//         parser: tsParser,
//     },

//     settings: {
//         "import/internal-regex": "^~/",

//         "import/resolver": {
//             node: {
//                 extensions: [".ts", ".tsx"],
//             },

//             typescript: {
//                 alwaysTryTypes: true,
//             },
//         },
//     },
// }, {
//     files: ["**/.eslintrc.cjs"],

//     languageOptions: {
//         globals: {
//             ...globals.node,
//         },
//     },
// }];
