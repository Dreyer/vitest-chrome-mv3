import { vi } from 'vitest';
import { createEvent } from './utils';
import { Storage } from './vitest-chrome';

/**
 * Creates a StorageArea mock with state management
 */
function createStorageArea(): Storage.StorageArea {
  const area: Storage.StorageArea = {
    clear: vi.fn(),
    get: vi.fn(),
    getBytesInUse: vi.fn(),
    remove: vi.fn(),
    set: vi.fn((...args: unknown[]) => {
      const callback = args.find((arg) => typeof arg === 'function');
      if (callback) {
        callback();
      }
    }),
    clearAll: () => {},
  };

  // Add clear method to reset all mocks (separate from the clear function)
  area.clearAll = () => {
    area.clear.mockClear();
    area.get.mockClear();
    area.getBytesInUse.mockClear();
    area.remove.mockClear();
    area.set.mockClear();
  };

  return area;
}

/**
 * Manual overrides for Chrome APIs that require special behavior
 * This file contains implementations that cannot be auto-generated
 * Only override specific properties, not entire namespaces
 */
export const overrides: Record<string, Record<string, unknown>> = {
  storage: {
    local: createStorageArea(),
    sync: createStorageArea(),
    managed: createStorageArea(),
    onChanged: createEvent(),
  },
  runtime: {
    getURL: vi.fn((path: string) => {
      return `chrome-extension://test-extension-id/${path}`;
    }),
    sendMessage: vi.fn((...args: unknown[]) => {
      const callback = args.find((arg) => typeof arg === 'function');
      if (callback) {
        process.nextTick(() => callback(undefined));
        return undefined;
      } else {
        return Promise.resolve(undefined);
      }
    }),
  },
  tabs: {
    sendMessage: vi.fn((...args: unknown[]) => {
      const callback = args.find((arg) => typeof arg === 'function');
      if (callback) {
        process.nextTick(() => callback(undefined));
        return undefined;
      } else {
        return Promise.resolve(undefined);
      }
    }),
  },
  devtools: {
    panels: {
      elements: {},
      sources: {},
      themeName: '',
    },
    inspectedWindow: {
      tabId: 0,
    },
  },
};
