import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      parser: pluginJs.configs.recommended.parser, // Use the JavaScript parser
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // JavaScript rules
      "eqeqeq": "off",
      "no-unused-vars": "error", //warn
      "max-len": ["warn", { code: 200 }],
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-use-before-define": "off",

      // React-specific rules
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx"] }],
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginJs.configs.recommended
];