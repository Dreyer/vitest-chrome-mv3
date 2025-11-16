import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.webRequest', () => {
  test('handlerBehaviorChanged returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.webRequest.handlerBehaviorChanged()).rejects.toThrow(
      'chrome.webRequest.handlerBehaviorChanged is not implemented',
    );
  });

  test('onBeforeRequest event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onBeforeRequest.addListener(listener);
    expect(chrome.webRequest.onBeforeRequest.hasListener(listener)).toBe(true);
    expect(chrome.webRequest.onBeforeRequest.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    const details = {
      requestId: '123',
      url: 'https://example.com',
      method: 'GET',
      frameId: 0,
      parentFrameId: -1,
      tabId: 1,
      type: 'main_frame' as const,
      timeStamp: Date.now(),
    };
    chrome.webRequest.onBeforeRequest.callListeners(details);

    // Clean up
    chrome.webRequest.onBeforeRequest.removeListener(listener);
    expect(chrome.webRequest.onBeforeRequest.hasListener(listener)).toBe(false);
  });

  test('onBeforeSendHeaders event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onBeforeSendHeaders.addListener(listener);
    expect(chrome.webRequest.onBeforeSendHeaders.hasListener(listener)).toBe(
      true,
    );

    // Clean up
    chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
  });

  test('onHeadersReceived event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onHeadersReceived.addListener(listener);
    expect(chrome.webRequest.onHeadersReceived.hasListener(listener)).toBe(
      true,
    );

    // Clean up
    chrome.webRequest.onHeadersReceived.removeListener(listener);
  });

  test('onCompleted event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onCompleted.addListener(listener);
    expect(chrome.webRequest.onCompleted.hasListener(listener)).toBe(true);

    // Clean up
    chrome.webRequest.onCompleted.removeListener(listener);
  });

  test('onErrorOccurred event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onErrorOccurred.addListener(listener);
    expect(chrome.webRequest.onErrorOccurred.hasListener(listener)).toBe(true);

    // Clean up
    chrome.webRequest.onErrorOccurred.removeListener(listener);
  });

  test('onAuthRequired event interface works', () => {
    const listener = () => {};
    chrome.webRequest.onAuthRequired.addListener(listener);
    expect(chrome.webRequest.onAuthRequired.hasListener(listener)).toBe(true);

    // Clean up
    chrome.webRequest.onAuthRequired.removeListener(listener);
  });
});
