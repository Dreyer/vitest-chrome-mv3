import { chrome } from '../../src/index'
import { vi, test, expect, describe } from 'vitest'

describe('chrome.runtime', () => {
  test('getManifest', () => {
    const manifest = {
      name: 'my chrome extension',
      manifest_version: 3,
      version: '1.0.0',
    }

    chrome.runtime.getManifest.mockImplementation(() => manifest)

    expect(chrome.runtime.getManifest()).toEqual(manifest)
    expect(chrome.runtime.getManifest).toBeCalled()
  })

  test('sendMessage with callback', () => {
    const message = { greeting: 'hello?' }
    const response = { greeting: 'here I am' }
    const callbackSpy = vi.fn()

    // @ts-expect-error - sendMessage is not a part of the chrome namespace
    chrome.runtime.sendMessage.mockImplementation((message, callback) => {
      callback(response)
    })

    chrome.runtime.sendMessage(message, callbackSpy)

    // @ts-expect-error - sendMessage is not a part of the chrome namespace
    expect(chrome.runtime.sendMessage).toBeCalledWith(message, callbackSpy)
    expect(callbackSpy).toBeCalledWith(response)
  })

  test('onMessage event', () => {
    const listenerSpy = vi.fn()
    const sendResponseSpy = vi.fn()

    chrome.runtime.onMessage.addListener(listenerSpy)

    expect(listenerSpy).not.toBeCalled()
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true)

    chrome.runtime.onMessage.callListeners(
      { greeting: 'hello' }, // message
      {}, // MessageSender object
      sendResponseSpy, // SendResponse function
    )

    expect(listenerSpy).toBeCalledWith({ greeting: 'hello' }, {}, sendResponseSpy)
    expect(sendResponseSpy).not.toBeCalled()
  })

  test('lastError', () => {
    const message = { greeting: 'hello?' }
    const response = { greeting: 'here I am' }

    // lastError setup
    const lastErrorMessage = 'this is an error'
    const lastErrorGetter = vi.fn(() => lastErrorMessage)
    const lastError = {
      get message() {
        return lastErrorGetter()
      },
    }

    // mock implementation
    // @ts-expect-error - sendMessage is not a part of the chrome namespace
    chrome.runtime.sendMessage.mockImplementation((message, callback) => {
      chrome.runtime.lastError = lastError

      callback(response)

      // lastError is undefined outside of a callback
      delete chrome.runtime.lastError
    })

    // callback implementation
    const lastErrorSpy = vi.fn()
    const callbackSpy = vi.fn(() => {
      if (chrome.runtime.lastError) {
        lastErrorSpy(chrome.runtime.lastError.message)
      }
    })

    // send a message
    chrome.runtime.sendMessage(message, callbackSpy)

    expect(callbackSpy).toBeCalledWith(response)
    expect(lastErrorGetter).toBeCalled()
    expect(lastErrorSpy).toBeCalledWith(lastErrorMessage)

    // lastError has been cleared
    expect(chrome.runtime.lastError).toBeUndefined()
  })
})
