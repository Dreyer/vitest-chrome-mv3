import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.notifications', () => {
  const notificationId = 'test-notification'
  const notificationOptions = {
    type: 'basic' as const,
    title: 'Test Notification',
    message: 'This is a test notification',
    iconUrl: 'icon.png',
  }

  test('clear throws unimplemented error', () => {
    expect(() => chrome.notifications.clear(notificationId)).toThrow(
      'chrome.notifications.clear is not implemented',
    )
  })

  test('create throws unimplemented error', () => {
    expect(() =>
      chrome.notifications.create(notificationId, notificationOptions),
    ).toThrow('chrome.notifications.create is not implemented')
  })

  test('getAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.notifications.getAll()).rejects.toThrow(
      'chrome.notifications.getAll is not implemented',
    )
  })

  test('getPermissionLevel returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.notifications.getPermissionLevel()).rejects.toThrow(
      'chrome.notifications.getPermissionLevel is not implemented',
    )
  })

  test('update throws unimplemented error', () => {
    expect(() =>
      chrome.notifications.update(notificationId, notificationOptions),
    ).toThrow('chrome.notifications.update is not implemented')
  })

  test('onButtonClicked event interface works', () => {
    const listener = () => {}
    chrome.notifications.onButtonClicked.addListener(listener)
    expect(chrome.notifications.onButtonClicked.hasListener(listener)).toBe(true)
    expect(chrome.notifications.onButtonClicked.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    chrome.notifications.onButtonClicked.callListeners(notificationId, 0)

    // Clean up
    chrome.notifications.onButtonClicked.removeListener(listener)
    expect(chrome.notifications.onButtonClicked.hasListener(listener)).toBe(false)
  })

  test('onClicked event interface works', () => {
    const listener = () => {}
    chrome.notifications.onClicked.addListener(listener)
    expect(chrome.notifications.onClicked.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.notifications.onClicked.callListeners(notificationId)

    // Clean up
    chrome.notifications.onClicked.removeListener(listener)
  })

  test('onClosed event interface works', () => {
    const listener = () => {}
    chrome.notifications.onClosed.addListener(listener)
    expect(chrome.notifications.onClosed.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.notifications.onClosed.callListeners(notificationId, true)

    // Clean up
    chrome.notifications.onClosed.removeListener(listener)
  })

  test('onPermissionLevelChanged event interface works', () => {
    const listener = () => {}
    chrome.notifications.onPermissionLevelChanged.addListener(listener)
    expect(chrome.notifications.onPermissionLevelChanged.hasListener(listener)).toBe(true)

    // Test calling listeners with mock data
    chrome.notifications.onPermissionLevelChanged.callListeners('granted')

    // Clean up
    chrome.notifications.onPermissionLevelChanged.removeListener(listener)
  })

  test('onShowSettings event interface works', () => {
    const listener = () => {}
    chrome.notifications.onShowSettings.addListener(listener)
    expect(chrome.notifications.onShowSettings.hasListener(listener)).toBe(true)

    // Clean up
    chrome.notifications.onShowSettings.removeListener(listener)
  })
})
