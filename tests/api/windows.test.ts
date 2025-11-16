import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.windows', () => {
  const mockWindow = {
    id: 1,
    focused: true,
    top: 100,
    left: 200,
    width: 800,
    height: 600,
    incognito: false,
    type: 'normal' as const,
    state: 'normal' as const,
    alwaysOnTop: false,
  }

  test('create throws unimplemented error', () => {
    expect(() =>
      chrome.windows.create({
        url: 'https://example.com',
        width: 800,
        height: 600,
      }),
    ).toThrow('chrome.windows.create is not implemented')
  })

  test('get throws unimplemented error', () => {
    expect(() => chrome.windows.get(1)).toThrow(
      'chrome.windows.get is not implemented',
    )
  })

  test('getAll throws unimplemented error', () => {
    expect(() => chrome.windows.getAll()).toThrow(
      'chrome.windows.getAll is not implemented',
    )
  })

  test('getCurrent throws unimplemented error', () => {
    expect(() => chrome.windows.getCurrent()).toThrow(
      'chrome.windows.getCurrent is not implemented',
    )
  })

  test('getLastFocused throws unimplemented error', () => {
    expect(() => chrome.windows.getLastFocused()).toThrow(
      'chrome.windows.getLastFocused is not implemented',
    )
  })

  test('remove throws unimplemented error', () => {
    expect(() => chrome.windows.remove(1)).toThrow(
      'chrome.windows.remove is not implemented',
    )
  })

  test('update throws unimplemented error', () => {
    expect(() =>
      chrome.windows.update(1, {
        width: 1000,
        height: 800,
      }),
    ).toThrow('chrome.windows.update is not implemented')
  })

  test('onBoundsChanged event interface works', () => {
    const listener = () => {}
    chrome.windows.onBoundsChanged.addListener(listener)
    expect(chrome.windows.onBoundsChanged.hasListener(listener)).toBe(true)
    expect(chrome.windows.onBoundsChanged.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    chrome.windows.onBoundsChanged.callListeners(mockWindow)

    // Clean up
    chrome.windows.onBoundsChanged.removeListener(listener)
    expect(chrome.windows.onBoundsChanged.hasListener(listener)).toBe(false)
  })

  test('onCreated event interface works', () => {
    const listener = () => {}
    chrome.windows.onCreated.addListener(listener)
    expect(chrome.windows.onCreated.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.windows.onCreated.callListeners(mockWindow)

    // Clean up
    chrome.windows.onCreated.removeListener(listener)
  })

  test('onFocusChanged event interface works', () => {
    const listener = () => {}
    chrome.windows.onFocusChanged.addListener(listener)
    expect(chrome.windows.onFocusChanged.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.windows.onFocusChanged.callListeners(1)

    // Clean up
    chrome.windows.onFocusChanged.removeListener(listener)
  })

  test('onRemoved event interface works', () => {
    const listener = () => {}
    chrome.windows.onRemoved.addListener(listener)
    expect(chrome.windows.onRemoved.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.windows.onRemoved.callListeners(1)

    // Clean up
    chrome.windows.onRemoved.removeListener(listener)
  })
})
