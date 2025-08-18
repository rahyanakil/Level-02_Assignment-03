import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.{ts,mts}"], // Lint only TypeScript files in src/
  ignores: ["dist/**", "node_modules/**"], // Ignore compiled files and node_modules
  languageOptions: {
    parser: tseslint.parser,
    sourceType: "module",
    globals: {
      ...globals.node, // Add Node.js globals (e.g., process)
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "@typescript-eslint/no-explicit-any": "warn", // Relax to warn
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-empty-object-type": "off", // Disable for borrow.model.d.ts
    "no-undef": "error",
    semi: ["error", "always"],
    quotes: ["error", "single"], // Enforce single quotes
    indent: ["error", 2],
  },
});
