import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules',
        '.next',
        'e2e',
        '**/*.d.ts',
        '**/*.config.*',
        '**/vitest.setup.ts',
        'public/**',
      ],
    },
  },
  resolve: {
    alias: {
      '#components': resolve(__dirname, './components'),
      '#hooks': resolve(__dirname, './hooks'),
      '#data': resolve(__dirname, './data'),
      '#theme': resolve(__dirname, './theme'),
      '#lib': resolve(__dirname, './lib'),
    },
  },
})
