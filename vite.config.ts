/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nxViteTsPaths()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
    css: true,
  },
  build: {
    rollupOptions: {
      // Exclude test files from production build
      exclude: [
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/setupTests.ts',
        '**/test-utils.tsx',
        '**/__mocks__/**',
      ],
    },
  },
})
