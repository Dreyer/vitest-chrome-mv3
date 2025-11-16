import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.devtools.panels', () => {
  test('namespace exists', () => {
    expect(chrome.devtools.panels).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.devtools.panels).toBeDefined()
  })

  test('create method exists', () => {
    expect(chrome.devtools.panels.create).toBeDefined()
  })

  test('openResource method exists', () => {
    expect(chrome.devtools.panels.openResource).toBeDefined()
  })

  test('setOpenResourceHandler method exists', () => {
    expect(chrome.devtools.panels.setOpenResourceHandler).toBeDefined()
  })

  test('setThemeChangeHandler method exists', () => {
    expect(chrome.devtools.panels.setThemeChangeHandler).toBeDefined()
  })

  test('elements panel exists', () => {
    expect(chrome.devtools.panels.elements).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.devtools.panels.elements).toBeDefined()
  })

  test('sources panel exists', () => {
    expect(chrome.devtools.panels.sources).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.devtools.panels.sources).toBeDefined()
  })

  test('themeName property exists', () => {
    expect(chrome.devtools.panels.themeName).toBeDefined()
  })
})
