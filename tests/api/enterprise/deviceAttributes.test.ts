import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.enterprise.deviceAttributes', () => {
  test('namespace exists', () => {
    expect(chrome.enterprise.deviceAttributes).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.enterprise.deviceAttributes).toBeDefined()
  })

  test('getDeviceAnnotatedLocation method exists', () => {
    expect(chrome.enterprise.deviceAttributes.getDeviceAnnotatedLocation).toBeDefined()
  })

  test('getDeviceAssetId method exists', () => {
    expect(chrome.enterprise.deviceAttributes.getDeviceAssetId).toBeDefined()
  })

  test('getDeviceHostname method exists', () => {
    expect(chrome.enterprise.deviceAttributes.getDeviceHostname).toBeDefined()
  })

  test('getDeviceSerialNumber method exists', () => {
    expect(chrome.enterprise.deviceAttributes.getDeviceSerialNumber).toBeDefined()
  })

  test('getDirectoryDeviceId method exists', () => {
    expect(chrome.enterprise.deviceAttributes.getDirectoryDeviceId).toBeDefined()
  })

  test('getDeviceAnnotatedLocation returns a promise that rejects with unimplemented error', async () => {
    await expect(
      chrome.enterprise.deviceAttributes.getDeviceAnnotatedLocation(),
    ).rejects.toThrow(
      'chrome.enterprise.deviceAttributes.getDeviceAnnotatedLocation is not implemented',
    )
  })
})
