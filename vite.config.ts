// vitest.config.ts
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import unoConfig from './uno.config'
import path from 'path'

export default defineConfig({
  plugins: [react(), Unocss(unoConfig)],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      plugins: path.resolve(__dirname, 'plugins'),
    },
    dedupe: ['react', 'react-dom']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html']
    },
  },
} as UserConfig)