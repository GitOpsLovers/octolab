import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import preferArrow from './tools/linter/prefer-arrow.mjs';
import regex from './tools/linter/regex.mjs';
import jsdoc from './tools/linter/jsdoc.mjs';
import security from './tools/linter/security.mjs';
import typescript from './tools/linter/typescript.mjs';
import imports from './tools/linter/import.mjs';
import prettier from './tools/linter/prettier.mjs';
import tests from './tools/linter/tests.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...preferArrow,
  ...regex,
  ...jsdoc,
  ...security,
  ...typescript.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...imports.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...prettier.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...tests.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
];

export default eslintConfig;
