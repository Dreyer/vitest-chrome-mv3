import { chrome } from '../src/index'
import { describe, test, expect } from 'vitest'

describe('Nested namespaces', () => {
  test('chrome.devtools namespace exists', () => {
    expect(chrome.devtools).toBeDefined()
  })

  test('chrome.enterprise namespace exists', () => {
    expect(chrome.enterprise).toBeDefined()
  })

  test('chrome.input namespace exists', () => {
    expect(chrome.input).toBeDefined()
  })

  test('chrome.system namespace exists', () => {
    expect(chrome.system).toBeDefined()
  })

  test('chrome.devtools.inspectedWindow can be accessed', () => {
    // For unknown APIs, we create proxies that allow property access
    const inspectedWindow = chrome.devtools.inspectedWindow
    expect(inspectedWindow).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(inspectedWindow).toBeDefined()

    // The proxy allows deep property access
    const evalProp = inspectedWindow.eval
    expect(evalProp).toBeDefined()
  })
})
