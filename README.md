
# @abelspithost/vitest-config

[![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=aspithost_vitest-config&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aspithost_vitest-config)
![NPM Version](https://img.shields.io/npm/v/@abelspithost/vitest-config)

This package provides a shared Vitest configuration for TypeScript projects.
The `createVitestConfig` function returns a Node-oriented Vitest configuration
with consistent test discovery, coverage thresholds, mock handling, and path
aliases.

## Requirements

- Node.js 24 or newer
- Vitest 5.0.0 or newer

## Installation

Install this package and Vitest as development dependencies:

```sh
npm install --save-dev @abelspithost/vitest-config vitest
```

## Usage

Create a `vitest.config.ts` file in your project:

```ts
import { createVitestConfig } from '@abelspithost/vitest-config';

export default createVitestConfig();
```

The configuration resolves the `@` alias to your project's `src` directory.
For example, `@/utils/format` resolves to `src/utils/format`.

## Defaults

`createVitestConfig` applies these settings:

| Setting | Value |
| --- | --- |
| Environment | `node` |
| Test files | `**/*.spec.ts` |
| Excluded test paths | `dist`, `node_modules` |
| Globals | Enabled |
| Pool | `threads` |
| Mock clearing | Enabled |
| Coverage reporters | `json-summary`, `json` |
| Coverage on failure | Enabled |
| Coverage exclusion | `**/constants/**` |
| Branch threshold | 90% |
| Function threshold | 95% |
| Line threshold | 95% |

Vitest 5 clears mocks by default. The preset sets `clearMocks: true` explicitly
so the shared configuration states that policy for every consuming project.

## License

This project uses the ISC license.
