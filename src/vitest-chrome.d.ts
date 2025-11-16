// This file is a placeholder and will be populated with the full type definitions
// once the schema generation script is complete.

export namespace Storage {
  export interface StorageArea {}
}

export type VitestChrome = typeof chrome

export namespace Runtime {
  export interface MockServiceWorker {
    start: () => void;
    stop: () => void;
    triggerOnInstalled: (details: chrome.runtime.InstalledDetails) => void;
  }
}

// in chrome.runtime definition
mockServiceWorker: Runtime.MockServiceWorker;
