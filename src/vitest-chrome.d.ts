// Type definitions for vitest-chrome-mv3
// The chrome mock is generated from vitest-chrome-schema.json via npm run build:mock

export namespace Storage {
  export interface StorageArea {
    clear: Mock<[], void>;
    get: Mock<
      [keys?: string | string[] | { [key: string]: unknown } | null],
      Promise<{ [key: string]: unknown }>
    >;
    getBytesInUse: Mock<[keys?: string | string[] | null], Promise<number>>;
    remove: Mock<[keys: string | string[]], Promise<void>>;
    set: Mock<[{ [key: string]: unknown }], Promise<void>>;
    clearAll: () => void;
  }
}

export type VitestChrome = typeof chrome;

export namespace Runtime {
  export interface MockServiceWorker {
    start: () => void;
    stop: () => void;
    triggerOnInstalled: (details: chrome.runtime.InstalledDetails) => void;
  }
}
