import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'  // NEW: Import the React plugin
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      'plugin:react/recommended',  // NEW: Add React recommended rules
      'plugin:react/jsx-runtime',  // NEW: For React 17+ JSX transform
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,  // NEW: Register the React plugin
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/jsx-uses-vars': 'error',  // NEW: Mark JSX variables as used
    },
    settings: {
      react: {
        version: 'detect',  // NEW: Auto-detect React version
      },
    },
  },
])