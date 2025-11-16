import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.sidePanel', () => {
  test('getLayout method exists', () => {
    expect(chrome.sidePanel.getLayout).toBeDefined()
  })

  test('getOptions method exists', () => {
    expect(chrome.sidePanel.getOptions).toBeDefined()
  })

  test('getPanelBehavior method exists', () => {
    expect(chrome.sidePanel.getPanelBehavior).toBeDefined()
  })

  test('open method exists', () => {
    expect(chrome.sidePanel.open).toBeDefined()
  })

  test('setOptions method exists', () => {
    expect(chrome.sidePanel.setOptions).toBeDefined()
  })

  test('setPanelBehavior method exists', () => {
    expect(chrome.sidePanel.setPanelBehavior).toBeDefined()
  })

  test('onOpened event exists', () => {
    expect(chrome.sidePanel.onOpened).toBeDefined()
  })
})
