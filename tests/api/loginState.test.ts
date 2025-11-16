import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.loginState', () => {
  test('namespace exists', () => {
    expect(chrome.loginState).toBeDefined()
    expect(typeof chrome.loginState).toBe('object')
  })

  test('getProfileType method exists', () => {
    expect(chrome.loginState.getProfileType).toBeDefined()
  })

  test('getSessionState method exists', () => {
    expect(chrome.loginState.getSessionState).toBeDefined()
  })

  test('getProfileType returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.loginState.getProfileType()).rejects.toThrow(
      'chrome.loginState.getProfileType is not implemented',
    )
  })

  test('getSessionState returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.loginState.getSessionState()).rejects.toThrow(
      'chrome.loginState.getSessionState is not implemented',
    )
  })

  test('onSessionStateChanged event exists', () => {
    expect(chrome.loginState.onSessionStateChanged).toBeDefined()
  })

  test('onSessionStateChanged event interface works', () => {
    const listener = () => {}
    chrome.loginState.onSessionStateChanged.addListener(listener)
    expect(chrome.loginState.onSessionStateChanged.hasListener(listener)).toBe(
      true,
    )

    // Clean up
    chrome.loginState.onSessionStateChanged.removeListener(listener)
  })
})
