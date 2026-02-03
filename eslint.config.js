import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import next from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const config = [
  ...next,
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
      prettier: prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-shadow": ["error"],
      "import/extensions": 0,
      "import/prefer-default-export": "off",
      "import/no-unresolved": "error",
      indent: ["error", 2],
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "no-shadow": "off",
      "no-unused-vars": "off",
      "no-console": "warn",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
    },
  },
];

export default config;
