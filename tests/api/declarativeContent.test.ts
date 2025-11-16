import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.declarativeContent', () => {
  test('namespace exists', () => {
    expect(chrome.declarativeContent).toBeDefined()
    expect(typeof chrome.declarativeContent).toBe('object')
  })
})
