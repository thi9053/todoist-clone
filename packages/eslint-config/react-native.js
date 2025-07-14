import reactNativePlugin from "eslint-plugin-react-native";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import baseConfig from "./base.js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...baseConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-native": reactNativePlugin,
    },
    rules: {
      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
      "react/display-name": "off",
    },
  },
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules/**", "android/**", "ios/**", "build/**"],
  },
]);
