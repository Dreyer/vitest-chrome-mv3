import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.accessibilityFeatures', () => {
  test('namespace exists', () => {
    expect(chrome.accessibilityFeatures).toBeDefined()
    expect(typeof chrome.accessibilityFeatures).toBe('object')
  })
})
