import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next (and add a few common ones).
  globalIgnores(['node_modules/**', '.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),

  // Preserve existing project rule overrides from .eslintrc.json
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'import/no-anonymous-default-export': 'off',

      // Keep existing code unchanged for now: these are useful, but currently noisy across the repo.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/no-unescaped-entities': 'off',

      // These can be real issues, but we don't want lint to block builds while we migrate.
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',

      // Disable noisy React Compiler warnings about manual memoization
      'react-compiler/react-compiler': 'off',
    },
  },
])
