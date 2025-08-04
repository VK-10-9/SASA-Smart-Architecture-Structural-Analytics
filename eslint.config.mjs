import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      
      // React specific rules
      "react-hooks/exhaustive-deps": "error",
      "react/no-unescaped-entities": "warn",
      
      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      
      // Next.js specific
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "warn",
      
      // Import organization
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    },
    settings: {
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true
        }
      }
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Stricter rules for TypeScript files
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  },
  {
    files: ["src/app/api/**/*.ts"],
    rules: {
      // API routes can use console for server-side logging
      "no-console": "off"
    }
  }
];

export default eslintConfig;
