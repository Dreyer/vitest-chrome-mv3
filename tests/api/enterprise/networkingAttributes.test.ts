import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.enterprise.networkingAttributes', () => {
  test('namespace exists', () => {
    expect(chrome.enterprise.networkingAttributes).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.enterprise.networkingAttributes).toBeDefined()
  })

  test('getNetworkDetails method exists', () => {
    expect(chrome.enterprise.networkingAttributes.getNetworkDetails).toBeDefined()
  })

  test('getNetworkDetails returns a promise that rejects with unimplemented error', async () => {
    await expect(
      chrome.enterprise.networkingAttributes.getNetworkDetails(),
    ).rejects.toThrow(
      'chrome.enterprise.networkingAttributes.getNetworkDetails is not implemented',
    )
  })
})
