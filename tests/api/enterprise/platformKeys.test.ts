import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.enterprise.platformKeys', () => {
  test('namespace exists', () => {
    expect(chrome.enterprise.platformKeys).toBeDefined()
    expect(typeof chrome.enterprise.platformKeys).toBe('object')
  })

  test('challengeKey method exists', () => {
    expect(chrome.enterprise.platformKeys.challengeKey).toBeDefined()
  })

  test('challengeMachineKey method exists', () => {
    expect(chrome.enterprise.platformKeys.challengeMachineKey).toBeDefined()
  })

  test('challengeUserKey method exists', () => {
    expect(chrome.enterprise.platformKeys.challengeUserKey).toBeDefined()
  })

  test('getCertificates method exists', () => {
    expect(chrome.enterprise.platformKeys.getCertificates).toBeDefined()
  })

  test('getTokens method exists', () => {
    expect(chrome.enterprise.platformKeys.getTokens).toBeDefined()
  })

  test('importCertificate method exists', () => {
    expect(chrome.enterprise.platformKeys.importCertificate).toBeDefined()
  })

  test('removeCertificate method exists', () => {
    expect(chrome.enterprise.platformKeys.removeCertificate).toBeDefined()
  })
})
