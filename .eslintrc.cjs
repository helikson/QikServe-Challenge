module.exports = {
   root: true,
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   settings: {
      react: {
         version: "detect",
      },
      "import/resolver": {
         node: {
            paths: ["src"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
         },
      },
   },
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:react-hooks/recommended",
      // FIXME: prettier don't executes using BUN yet
      // "plugin:prettier/recommended", // Make sure this is always the last element in the array.
   ],
   plugins: [
      "react-refresh",
      "simple-import-sort",
      "prettier",
      "unused-imports",
   ],
   rules: {
      // "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "@typescript-eslint/no-unused-vars": [
         "error",
         {
            vars: "all",
            args: "all",
            argsIgnorePattern: "_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "_",
            ignoreRestSiblings: false,
            destructuredArrayIgnorePattern: "_",
         },
      ],
      "unused-imports/no-unused-imports": "error",
      "react-refresh/only-export-components": [
         "warn",
         { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/accessible-emoji": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "simple-import-sort/imports": [
         "error",
         {
            groups: [
               [
                  // Packages. `react` related packages come first.
                  "^react",
                  "^@?\\w",
                  // Internal packages.
                  "^(@|components|modules|utils)(/.*|$)",
                  // Side effect imports.
                  "^\\u0000",
                  // Parent imports. Put `..` last.
                  "^\\.\\.(?!/?$)",
                  "^\\.\\./?$",
                  // Other relative imports. Put same-folder imports and `.` last.
                  "^\\./(?=.*/)(?!/?$)",
                  "^\\.(?!/?$)",
                  "^\\./?$",
                  // Imports from the "/" folder.
                  "^/",
               ],
               [
                  // Style imports.
                  "^.+\\.s?css$",
               ],
            ],
         },
      ],
      "simple-import-sort/exports": "error",
      "jsx-a11y/anchor-is-valid": [
         "error",
         {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
         },
      ],
   },
};
