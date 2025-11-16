# vitest-chrome-mv3

Test Chrome extensions with Vitest by using a complete, schema-driven mock of the Chrome API with first-class Manifest V3 support.

## Highlights

- Covers every MV3 namespace by generating mocks from the official Chrome documentation.
- Behaves like the real API: promise-based methods resolve, callbacks stay callable, events expose `addListener`/`removeListener`, storage areas persist state.
- Includes helpers for simulating the service-worker lifecycle (`chrome.runtime.mockServiceWorker`) and clearing mocks between tests (`chrome.reset()`).
- Ships TypeScript types so your editor understands the mocked surface area out of the box.

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
| `src/` | Source of the Chrome proxy, schema loader, and helpers such as `createHandler`. |
| `tests/` | Vitest suites that exercise every namespace plus integration helpers (`vitest.setup.ts`). |
| `lib/` | Rollup output that gets published to npm. |
| `docs/chrome_extensions_reference/` | Snapshot of the official Chrome reference used when generating the schema. |
| `scripts/` | Tooling for downloading docs and building the schema (`download-api-docs.js`, `generate-schema.js`). |
| `tmp/` | Scratch copies of upstream libraries used for comparison during development. |

## Development workflow

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies before doing anything else. |
| `npm run build` | Bundle `src/` into `lib/` via Rollup. |
| `npm test` | Run the Vitest suite once (CI mode). Use `npx vitest --watch` while iterating. |
| `npm run build:docs` | Download the latest Chrome extension reference Markdown files. |
| `npm run build:schema` | Regenerate `src/vitest-chrome-schema.json` and related typings from the downloaded docs. |

## Updating the Chrome API schema

1. Run `npm run build:docs` to refresh the Markdown reference files inside `docs/chrome_extensions_reference/`.
2. Regenerate the schema with `npm run build:schema`. This parses the docs and updates `src/vitest-chrome-schema.json` plus any derived d.ts files.
3. Re-run `npm test` to ensure the new data did not introduce regressions.
4. Commit the updated docs, schema, and relevant tests together.

Keeping the schema current ensures newly released APIs are mocked automatically without manual coding.

## Contributing

1. **Fork & clone** the repository, then `cd vitest-chrome-mv3`.
2. **Install dependencies:** `npm install`.
3. **Develop with tests running:** `npx vitest --watch` keeps feedback tight while you modify `src/` or `tests/`.
4. **Add coverage:** whenever you introduce or change a mock, add/adjust a corresponding test under `tests/api/` so regressions are caught.
5. **Run the full suite and build:** `npm test && npm run build` before sending a PR.
6. **Open a pull request:** describe the scenario you tested, link to relevant Chrome docs, and call out whether the schema/scripts need re-running.

Questions, ideas, or bugs? Open an issue at the GitHub repository listed in `package.json`—we welcome contributions from first-time open source collaborators.
