import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.cookies', () => {
  const cookie = {
    url: 'https://example.com',
    name: 'test_cookie',
    value: 'test_value',
  }

  test('get throws unimplemented error', () => {
    expect(() =>
      chrome.cookies.get({ url: cookie.url, name: cookie.name }),
    ).toThrow('chrome.cookies.get is not implemented')
  })

  test('getAll throws unimplemented error', () => {
    expect(() => chrome.cookies.getAll({ url: cookie.url })).toThrow(
      'chrome.cookies.getAll is not implemented',
    )
  })

  test('set throws unimplemented error', () => {
    expect(() => chrome.cookies.set(cookie)).toThrow(
      'chrome.cookies.set is not implemented',
    )
  })

  test('remove throws unimplemented error', () => {
    expect(() =>
      chrome.cookies.remove({ url: cookie.url, name: cookie.name }),
    ).toThrow('chrome.cookies.remove is not implemented')
  })

  test('getAllCookieStores returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.cookies.getAllCookieStores()).rejects.toThrow(
      'chrome.cookies.getAllCookieStores is not implemented',
    )
  })

  test('getPartitionKey throws unimplemented error', () => {
    expect(() =>
      chrome.cookies.getPartitionKey({ frameId: 1, tabId: 1 }),
    ).toThrow('chrome.cookies.getPartitionKey is not implemented')
  })

  test('onChanged event interface works', () => {
    const listener = () => {}
    chrome.cookies.onChanged.addListener(listener)
    expect(chrome.cookies.onChanged.hasListener(listener)).toBe(true)
    expect(chrome.cookies.onChanged.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    const changeInfo = {
      cause: 'explicit',
      cookie: cookie,
      removed: false,
    }
    chrome.cookies.onChanged.callListeners(changeInfo)

    // Clean up
    chrome.cookies.onChanged.removeListener(listener)
    expect(chrome.cookies.onChanged.hasListener(listener)).toBe(false)
  })
})
