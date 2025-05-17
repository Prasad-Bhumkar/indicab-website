/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

const dirname =
    typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        workspace: [
            {
                extends: true,
                plugins: [
                    storybookTest({ configDir: path.join(dirname, '.storybook') }),
                ],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        name: 'chromium',
                        provider: 'playwright'
                    },
                    setupFiles: ['.storybook/vitest.setup.ts'],
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.join(dirname, './src')
        }
    }
});
