import { VitestChrome } from './vitest-chrome'
import { createHandler } from './createHandler'

const handler = createHandler()
export const chrome = new Proxy<VitestChrome>(
  {} as VitestChrome,
  handler,
)

// @ts-expect-error - reset is not a part of the chrome namespace
chrome.reset = () => {
  handler.clear()
}
