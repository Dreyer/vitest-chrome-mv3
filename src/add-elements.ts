import { Storage } from './vitest-chrome';
import { vi } from 'vitest';
import { SchemaMember } from './types';
import { MockWithClear } from './types';

/**
 * Namespace member data format from vitest-chrome-schema.json
 *
 * @interface SchemaData
 * @template T Type of namespace member
 */

export const addEvent = (schema: SchemaMember, target: object) => {
  const event = (...args: unknown[]) => {
    return event.callListeners(...args);
  };
  event.listeners = new Set<(...args: unknown[]) => void>();
  event.addListener = vi.fn((listener) => {
    event.listeners.add(listener);
  });
  event.removeListener = vi.fn((listener) => {
    event.listeners.delete(listener);
  });
  event.hasListener = vi.fn((listener) => {
    return event.listeners.has(listener);
  });
  event.hasListeners = vi.fn(() => {
    return event.listeners.size > 0;
  });
  event.callListeners = vi.fn((...args: unknown[]) => {
    for (const listener of event.listeners) {
      listener(...args);
    }
  });
  event.clear = () => {
    event.listeners.clear();
    event.addListener.mockClear();
    event.removeListener.mockClear();
    event.hasListener.mockClear();
    event.hasListeners.mockClear();
    event.callListeners.mockClear();
  };
  Object.assign(target, { [schema.name]: event });
  return event;
};

export const addFunction = (
  schema: SchemaMember,
  target: object,
  namespace: string,
) => {
  const unimplementedError = `${namespace}.${schema.name} is not implemented`;

  const FQFN = `${namespace}.${schema.name}`;

  if (FQFN === 'chrome.runtime.getURL') {
    const fn = vi.fn((path: string) => {
      return `chrome-extension://test-extension-id/${path}`;
    });
    (fn as MockWithClear<[string], string>).clear = () => fn.mockClear();
    Object.assign(target, { [schema.name]: fn });
    return fn;
  }

  if (
    FQFN === 'chrome.runtime.sendMessage' ||
    FQFN === 'chrome.tabs.sendMessage'
  ) {
    const fn = vi.fn((...args: unknown[]) => {
      const callback = args.find((arg) => typeof arg === 'function');
      if (callback) {
        process.nextTick(() => callback(undefined));
        return undefined;
      } else {
        return Promise.resolve(undefined);
      }
    });
    (fn as MockWithClear<unknown[], void | Promise<undefined>>).clear = () =>
      fn.mockClear();
    Object.assign(target, { [schema.name]: fn });
    return fn;
  }

  const fn = vi.fn((...args: unknown[]) => {
    if (schema.isPromise) {
      return Promise.reject(new Error(unimplementedError));
    }
    const callback = args.find((arg) => typeof arg === 'function');
    if (callback) {
      callback();
    }
    throw new Error(unimplementedError);
  });
  (fn as MockWithClear<unknown[], unknown>).clear = () => {
    fn.mockClear();
  };
  Object.assign(target, { [schema.name]: fn });
  return fn;
};

export const addProperty = (schema: SchemaMember, target: object) => {
  if (schema.name === 'storage') {
    const storage = {
      local: addStorageArea(),
      sync: addStorageArea(),
      managed: addStorageArea(),
      onChanged: addEvent({ name: 'onChanged', type: 'event' }, {}),
    };
    Object.assign(target, { [schema.name]: storage });
    return storage;
  }

  let prop: unknown;
  Object.defineProperty(target, schema.name, {
    get() {
      return prop;
    },
    set(value) {
      prop = value;
    },
  });
  // TODO: find a way to clear property value
  return prop;
};

export function addStorageArea(): Storage.StorageArea {
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
