import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.userScripts', () => {
  test('namespace exists', () => {
    expect(chrome.userScripts).toBeDefined()
    expect(typeof chrome.userScripts).toBe('object')
  })

  test('configureWorld method exists', () => {
    expect(chrome.userScripts.configureWorld).toBeDefined()
  })

  test('execute method exists', () => {
    expect(chrome.userScripts.execute).toBeDefined()
  })

  test('getScripts method exists', () => {
    expect(chrome.userScripts.getScripts).toBeDefined()
  })

  test('getWorldConfigurations method exists', () => {
    expect(chrome.userScripts.getWorldConfigurations).toBeDefined()
  })

  test('register method exists', () => {
    expect(chrome.userScripts.register).toBeDefined()
  })

  test('resetWorldConfiguration method exists', () => {
    expect(chrome.userScripts.resetWorldConfiguration).toBeDefined()
  })

  test('unregister method exists', () => {
    expect(chrome.userScripts.unregister).toBeDefined()
  })

  test('update method exists', () => {
    expect(chrome.userScripts.update).toBeDefined()
  })

  test('getWorldConfigurations returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.userScripts.getWorldConfigurations()).rejects.toThrow(
      'chrome.userScripts.getWorldConfigurations is not implemented',
    )
  })
})
