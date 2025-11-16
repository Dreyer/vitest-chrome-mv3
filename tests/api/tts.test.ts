import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.tts', () => {
  test('namespace exists', () => {
    expect(chrome.tts).toBeDefined()
    expect(typeof chrome.tts).toBe('object')
  })

  test('getVoices method exists', () => {
    expect(chrome.tts.getVoices).toBeDefined()
  })

  test('isSpeaking method exists', () => {
    expect(chrome.tts.isSpeaking).toBeDefined()
  })

  test('pause method exists', () => {
    expect(chrome.tts.pause).toBeDefined()
  })

  test('resume method exists', () => {
    expect(chrome.tts.resume).toBeDefined()
  })

  test('speak method exists', () => {
    expect(chrome.tts.speak).toBeDefined()
  })

  test('stop method exists', () => {
    expect(chrome.tts.stop).toBeDefined()
  })

  test('getVoices returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.tts.getVoices()).rejects.toThrow(
      'chrome.tts.getVoices is not implemented',
    )
  })

  test('isSpeaking returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.tts.isSpeaking()).rejects.toThrow(
      'chrome.tts.isSpeaking is not implemented',
    )
  })

  test('onVoicesChanged event exists', () => {
    expect(chrome.tts.onVoicesChanged).toBeDefined()
  })

  test('onVoicesChanged event interface works', () => {
    const listener = () => {}
    chrome.tts.onVoicesChanged.addListener(listener)
    expect(chrome.tts.onVoicesChanged.hasListener(listener)).toBe(true)

    // Clean up
    chrome.tts.onVoicesChanged.removeListener(listener)
  })
})
