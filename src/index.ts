import { join } from 'node:path';

import {
  type ViteUserConfig, defineConfig, mergeConfig,
} from 'vitest/config';

/**
 * Creates a Vitest configuration with shared test and coverage defaults.
 *
 * @param overrides - Vitest options to merge with the preset defaults
 * @returns A configuration that resolves `@` to the project's `src` directory
 * and sets the test environment, discovery patterns, mock handling, and
 * coverage thresholds.
 */
export function createVitestConfig(overrides: ViteUserConfig = {}): ViteUserConfig {
  const defaultConfig = defineConfig({
    resolve: {
      alias: {
        '@': join(process.cwd(), './src'),
      },
    },
    test: {
      clearMocks: true,

      coverage: {
        reporter: [
          'json-summary',
          'json',
          'lcov',
        ],
        reportOnFailure: true,
        exclude: ['**/constants/**'],
        thresholds: {
          branches: 90,
          functions: 95,
          lines: 95,
        },
      },

      environment: 'node',

      include: ['**/*.spec.ts'],
      exclude: ['dist', 'node_modules'],

      globals: true,

      pool: 'threads',
    },
  });

  return mergeConfig(defaultConfig, overrides);
}
