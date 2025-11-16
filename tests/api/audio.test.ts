import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.audio', () => {
  test('namespace exists', () => {
    expect(chrome.audio).toBeDefined()
    expect(typeof chrome.audio).toBe('object')
  })

  test('getDevices method exists', () => {
    expect(chrome.audio.getDevices).toBeDefined()
  })

  test('getMute method exists', () => {
    expect(chrome.audio.getMute).toBeDefined()
  })

  test('setActiveDevices method exists', () => {
    expect(chrome.audio.setActiveDevices).toBeDefined()
  })

  test('setMute method exists', () => {
    expect(chrome.audio.setMute).toBeDefined()
  })

  test('setProperties method exists', () => {
    expect(chrome.audio.setProperties).toBeDefined()
  })

  test('onDeviceListChanged event exists', () => {
    expect(chrome.audio.onDeviceListChanged).toBeDefined()
  })

  test('onLevelChanged event exists', () => {
    expect(chrome.audio.onLevelChanged).toBeDefined()
  })

  test('onMuteChanged event exists', () => {
    expect(chrome.audio.onMuteChanged).toBeDefined()
  })
})
