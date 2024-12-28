/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    'jest/globals': true,
    'vitest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:vitest/recommended',
  ],
  ignorePatterns: ['dist/**/*', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'jest', 'vitest'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'jest/expect-expect': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Allow test globals for Vitest
    'no-undef': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    vitest: {
      environment: 'jsdom',
    },
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/setupTests.ts'],
      env: {
        'jest/globals': true,
        'vitest/globals': true,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  ],
}
