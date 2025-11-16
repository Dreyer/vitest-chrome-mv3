import { chrome } from '../../src/index'
import { vi, test, expect, describe } from 'vitest'

describe('chrome.tabs', () => {
  const tabId = 123
  const mockTab = { id: tabId, url: 'https://example.com' }

  test('getCurrent returns a promise', async () => {
    // @ts-expect-error - getCurrent is not a part of the chrome namespace
    vi.spyOn(chrome.tabs, 'getCurrent').mockResolvedValue(mockTab)

    const promise = chrome.tabs.getCurrent()

    expect(promise).toBeInstanceOf(Promise)
    await expect(promise).resolves.toEqual(mockTab)
  })

  test('get with callback', () => {
    const callbackSpy = vi.fn()
    // @ts-expect-error - get is not a part of the chrome namespace
    chrome.tabs.get.mockImplementation((tabId, callback) => {
      callback(mockTab)
    })

    chrome.tabs.get(tabId, callbackSpy)

    // @ts-expect-error - get is not a part of the chrome namespace
    expect(chrome.tabs.get).toHaveBeenCalledWith(tabId, callbackSpy)
    expect(callbackSpy).toHaveBeenCalledWith(mockTab)
  })

  test('query returns an array of tabs', () => {
    const query = { active: true, currentWindow: true }
    const mockTabs = [mockTab]
    // @ts-expect-error - query is not a part of the chrome namespace
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback(mockTabs)
    })
    const callback = vi.fn()
    chrome.tabs.query(query, callback)

    // @ts-expect-error - query is not a part of the chrome namespace
    expect(chrome.tabs.query).toHaveBeenCalledWith(query, expect.any(Function))
    expect(callback).toHaveBeenCalledWith(mockTabs)
  })

  test('onCreated event', () => {
    const listenerSpy = vi.fn()
    chrome.tabs.onCreated.addListener(listenerSpy)
    chrome.tabs.onCreated.callListeners(mockTab)
    expect(listenerSpy).toHaveBeenCalledWith(mockTab)
  })
})
