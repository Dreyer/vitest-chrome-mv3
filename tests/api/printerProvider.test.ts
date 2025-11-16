import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.printerProvider', () => {
  test('namespace exists', () => {
    expect(chrome.printerProvider).toBeDefined()
    expect(typeof chrome.printerProvider).toBe('object')
  })

  test('onGetCapabilityRequested event exists', () => {
    expect(chrome.printerProvider.onGetCapabilityRequested).toBeDefined()
  })

  test('onGetPrintersRequested event exists', () => {
    expect(chrome.printerProvider.onGetPrintersRequested).toBeDefined()
  })

  test('onGetUsbPrinterInfoRequested event exists', () => {
    expect(chrome.printerProvider.onGetUsbPrinterInfoRequested).toBeDefined()
  })

  test('onPrintRequested event exists', () => {
    expect(chrome.printerProvider.onPrintRequested).toBeDefined()
  })

  test('onGetCapabilityRequested event interface works', () => {
    const listener = () => {}
    chrome.printerProvider.onGetCapabilityRequested.addListener(listener)
    expect(
      chrome.printerProvider.onGetCapabilityRequested.hasListener(listener),
    ).toBe(true)

    // Clean up
    chrome.printerProvider.onGetCapabilityRequested.removeListener(listener)
  })
})
