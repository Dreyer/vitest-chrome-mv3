import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.tabCapture', () => {
  test('namespace exists', () => {
    expect(chrome.tabCapture).toBeDefined()
    expect(typeof chrome.tabCapture).toBe('object')
  })

  test('capture method exists', () => {
    expect(chrome.tabCapture.capture).toBeDefined()
  })

  test('getCapturedTabs method exists', () => {
    expect(chrome.tabCapture.getCapturedTabs).toBeDefined()
  })

  test('getMediaStreamId method exists', () => {
    expect(chrome.tabCapture.getMediaStreamId).toBeDefined()
  })

  test('capture throws unimplemented error', () => {
    expect(() =>
      chrome.tabCapture.capture({}, () => {}),
    ).toThrow('chrome.tabCapture.capture is not implemented')
  })

  test('getCapturedTabs returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.tabCapture.getCapturedTabs()).rejects.toThrow(
      'chrome.tabCapture.getCapturedTabs is not implemented',
    )
  })

  test('getMediaStreamId throws unimplemented error', () => {
    expect(() => chrome.tabCapture.getMediaStreamId()).toThrow(
      'chrome.tabCapture.getMediaStreamId is not implemented',
    )
  })

  test('onStatusChanged event exists', () => {
    expect(chrome.tabCapture.onStatusChanged).toBeDefined()
  })

  test('onStatusChanged event interface works', () => {
    const listener = () => {}
    chrome.tabCapture.onStatusChanged.addListener(listener)
    expect(chrome.tabCapture.onStatusChanged.hasListener(listener)).toBe(true)

    // Clean up
    chrome.tabCapture.onStatusChanged.removeListener(listener)
  })
})
