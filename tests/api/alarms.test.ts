import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.alarms', () => {
  const alarm = {
    name: 'test-alarm',
    scheduledTime: Date.now() + 1000,
  }

  test('clear throws unimplemented error', () => {
    expect(() => chrome.alarms.clear(alarm.name)).toThrow(
      'chrome.alarms.clear is not implemented',
    )
  })

  test('clearAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.alarms.clearAll()).rejects.toThrow(
      'chrome.alarms.clearAll is not implemented',
    )
  })

  test('create throws unimplemented error', () => {
    expect(() =>
      chrome.alarms.create(alarm.name, {
        delayInMinutes: 1,
      }),
    ).toThrow('chrome.alarms.create is not implemented')
  })

  test('get throws unimplemented error', () => {
    expect(() => chrome.alarms.get(alarm.name)).toThrow(
      'chrome.alarms.get is not implemented',
    )
  })

  test('getAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.alarms.getAll()).rejects.toThrow(
      'chrome.alarms.getAll is not implemented',
    )
  })

  test('onAlarm event interface works', () => {
    const listener = () => {}
    chrome.alarms.onAlarm.addListener(listener)
    expect(chrome.alarms.onAlarm.hasListener(listener)).toBe(true)
    expect(chrome.alarms.onAlarm.hasListeners()).toBe(true)

    // Test calling listeners
    const mockAlarm = { name: 'test', scheduledTime: Date.now() }
    chrome.alarms.onAlarm.callListeners(mockAlarm)

    // Clean up
    chrome.alarms.onAlarm.removeListener(listener)
    expect(chrome.alarms.onAlarm.hasListener(listener)).toBe(false)
  })
})
