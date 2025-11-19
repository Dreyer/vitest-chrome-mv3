import { vi, type Mock } from 'vitest';

/**
 * Creates a generic mock function for Chrome API methods
 */
export function genericFunction(
  fullName: string,
  options?: { isPromise?: boolean },
): Mock {
  const unimplementedError = `${fullName} is not implemented`;
  const fn = vi.fn((...args: unknown[]) => {
    if (options?.isPromise) {
      return Promise.reject(new Error(unimplementedError));
    }
    const callback = args.find((arg) => typeof arg === 'function');
    if (callback) {
      callback();
    }
    throw new Error(unimplementedError);
  });
  return fn;
}

/**
 * Creates a simple event mock compatible with Chrome event API
 */
export function createEvent() {
  const listeners = new Set<(...args: unknown[]) => void>();
  const event = (...args: unknown[]) => {
    return event.callListeners(...args);
  };
  event.listeners = listeners;
  event.addListener = vi.fn((listener: (...args: unknown[]) => void) => {
    listeners.add(listener);
  });
  event.removeListener = vi.fn((listener: (...args: unknown[]) => void) => {
    listeners.delete(listener);
  });
  event.hasListener = vi.fn((listener: (...args: unknown[]) => void) => {
    return listeners.has(listener);
  });
  event.hasListeners = vi.fn(() => {
    return listeners.size > 0;
  });
  event.callListeners = vi.fn((...args: unknown[]) => {
    listeners.forEach((listener) => {
      listener(...args);
    });
  });
  event.clearListeners = vi.fn(() => {
    listeners.clear();
  });
  return event;
}

/**
 * Deep merges two objects, with the second object taking precedence
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>,
      ) as T[Extract<keyof T, string>];
    } else {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return result;
}

