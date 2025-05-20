import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// Load .env.test file for NODE_ENV=test
config({ path: '.env.test' });

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Set essential environment variables for tests
  process.env.SKIP_DB_CONNECTION = 'true';
  process.env.NODE_ENV = 'test';

  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/tests/setupTests.tsx'],
      reporters: ['default', 'html'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          '.next/',
          'coverage/',
          '**/*.d.ts',
          'src/tests/',
          'src/types/',
          '**/*.{test,spec}.{js,jsx,ts,tsx}',
        ],
      },
      deps: {
        inline: [/@vercel\/.*/],
        fallbackCJS: true,
      },
      alias: {
        '@': '/src',
      },
      mockReset: true,
      // Add mocks for problematic modules
      restoreMocks: true,
      isolate: false, // Keep test state between files for singleton patterns
      pool: 'forks', // Use worker pool to prevent memory issues
      poolOptions: {
        threads: {
          singleThread: true, // Use a single thread to prevent race conditions
        },
      },
    },
    define: {
      'process.env': {
        ...env,
        NODE_ENV: 'test',
        SKIP_DB_CONNECTION: 'true',
        MONGODB_URI: 'mongodb://localhost:27017/test',
      },
    },
  };
}); 