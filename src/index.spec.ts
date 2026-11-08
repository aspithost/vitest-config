import { join } from 'node:path';

import type { ViteUserConfig } from 'vitest/config';

import { createVitestConfig } from './index.js';

describe('createVitestConfig', () => {
  let config: ViteUserConfig;

  beforeEach(() => {
    config = createVitestConfig();
  });

  it('should resolve the @ alias to the project src directory', () => {
    expect(config.resolve?.alias).toStrictEqual({
      '@': join(process.cwd(), './src'),
    });
  });

  it('should configure the default test environment and mock handling', () => {
    expect(config.test?.clearMocks).toBe(true);
    expect(config.test?.environment).toBe('node');
    expect(config.test?.globals).toBe(true);
    expect(config.test?.pool).toBe('threads');
  });

  it('should discover spec files and exclude generated and dependency directories', () => {
    expect(config.test?.include).toStrictEqual(['**/*.spec.ts']);
    expect(config.test?.exclude).toStrictEqual(['dist', 'node_modules']);
  });

  it('should configure coverage reporters and thresholds', () => {
    expect(config.test?.coverage).toStrictEqual({
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
    });
  });

  it('should merge overrides while preserving defaults', () => {
    const DEFAULTS = {
      test: {
        environment: 'jsdom',
        retry: 2,
      },
    };
    const config = createVitestConfig(DEFAULTS);

    expect(config.test?.environment).toBe(DEFAULTS.test.environment);
    expect(config.test?.retry).toBe(DEFAULTS.test.retry);
    expect(config.test?.clearMocks).toBe(true);
  });
});
