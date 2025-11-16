# vitest-chrome-mv3

Test Chrome extensions with Vitest. A complete mock of the Chrome API with first-class support for Manifest V3.

## Installation

```sh
npm install vitest-chrome-mv3 -D
```

## Setup

Set `chrome` in the global scope during setup. Add a setup file to `vitest.config.ts`:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

Use the setup file to assign the mocked `chrome` object to the `global` object:

```typescript
// vitest.setup.ts
import { chrome } from 'vitest-chrome-mv3'

Object.assign(global, { chrome })
```

## Usage

### Testing Promise-Based APIs

Many MV3 APIs are promise-based. You can test them like any other async function.

```typescript
import { chrome } from 'vitest-chrome-mv3';
import { expect, test, vi } from 'vitest';

test('should get a tab by id', async () => {
  const tabId = 123;
  const mockTab = { id: tabId, url: 'https://example.com' };

  vi.spyOn(chrome.tabs, 'get').mockResolvedValue(mockTab);

  const tab = await chrome.tabs.get(tabId);

  expect(tab).toEqual(mockTab);
});
```

### Simulating the Service Worker Lifecycle

You can simulate the MV3 service worker's lifecycle to test background logic.

```typescript
import { chrome } from 'vitest-chrome-mv3';
import { test, vi } from 'vitest';

test('should handle extension installation', () => {
  const onInstalledSpy = vi.fn();
  chrome.runtime.onInstalled.addListener(onInstalledSpy);

  const installDetails = { reason: 'install' };
  chrome.runtime.mockServiceWorker.triggerOnInstalled(installDetails);

  expect(onInstalledSpy).toHaveBeenCalledWith(installDetails);
});
```
