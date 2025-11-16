import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.fileBrowserHandler', () => {
  test('namespace exists', () => {
    expect(chrome.fileBrowserHandler).toBeDefined()
    expect(typeof chrome.fileBrowserHandler).toBe('object')
  })

  test('onExecute event exists', () => {
    expect(chrome.fileBrowserHandler.onExecute).toBeDefined()
  })

  test('onExecute event interface works', () => {
    const listener = () => {}
    chrome.fileBrowserHandler.onExecute.addListener(listener)
    expect(chrome.fileBrowserHandler.onExecute.hasListener(listener)).toBe(true)

    // Clean up
    chrome.fileBrowserHandler.onExecute.removeListener(listener)
  })
})
