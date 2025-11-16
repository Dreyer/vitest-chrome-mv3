import { VitestChrome } from './vitest-chrome'
import { createHandler } from './createHandler'

if (typeof globalThis.ClipboardItem === 'undefined') {
  globalThis.ClipboardItem = class ClipboardItem {
    constructor(public data: Record<string, Blob | string | Promise<Blob | string>>) {}

    get types(): readonly string[] {
      return Object.keys(this.data)
    }

    getType(type: string): Blob | string | Promise<Blob | string> | undefined {
      return this.data[type]
    }

    get presentationStyle(): string {
      return 'unspecified'
    }
  }
}

const handler = createHandler()
export const chrome = new Proxy<VitestChrome>(
  {} as VitestChrome,
  handler,
)

// @ts-expect-error - reset is not a part of the chrome namespace
chrome.reset = () => {
  handler.clear()
}
