import { VitestChrome } from './vitest-chrome';
import { generatedChrome } from './generated';
import { overrides } from './overrides';
import { deepMerge } from './utils';

if (typeof globalThis.ClipboardItem === 'undefined') {
  globalThis.ClipboardItem = class ClipboardItem {
    constructor(
      public data: Record<string, Blob | string | PromiseLike<Blob | string>>,
    ) {}

    static supports(type: string): boolean {
      // Basic implementation - could be enhanced based on requirements
      return ['text/plain', 'text/html', 'image/png', 'image/jpeg'].includes(
        type,
      );
    }

    get types(): readonly string[] {
      return Object.keys(this.data);
    }

    getType(type: string): Promise<Blob> {
      const item = this.data[type];
      if (item && typeof (item as PromiseLike<Blob>).then === 'function') {
        return Promise.resolve(item).then((result) =>
          result instanceof Blob ? result : new Blob([String(result)]),
        );
      }
      if (item instanceof Blob) {
        return Promise.resolve(item);
      }
      if (typeof item === 'string') {
        return Promise.resolve(new Blob([item]));
      }
      return Promise.reject(new Error(`Type ${type} not found`));
    }

    get presentationStyle(): PresentationStyle {
      return 'unspecified' as PresentationStyle;
    }
  };
}

// Merge generated chrome with manual overrides
const chromeStatic = deepMerge(
  generatedChrome as Record<string, unknown>,
  overrides,
) as typeof generatedChrome;

// Wrap in a thin Proxy to handle lastError validation
export const chrome = new Proxy<VitestChrome>(chromeStatic as unknown as VitestChrome, {
  set(target, prop, value) {
    if (
      prop === 'runtime' &&
      value &&
      typeof value === 'object' &&
      'lastError' in value
    ) {
      const lastError = (value as { lastError?: unknown }).lastError;
      if (
        lastError &&
        (!(typeof lastError === 'object') ||
          typeof (lastError as { message?: unknown })?.message !== 'string')
      ) {
        throw new TypeError(
          'chrome.runtime.lastError should be type { message: string }',
        );
      }
    }
    return Reflect.set(target, prop, value);
  },
});

/**
 * Recursively clears all mocks in the chrome object
 */
function resetChrome(obj: unknown): void {
  if (obj === null || obj === undefined) {
    return;
  }

  if (typeof obj !== 'object') {
    return;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    for (const item of obj) {
      resetChrome(item);
    }
    return;
  }

  // Handle objects
  for (const key in obj) {
    const value = (obj as Record<string, unknown>)[key];
    if (value === null || value === undefined) {
      continue;
    }

    // If it's a vi.fn() mock, clear it
    if (
      typeof value === 'function' &&
      'mockClear' in value &&
      typeof value.mockClear === 'function'
    ) {
      value.mockClear();
    }

    // If it's an event with clearListeners
    if (
      typeof value === 'object' &&
      'clearListeners' in value &&
      typeof value.clearListeners === 'function'
    ) {
      value.clearListeners();
    }

    // If it's a StorageArea with clearAll
    if (
      typeof value === 'object' &&
      'clearAll' in value &&
      typeof value.clearAll === 'function'
    ) {
      value.clearAll();
    }

    // Recursively process nested objects
    if (typeof value === 'object') {
      resetChrome(value);
    }
  }
}

/**
 * Resets all mocks in the chrome object
 * This replaces the old chrome.reset() method
 */
export function resetChromeMocks(): void {
  resetChrome(chrome);
}

// @ts-expect-error - reset is not a part of the chrome namespace
chrome.reset = resetChromeMocks;
