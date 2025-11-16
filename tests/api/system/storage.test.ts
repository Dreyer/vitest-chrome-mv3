import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.system.storage', () => {
  test('namespace exists', () => {
    expect(chrome.system.storage).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.system.storage).toBeDefined()
  })

  test('ejectDevice method exists', () => {
    expect(chrome.system.storage.ejectDevice).toBeDefined()
  })

  test('getAvailableCapacity method exists', () => {
    expect(chrome.system.storage.getAvailableCapacity).toBeDefined()
  })

  test('getInfo method exists', () => {
    expect(chrome.system.storage.getInfo).toBeDefined()
  })

  test('onAttached event exists', () => {
    expect(chrome.system.storage.onAttached).toBeDefined()
  })

  test('onDetached event exists', () => {
    expect(chrome.system.storage.onDetached).toBeDefined()
  })

  test('onAttached event interface works', () => {
    const listener = () => {}
    chrome.system.storage.onAttached.addListener(listener)
    expect(chrome.system.storage.onAttached.hasListener(listener)).toBe(true)
    expect(chrome.system.storage.onAttached.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    const storageInfo = {
      id: 'storage-id',
      name: 'USB Drive',
      type: 'removable',
      capacity: 1000000000,
    }
    chrome.system.storage.onAttached.callListeners(storageInfo)

    // Clean up
    chrome.system.storage.onAttached.removeListener(listener)
    expect(chrome.system.storage.onAttached.hasListener(listener)).toBe(false)
  })

  test('onDetached event interface works', () => {
    const listener = () => {}
    chrome.system.storage.onDetached.addListener(listener)
    expect(chrome.system.storage.onDetached.hasListener(listener)).toBe(true)

    // Clean up
    chrome.system.storage.onDetached.removeListener(listener)
  })
})
