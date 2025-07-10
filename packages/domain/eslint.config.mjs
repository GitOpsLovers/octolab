import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

import base from '../../tools/linter/base.mjs';
import preferArrow from '../../tools/linter/prefer-arrow.mjs';
import regex from '../../tools/linter/regex.mjs';
import jsdoc from '../../tools/linter/jsdoc.mjs';
import security from '../../tools/linter/security.mjs';
import typescript from '../../tools/linter/typescript.mjs';
import imports from '../../tools/linter/import.mjs';
import prettier from '../../tools/linter/prettier.mjs';
import tests from '../../tools/linter/tests.mjs';

const eslintConfig = [
  {
    ignores: ['dist', '.turbo'],
  },
  ...base,
  ...preferArrow,
  ...regex,
  ...jsdoc,
  ...security,
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ).map((config) => ({
    ...config,
    files: ['**/*.ts'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        ...config.languageOptions?.parserOptions,
        project: ['tsconfig.json'],
      },
    },
  })),
  ...typescript.map((config) => ({
    ...config,
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...imports.map((config) => ({
    ...config,
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...prettier.map((config) => ({
    ...config,
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
  ...tests.map((config) => ({
    ...config,
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  })),
];

export default eslintConfig;
