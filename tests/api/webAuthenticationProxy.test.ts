import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.webAuthenticationProxy', () => {
  test('namespace exists', () => {
    expect(chrome.webAuthenticationProxy).toBeDefined()
    expect(typeof chrome.webAuthenticationProxy).toBe('object')
  })

  test('attach method exists', () => {
    expect(chrome.webAuthenticationProxy.attach).toBeDefined()
  })

  test('completeCreateRequest method exists', () => {
    expect(chrome.webAuthenticationProxy.completeCreateRequest).toBeDefined()
  })

  test('completeGetRequest method exists', () => {
    expect(chrome.webAuthenticationProxy.completeGetRequest).toBeDefined()
  })

  test('completeIsUvpaaRequest method exists', () => {
    expect(chrome.webAuthenticationProxy.completeIsUvpaaRequest).toBeDefined()
  })

  test('detach method exists', () => {
    expect(chrome.webAuthenticationProxy.detach).toBeDefined()
  })

  test('attach returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.webAuthenticationProxy.attach()).rejects.toThrow(
      'chrome.webAuthenticationProxy.attach is not implemented',
    )
  })

  test('detach returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.webAuthenticationProxy.detach()).rejects.toThrow(
      'chrome.webAuthenticationProxy.detach is not implemented',
    )
  })

  test('onCreateRequest event exists', () => {
    expect(chrome.webAuthenticationProxy.onCreateRequest).toBeDefined()
  })

  test('onGetRequest event exists', () => {
    expect(chrome.webAuthenticationProxy.onGetRequest).toBeDefined()
  })

  test('onIsUvpaaRequest event exists', () => {
    expect(chrome.webAuthenticationProxy.onIsUvpaaRequest).toBeDefined()
  })

  test('onRemoteSessionStateChange event exists', () => {
    expect(chrome.webAuthenticationProxy.onRemoteSessionStateChange).toBeDefined()
  })

  test('onRequestCanceled event exists', () => {
    expect(chrome.webAuthenticationProxy.onRequestCanceled).toBeDefined()
  })

  test('onCreateRequest event interface works', () => {
    const listener = () => {}
    chrome.webAuthenticationProxy.onCreateRequest.addListener(listener)
    expect(
      chrome.webAuthenticationProxy.onCreateRequest.hasListener(listener),
    ).toBe(true)

    // Clean up
    chrome.webAuthenticationProxy.onCreateRequest.removeListener(listener)
  })
})
