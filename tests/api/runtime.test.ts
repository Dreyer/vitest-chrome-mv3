import { chrome } from '../../src/index';
import { vi, test, expect, describe } from 'vitest';

describe('chrome.runtime', () => {
  test('getManifest', () => {
    const manifest = {
      name: 'my chrome extension',
      manifest_version: 3,
      version: '1.0.0',
    };

    const originalGetManifest = chrome.runtime.getManifest;
    chrome.runtime.getManifest = vi.fn().mockReturnValue(manifest);

    expect(chrome.runtime.getManifest()).toEqual(manifest);
    expect(chrome.runtime.getManifest).toHaveBeenCalled();

    // Restore original function
    chrome.runtime.getManifest = originalGetManifest;
  });

  test('getURL returns chrome-extension URL', () => {
    const path = 'icons/icon32.png';
    const result = chrome.runtime.getURL(path);

    expect(result).toBe(
      'chrome-extension://test-extension-id/icons/icon32.png',
    );
    expect(chrome.runtime.getURL).toHaveBeenCalledWith(path);
  });

  test('getURL handles different paths', () => {
    expect(chrome.runtime.getURL('manifest.json')).toBe(
      'chrome-extension://test-extension-id/manifest.json',
    );
    expect(chrome.runtime.getURL('')).toBe(
      'chrome-extension://test-extension-id/',
    );
    expect(chrome.runtime.getURL('popup.html')).toBe(
      'chrome-extension://test-extension-id/popup.html',
    );
  });

  test('sendMessage supports both callback and promise modes', async () => {
    const message = { greeting: 'hello' };
    const callbackSpy = vi.fn();

    // Test callback mode - should call callback asynchronously with undefined
    chrome.runtime.sendMessage(message, callbackSpy);
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(
      message,
      callbackSpy,
    );

    // Callback should be called asynchronously
    await new Promise(process.nextTick);
    expect(callbackSpy).toHaveBeenCalledWith(undefined);

    // Test promise mode - should return resolved promise
    const promise = chrome.runtime.sendMessage(message);
    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toBe(undefined);
  });

  test('onMessage event', () => {
    const listenerSpy = vi.fn();
    const sendResponseSpy = vi.fn();

    chrome.runtime.onMessage.addListener(listenerSpy);

    expect(listenerSpy).not.toBeCalled();
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true);

    // @ts-expect-error - callListeners is a mock utility method
    chrome.runtime.onMessage.callListeners(
      { greeting: 'hello' }, // message
      {}, // MessageSender object
      sendResponseSpy, // SendResponse function
    );

    expect(listenerSpy).toBeCalledWith(
      { greeting: 'hello' },
      {},
      sendResponseSpy,
    );
    expect(sendResponseSpy).not.toBeCalled();
  });

  test('lastError', () => {
    const message = { greeting: 'hello?' };
    const response = { greeting: 'here I am' };

    // lastError setup
    const lastErrorMessage = 'this is an error';
    const lastErrorGetter = vi.fn(() => lastErrorMessage);
    const lastError = {
      get message() {
        return lastErrorGetter();
      },
    };

    // mock implementation
    const originalSendMessage = chrome.runtime.sendMessage;
    // @ts-expect-error - overriding chrome API for testing
    chrome.runtime.sendMessage = vi.fn((message, callback) => {
      // @ts-expect-error - testing lastError assignment in mock
      chrome.runtime.lastError = lastError;

      callback(response);

      // lastError is undefined outside of a callback
      // @ts-expect-error - testing lastError deletion in mock
      delete chrome.runtime.lastError;
    });

    // callback implementation
    const lastErrorSpy = vi.fn();
    const callbackSpy = vi.fn(() => {
      if (chrome.runtime.lastError) {
        lastErrorSpy(chrome.runtime.lastError.message);
      }
    });

    // send a message
    chrome.runtime.sendMessage(message, callbackSpy);

    expect(callbackSpy).toBeCalledWith(response);
    expect(lastErrorGetter).toBeCalled();
    expect(lastErrorSpy).toBeCalledWith(lastErrorMessage);

    // lastError has been cleared
    expect(chrome.runtime.lastError).toBeUndefined();

    // Restore original function
    chrome.runtime.sendMessage = originalSendMessage;
  });
});
