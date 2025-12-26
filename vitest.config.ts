//--------------------------------------------------------------------//
// Imports
//node
import path from 'node:path';

//modules
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

//--------------------------------------------------------------------//
// Config
export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      plugins: path.resolve(__dirname, 'plugins')
    },
    dedupe: [ 'react', 'react-dom' ]
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: [ 'text', 'html', 'lcov' ]
    },
    //memory optimization settings
    pool: 'forks',
    //migrated from poolOptions.forks to top-level
    singleFork: true,
    //increase timeout if needed
    testTimeout: 10000,
    //isolate environment for each test file
    isolate: true,
    //clean up after each test
    restoreMocks: true,
    clearMocks: true,
    unstubGlobals: true
  }
} as UserConfig);