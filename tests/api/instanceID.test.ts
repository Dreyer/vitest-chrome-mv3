import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.instanceID', () => {
  const tokenParams = {
    authorizedEntity: 'project-id',
    scope: 'GCM',
  }

  test('deleteID returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.instanceID.deleteID()).rejects.toThrow(
      'chrome.instanceID.deleteID is not implemented',
    )
  })

  test('deleteToken throws unimplemented error', () => {
    expect(() => chrome.instanceID.deleteToken(tokenParams)).toThrow(
      'chrome.instanceID.deleteToken is not implemented',
    )
  })

  test('getCreationTime returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.instanceID.getCreationTime()).rejects.toThrow(
      'chrome.instanceID.getCreationTime is not implemented',
    )
  })

  test('getID returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.instanceID.getID()).rejects.toThrow(
      'chrome.instanceID.getID is not implemented',
    )
  })

  test('getToken throws unimplemented error', () => {
    expect(() => chrome.instanceID.getToken(tokenParams)).toThrow(
      'chrome.instanceID.getToken is not implemented',
    )
  })

  test('onTokenRefresh event interface works', () => {
    const listener = () => {}
    chrome.instanceID.onTokenRefresh.addListener(listener)
    expect(chrome.instanceID.onTokenRefresh.hasListener(listener)).toBe(true)
    expect(chrome.instanceID.onTokenRefresh.hasListeners()).toBe(true)

    // Test calling listeners
    chrome.instanceID.onTokenRefresh.callListeners()

    // Clean up
    chrome.instanceID.onTokenRefresh.removeListener(listener)
    expect(chrome.instanceID.onTokenRefresh.hasListener(listener)).toBe(false)
  })
})
