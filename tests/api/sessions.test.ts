import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.sessions', () => {
  test('namespace exists', () => {
    expect(chrome.sessions).toBeDefined()
    expect(typeof chrome.sessions).toBe('object')
  })

  test('getDevices method exists', () => {
    expect(chrome.sessions.getDevices).toBeDefined()
  })

  test('getRecentlyClosed method exists', () => {
    expect(chrome.sessions.getRecentlyClosed).toBeDefined()
  })

  test('restore method exists', () => {
    expect(chrome.sessions.restore).toBeDefined()
  })

  test('getDevices throws unimplemented error', () => {
    expect(() => chrome.sessions.getDevices()).toThrow(
      'chrome.sessions.getDevices is not implemented',
    )
  })

  test('getRecentlyClosed throws unimplemented error', () => {
    expect(() => chrome.sessions.getRecentlyClosed()).toThrow(
      'chrome.sessions.getRecentlyClosed is not implemented',
    )
  })

  test('restore throws unimplemented error', () => {
    expect(() => chrome.sessions.restore()).toThrow(
      'chrome.sessions.restore is not implemented',
    )
  })

  test('onChanged event exists', () => {
    expect(chrome.sessions.onChanged).toBeDefined()
  })

  test('onChanged event interface works', () => {
    const listener = () => {}
    chrome.sessions.onChanged.addListener(listener)
    expect(chrome.sessions.onChanged.hasListener(listener)).toBe(true)
    expect(chrome.sessions.onChanged.hasListeners()).toBe(true)

    // Clean up
    chrome.sessions.onChanged.removeListener(listener)
    expect(chrome.sessions.onChanged.hasListener(listener)).toBe(false)
  })
})
