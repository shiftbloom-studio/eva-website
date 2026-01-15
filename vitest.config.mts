import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

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
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
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
      '#components': resolve(__dirname, './src/components'),
      '#hooks': resolve(__dirname, './src/hooks'),
      '#data': resolve(__dirname, './src/data'),
      '#theme': resolve(__dirname, './theme'),
      '#lib': resolve(__dirname, './src/lib'),
    },
  },
})
