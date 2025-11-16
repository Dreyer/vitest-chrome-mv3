import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.ttsEngine', () => {
  test('namespace exists', () => {
    expect(chrome.ttsEngine).toBeDefined()
    expect(typeof chrome.ttsEngine).toBe('object')
  })

  test('updateLanguage method exists', () => {
    expect(chrome.ttsEngine.updateLanguage).toBeDefined()
  })

  test('updateVoices method exists', () => {
    expect(chrome.ttsEngine.updateVoices).toBeDefined()
  })

  test('onInstallLanguageRequest event exists', () => {
    expect(chrome.ttsEngine.onInstallLanguageRequest).toBeDefined()
  })

  test('onLanguageStatusRequest event exists', () => {
    expect(chrome.ttsEngine.onLanguageStatusRequest).toBeDefined()
  })

  test('onPause event exists', () => {
    expect(chrome.ttsEngine.onPause).toBeDefined()
  })

  test('onResume event exists', () => {
    expect(chrome.ttsEngine.onResume).toBeDefined()
  })

  test('onSpeak event exists', () => {
    expect(chrome.ttsEngine.onSpeak).toBeDefined()
  })

  test('onSpeakWithAudioStream event exists', () => {
    expect(chrome.ttsEngine.onSpeakWithAudioStream).toBeDefined()
  })

  test('onStop event exists', () => {
    expect(chrome.ttsEngine.onStop).toBeDefined()
  })

  test('onUninstallLanguageRequest event exists', () => {
    expect(chrome.ttsEngine.onUninstallLanguageRequest).toBeDefined()
  })

  test('onSpeak event interface works', () => {
    const listener = () => {}
    chrome.ttsEngine.onSpeak.addListener(listener)
    expect(chrome.ttsEngine.onSpeak.hasListener(listener)).toBe(true)

    // Clean up
    chrome.ttsEngine.onSpeak.removeListener(listener)
  })
})
