# vitest-chrome-mv3

Test Chrome extensions with Vitest by using a complete, schema-driven mock of the Chrome API with first-class Manifest V3 support.

## Highlights

- Covers every MV3 namespace by generating mocks from the official Chrome documentation.
- Behaves like the real API: promise-based methods resolve, callbacks stay callable, events expose `addListener`/`removeListener`, storage areas persist state.
- Includes helpers for simulating the service-worker lifecycle (`chrome.runtime.mockServiceWorker`) and clearing mocks between tests (`chrome.reset()`).
- Ships TypeScript types so your editor understands the mocked surface area out of the box.

## Breaking Changes

**As of v1.0.0+**: This library no longer supports "phantom properties" - APIs that don't exist in the official Chrome documentation. If you access a property that isn't in the schema (e.g., `chrome.nonExistent.method()`), it will return `undefined` instead of creating a mock on-the-fly. This ensures tests fail when typos occur and keeps the mock surface area aligned with the real Chrome API.

## Requirements

- Node.js 18+ (needed for the build scripts that depend on `fetch`).
- Vitest `>=4.0.0` (declared as a peer dependency).

## Quick start (≈5 minutes)

1. Install the package:

   ```sh
   npm install vitest-chrome-mv3 -D
   ```

2. Register a setup file in `vitest.config.ts` so `chrome` exists on the global scope:

   ```ts
   // vitest.config.ts
   import { defineConfig } from 'vitest/config'

   export default defineConfig({
     test: {
       setupFiles: ['./vitest.setup.ts'],
     },
   })
   ```

3. Initialize the mock `chrome` object inside that setup file:

   ```ts
   // vitest.setup.ts
   import { chrome } from 'vitest-chrome-mv3'

   Object.assign(globalThis, { chrome })

   // Optional but recommended: reset between tests
   import { beforeEach } from 'vitest'
   beforeEach(() => {
     // @ts-expect-error reset is injected by vitest-chrome-mv3
     chrome.reset()
   })
   ```

You're ready to write tests for background service workers, content scripts, or any plain module that touches the `chrome` namespace.

## Writing tests

### Promise-based APIs

Many MV3 APIs return promises. You can treat them like any other async function:

```ts
import { chrome } from 'vitest-chrome-mv3'
import { expect, test, vi } from 'vitest'

test('tabs.get returns a mocked tab', async () => {
  vi.spyOn(chrome.tabs, 'get').mockResolvedValue({ id: 123, url: 'https://example.com' })

  await expect(chrome.tabs.get(123)).resolves.toMatchObject({ id: 123 })
})
```

### Events & service worker lifecycle

All events expose the usual `addListener`, `removeListener`, and `hasListener` helpers, and you can simulate the background service worker lifecycle:

```ts
import { chrome } from 'vitest-chrome-mv3'
import { expect, test, vi } from 'vitest'

test('runtime.onInstalled fires with mockServiceWorker', () => {
  const listener = vi.fn()
  chrome.runtime.onInstalled.addListener(listener)

  chrome.runtime.mockServiceWorker.triggerOnInstalled({ reason: 'install' })

  expect(listener).toHaveBeenCalledWith({ reason: 'install' })
})
```

### Storage helpers

`chrome.storage.local`, `sync`, and `managed` all behave like async key-value stores:

```ts
await chrome.storage.local.set({ featureFlag: true })
const data = await chrome.storage.local.get('featureFlag')
expect(data.featureFlag).toBe(true)
```

## Repository overview

| Path | Purpose |
| --- | --- |
| `src/` | Source code including utilities, manual overrides, and the generated Chrome mock. |
| `src/generated.ts` | **AUTO-GENERATED** - Do not edit manually. Generated from the schema by `npm run build:mock`. |
| `src/vitest-chrome-schema.json` | **GENERATED** - Structured JSON representation of Chrome APIs. Generated from markdown docs by `npm run build:schema`, used by `npm run build:mock` to create the mock code. Serves as intermediate artifact for debugging and version control. |
| `tests/` | Vitest suites that exercise every namespace plus integration helpers (`vitest.setup.ts`). |
| `lib/` | Rollup output that gets published to npm. |
| `docs/chrome_extensions_reference/` | Snapshot of the official Chrome reference used when generating the schema. |
| `scripts/` | Tooling for downloading docs, building the schema, and generating the mock (`download-api-docs.js`, `generate-schema.js`, `generate-mock.js`). |
| `tmp/` | Scratch copies of upstream libraries used for comparison during development. |

## Development workflow

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies before doing anything else. |
| `npm run build:mock` | Generate `src/generated.ts` from `src/vitest-chrome-schema.json`. Run this after updating the schema. |
| `npm run build` | Bundle `src/` into `lib/` via Rollup. |
| `npm test` | Run the Vitest suite once (CI mode). Use `npx vitest --watch` while iterating. |
| `npm run build:docs` | Download the latest Chrome extension reference Markdown files. |
| `npm run build:schema` | Regenerate `src/vitest-chrome-schema.json` and related typings from the downloaded docs. |

## Updating the Chrome API schema

1. Run `npm run build:docs` to refresh the Markdown reference files inside `docs/chrome_extensions_reference/`.
2. Regenerate the schema with `npm run build:schema`. This parses the docs and updates `src/vitest-chrome-schema.json` plus any derived d.ts files.
3. **Generate the mock code** with `npm run build:mock`. This creates `src/generated.ts` from the updated schema.
4. Re-run `npm test` to ensure the new data did not introduce regressions.
5. Commit the updated docs, schema, generated code, and relevant tests together.

Keeping the schema current ensures newly released APIs are mocked automatically without manual coding.

**Note:** `src/generated.ts` is an auto-generated file. Do not edit it manually. Always regenerate it with `npm run build:mock` after updating the schema.

## Contributing

1. **Fork & clone** the repository, then `cd vitest-chrome-mv3`.
2. **Install dependencies:** `npm install`.
3. **Develop with tests running:** `npx vitest --watch` keeps feedback tight while you modify `src/` or `tests/`.
4. **Add coverage:** whenever you introduce or change a mock, add/adjust a corresponding test under `tests/api/` so regressions are caught.
5. **Run the full suite and build:** `npm test && npm run build` before sending a PR.
6. **Open a pull request:** describe the scenario you tested, link to relevant Chrome docs, and call out whether the schema/scripts need re-running.

Questions, ideas, or bugs? Open an issue at the GitHub repository listed in `package.json`—we welcome contributions from first-time open source collaborators.
