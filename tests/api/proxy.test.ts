import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.proxy', () => {
  test('namespace exists', () => {
    expect(chrome.proxy).toBeDefined()
    expect(typeof chrome.proxy).toBe('object')
  })

  test('onProxyError event exists', () => {
    expect(chrome.proxy.onProxyError).toBeDefined()
  })

  test('onProxyError event interface works', () => {
    const listener = () => {}
    chrome.proxy.onProxyError.addListener(listener)
    expect(chrome.proxy.onProxyError.hasListener(listener)).toBe(true)

    // Clean up
    chrome.proxy.onProxyError.removeListener(listener)
  })
})
