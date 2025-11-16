import { chrome } from '../../src/index';
import { vi, test, expect, describe } from 'vitest';

describe('chrome.tabs', () => {
  const tabId = 123;
  const mockTab = { id: tabId, url: 'https://example.com' };

  test('getCurrent returns a promise', async () => {
    const originalGetCurrent = chrome.tabs.getCurrent;
    chrome.tabs.getCurrent = vi.fn().mockResolvedValue(mockTab);

    const promise = chrome.tabs.getCurrent();

    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toEqual(mockTab);

    // Restore original function
    chrome.tabs.getCurrent = originalGetCurrent;
  });

  test('get with callback', () => {
    const callbackSpy = vi.fn();
    // @ts-expect-error - chrome.tabs.get is a vitest mock
    chrome.tabs.get.mockImplementation((tabId, callback) => {
      callback(mockTab);
    });

    chrome.tabs.get(tabId, callbackSpy);

    expect(chrome.tabs.get).toHaveBeenCalledWith(tabId, callbackSpy);
    expect(callbackSpy).toHaveBeenCalledWith(mockTab);
  });

  test('query returns an array of tabs', () => {
    const query = { active: true, currentWindow: true };
    const mockTabs = [mockTab];
    // @ts-expect-error - chrome.tabs.query is a vitest mock
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback(mockTabs);
    });
    const callback = vi.fn();
    chrome.tabs.query(query, callback);

    expect(chrome.tabs.query).toHaveBeenCalledWith(query, expect.any(Function));
    expect(callback).toHaveBeenCalledWith(mockTabs);
  });

  test('sendMessage supports both callback and promise modes', async () => {
    const message = { action: 'reload' };
    const callbackSpy = vi.fn();

    // Test callback mode - should call callback asynchronously with undefined
    chrome.tabs.sendMessage(tabId, message, callbackSpy);
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
      tabId,
      message,
      callbackSpy,
    );

    // Callback should be called asynchronously
    await new Promise(process.nextTick);
    expect(callbackSpy).toHaveBeenCalledWith(undefined);

    // Test promise mode - should return resolved promise
    const promise = chrome.tabs.sendMessage(tabId, message);
    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toBe(undefined);
  });

  test('onCreated event', () => {
    const listenerSpy = vi.fn();
    chrome.tabs.onCreated.addListener(listenerSpy);
    // @ts-expect-error - callListeners is a mock utility method
    chrome.tabs.onCreated.callListeners(mockTab);
    expect(listenerSpy).toHaveBeenCalledWith(mockTab);
  });
});
