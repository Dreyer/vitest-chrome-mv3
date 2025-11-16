import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.webNavigation', () => {
  test('namespace exists', () => {
    expect(chrome.webNavigation).toBeDefined()
    expect(typeof chrome.webNavigation).toBe('object')
  })

  test('getAllFrames method exists', () => {
    expect(chrome.webNavigation.getAllFrames).toBeDefined()
  })

  test('getFrame method exists', () => {
    expect(chrome.webNavigation.getFrame).toBeDefined()
  })

  test('getAllFrames throws unimplemented error', () => {
    expect(() =>
      chrome.webNavigation.getAllFrames({ tabId: 1 }),
    ).toThrow('chrome.webNavigation.getAllFrames is not implemented')
  })

  test('getFrame throws unimplemented error', () => {
    expect(() => chrome.webNavigation.getFrame({ tabId: 1 })).toThrow(
      'chrome.webNavigation.getFrame is not implemented',
    )
  })

  test('onBeforeNavigate event exists', () => {
    expect(chrome.webNavigation.onBeforeNavigate).toBeDefined()
  })

  test('onCommitted event exists', () => {
    expect(chrome.webNavigation.onCommitted).toBeDefined()
  })

  test('onCompleted event exists', () => {
    expect(chrome.webNavigation.onCompleted).toBeDefined()
  })

  test('onCreatedNavigationTarget event exists', () => {
    expect(chrome.webNavigation.onCreatedNavigationTarget).toBeDefined()
  })

  test('onDOMContentLoaded event exists', () => {
    expect(chrome.webNavigation.onDOMContentLoaded).toBeDefined()
  })

  test('onErrorOccurred event exists', () => {
    expect(chrome.webNavigation.onErrorOccurred).toBeDefined()
  })

  test('onHistoryStateUpdated event exists', () => {
    expect(chrome.webNavigation.onHistoryStateUpdated).toBeDefined()
  })

  test('onReferenceFragmentUpdated event exists', () => {
    expect(chrome.webNavigation.onReferenceFragmentUpdated).toBeDefined()
  })

  test('onTabReplaced event exists', () => {
    expect(chrome.webNavigation.onTabReplaced).toBeDefined()
  })

  test('onBeforeNavigate event interface works', () => {
    const listener = () => {}
    chrome.webNavigation.onBeforeNavigate.addListener(listener)
    expect(chrome.webNavigation.onBeforeNavigate.hasListener(listener)).toBe(true)
    expect(chrome.webNavigation.onBeforeNavigate.hasListeners()).toBe(true)

    // Clean up
    chrome.webNavigation.onBeforeNavigate.removeListener(listener)
    expect(chrome.webNavigation.onBeforeNavigate.hasListener(listener)).toBe(
      false,
    )
  })
})
