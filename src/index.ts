import { VitestChrome } from './vitest-chrome';
import { createHandler } from './createHandler';

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

const handler = createHandler();
export const chrome = new Proxy<VitestChrome>({} as VitestChrome, handler);

// @ts-expect-error - reset is not a part of the chrome namespace
chrome.reset = () => {
  handler.clear();
};
