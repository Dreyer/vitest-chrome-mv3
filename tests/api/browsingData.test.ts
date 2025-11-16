import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.browsingData', () => {
  const removalOptions = {
    since: Date.now() - 86400000, // 24 hours ago
    originTypes: { unprotectedWeb: true },
  }

  const dataToRemove = {
    appcache: true,
    cache: true,
    cookies: true,
    downloads: true,
    fileSystems: true,
    formData: true,
    history: true,
    indexedDB: true,
    localStorage: true,
    passwords: true,
    pluginData: true,
    serviceWorkers: true,
    webSQL: true,
  }

  test('remove throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.remove(removalOptions, dataToRemove),
    ).toThrow('chrome.browsingData.remove is not implemented')
  })

  test('removeAppcache throws unimplemented error', () => {
    expect(() => chrome.browsingData.removeAppcache(removalOptions)).toThrow(
      'chrome.browsingData.removeAppcache is not implemented',
    )
  })

  test('removeCache throws unimplemented error', () => {
    expect(() => chrome.browsingData.removeCache(removalOptions)).toThrow(
      'chrome.browsingData.removeCache is not implemented',
    )
  })

  test('removeCacheStorage throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeCacheStorage(removalOptions),
    ).toThrow('chrome.browsingData.removeCacheStorage is not implemented')
  })

  test('removeCookies throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeCookies(removalOptions),
    ).toThrow('chrome.browsingData.removeCookies is not implemented')
  })

  test('removeDownloads throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeDownloads(removalOptions),
    ).toThrow('chrome.browsingData.removeDownloads is not implemented')
  })

  test('removeFileSystems throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeFileSystems(removalOptions),
    ).toThrow('chrome.browsingData.removeFileSystems is not implemented')
  })

  test('removeFormData throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeFormData(removalOptions),
    ).toThrow('chrome.browsingData.removeFormData is not implemented')
  })

  test('removeHistory throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeHistory(removalOptions),
    ).toThrow('chrome.browsingData.removeHistory is not implemented')
  })

  test('removeIndexedDB throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeIndexedDB(removalOptions),
    ).toThrow('chrome.browsingData.removeIndexedDB is not implemented')
  })

  test('removeLocalStorage throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeLocalStorage(removalOptions),
    ).toThrow('chrome.browsingData.removeLocalStorage is not implemented')
  })

  test('removePasswords throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removePasswords(removalOptions),
    ).toThrow('chrome.browsingData.removePasswords is not implemented')
  })

  test('removePluginData throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removePluginData(removalOptions),
    ).toThrow('chrome.browsingData.removePluginData is not implemented')
  })

  test('removeServiceWorkers throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeServiceWorkers(removalOptions),
    ).toThrow('chrome.browsingData.removeServiceWorkers is not implemented')
  })

  test('removeWebSQL throws unimplemented error', () => {
    expect(() =>
      chrome.browsingData.removeWebSQL(removalOptions),
    ).toThrow('chrome.browsingData.removeWebSQL is not implemented')
  })

  test('settings returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.browsingData.settings()).rejects.toThrow(
      'chrome.browsingData.settings is not implemented',
    )
  })
})
