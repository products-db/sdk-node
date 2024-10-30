import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {},
  },
];
