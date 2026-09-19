import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact, { rules } from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { 
      js, 
      "simple-import-sort": simpleImportSort, 
    }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: globals.browser
    } 
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "simple-import-sort/imports": "error",
    }
  }
]);
