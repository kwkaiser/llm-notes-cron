import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import * as typescriptEslintParser from '@typescript-eslint/parser';
import { InfiniteDepthConfigWithExtends } from 'typescript-eslint';
// @ts-ignore
import * as typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'; // Required import for eslint

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const configs = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**', 'dist/**'],

    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        NodeJS: true,
        ScrollToOptions: 'readonly',
        ChildNode: 'readonly',
        CreateSessionParams: 'readonly',
        BrowserSession: 'readonly',
      },
    },
  },

  sonarjs.configs.recommended,
  ...tseslint.configs.recommended,
  js.configs.recommended,
  ...compat.extends('standard', 'prettier'),

  /**
   * Core eslint
   */
  {
    rules: {
      'no-undefined': 'off',
      'no-magic-numbers': 'off',
      'line-comment-position': 'off',
      'no-unused-vars': 'off',
      'max-lines-per-function': 'off',
      indent: 'off',
      'max-len': 'off',
      complexity: 'off',
      'no-return-await': 'error',
      quotes: 'off',
      'no-console': 'error',
      'arrow-parens': ['error', 'always'],
      curly: ['error', 'all'],
      'func-style': 'off',
    },
  },

  /**
   * TS eslint:
   */
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      // Allow unused prefixed with _
      '@typescript-eslint/no-unused-vars': 'off', // TODO restore
      '@typescript-eslint/no-non-null-assertion': 'error',
      // '@typescript-eslint/no-unused-vars': [
      //   'warn',
      //   {
      //     args: 'all',
      //     argsIgnorePattern: '^_',
      //     varsIgnorePattern: '^_',
      //     caughtErrors: 'all',
      //     caughtErrorsIgnorePattern: '^_',
      //   },
      // ],
    },
  },

  /**
   * Simple import sort
   */
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  /**
   * Import restrictions
   */
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@copallet/*/**', '!@copallet/backend/types'],
              message:
                'Import from @copallet packages should not include subpaths. Use @copallet/<package> directly instead of @copallet/<package>/<subpath>.',
            },
            {
              group: ['node:test/*'],
              message:
                'We are using vitest for testing, so please use vitest instead of node:test.',
            },
          ],
        },
      ],
    },
  },

  /**
   * Prettier
   */
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 120,
        },
      ],
    },
  },

  /**
   * Sonar
   */
  {
    rules: {
      'no-use-before-define': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-gratuitous-expressions': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/array-callback-without-return': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/use-type-alias': 'off',
      'sonarjs/no-alphabetical-sort': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/no-invalid-await': 'off', // TODO: restore
      'sonarjs/no-nested-functions': 'off', // TODO: consider restoring
      '@typescript-eslint/no-unsafe-function-type': 'off', // TODO consider restoring
      'sonarjs/no-hardcoded-secrets': 'off', // TODO: restore
    },
  },

  /**
   * Test exemptions to rules after this match
   */
  {
    files: ['**/*.test.ts'],
    ignores: ['node_modules/**', 'dist/**'],

    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        NodeJS: true,
        ScrollToOptions: 'readonly',
        ChildNode: 'readonly',
        CreateSessionParams: 'readonly',
        BrowserSession: 'readonly',
      },
    },
  },

  /**
   * TS eslint:
   */
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];

export default tseslint.config(...configs);
