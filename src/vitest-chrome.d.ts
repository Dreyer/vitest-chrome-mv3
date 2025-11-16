// This file is a placeholder and will be populated with the full type definitions
// once the schema generation script is complete.

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
