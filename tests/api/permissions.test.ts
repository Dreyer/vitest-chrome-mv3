import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.permissions', () => {
  const permissions = {
    permissions: ['tabs', 'storage'],
    origins: ['https://example.com/*'],
  }

  const hostAccessRequest = {
    url: 'https://example.com',
    faviconUrl: 'https://example.com/favicon.ico',
  }

  test('addHostAccessRequest throws unimplemented error', () => {
    expect(() => chrome.permissions.addHostAccessRequest(hostAccessRequest)).toThrow(
      'chrome.permissions.addHostAccessRequest is not implemented',
    )
  })

  test('contains throws unimplemented error', () => {
    expect(() => chrome.permissions.contains(permissions)).toThrow(
      'chrome.permissions.contains is not implemented',
    )
  })

  test('getAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.permissions.getAll()).rejects.toThrow(
      'chrome.permissions.getAll is not implemented',
    )
  })

  test('remove throws unimplemented error', () => {
    expect(() => chrome.permissions.remove(permissions)).toThrow(
      'chrome.permissions.remove is not implemented',
    )
  })

  test('removeHostAccessRequest throws unimplemented error', () => {
    expect(() => chrome.permissions.removeHostAccessRequest(hostAccessRequest)).toThrow(
      'chrome.permissions.removeHostAccessRequest is not implemented',
    )
  })

  test('request throws unimplemented error', () => {
    expect(() => chrome.permissions.request(permissions)).toThrow(
      'chrome.permissions.request is not implemented',
    )
  })

  test('onAdded event interface works', () => {
    const listener = () => {}
    chrome.permissions.onAdded.addListener(listener)
    expect(chrome.permissions.onAdded.hasListener(listener)).toBe(true)
    expect(chrome.permissions.onAdded.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    chrome.permissions.onAdded.callListeners(permissions)

    // Clean up
    chrome.permissions.onAdded.removeListener(listener)
    expect(chrome.permissions.onAdded.hasListener(listener)).toBe(false)
  })

  test('onRemoved event interface works', () => {
    const listener = () => {}
    chrome.permissions.onRemoved.addListener(listener)
    expect(chrome.permissions.onRemoved.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.permissions.onRemoved.callListeners(permissions)

    // Clean up
    chrome.permissions.onRemoved.removeListener(listener)
  })
})
