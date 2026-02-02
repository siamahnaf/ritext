import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "dist/**",
            "build/**",
            "coverage/**",
            "node_modules/**",
            "tsup.config.ts",
            "*.min.js",
        ],
    },

    js.configs.recommended,

    // TypeScript core + stylistic recommendations
    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ["./tsconfig.json"], // optional but enables type-aware rules
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                document: "readonly",
                window: "readonly",
                navigator: "readonly",
            },
        },
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            import: pluginImport,
        },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,

            // TS import checks are best handled by TS itself; keep minimal eslint-import
            "import/no-unresolved": "off",

            // Helpful TS rules for libraries
            "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/explicit-module-boundary-types": "off",

            // React transform modern
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
        },
        settings: { react: { version: "detect" } },
    },

    // Prettier last
    prettier,
];
