import { chrome } from '../../src/index';
import { vi, test, expect, describe } from 'vitest';

describe('chrome.storage', () => {
  const KEY = 'testKey';
  const VALUE = { data: 'testValue' };

  describe('local', () => {
    test('set and get', () => {
      const callback = vi.fn();
      chrome.storage.local.set({ [KEY]: VALUE }, callback);
      expect(chrome.storage.local.set).toHaveBeenCalledWith(
        { [KEY]: VALUE },
        callback,
      );
      expect(callback).toHaveBeenCalled();

      const getCallback = vi.fn();
      chrome.storage.local.get(KEY, getCallback);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(KEY, getCallback);
      // This part of the test would require the mock to actually store and retrieve values.
      // For now, we are just testing if the function can be called.
    });
  });

  describe('sync', () => {
    test('set and get', () => {
      const callback = vi.fn();
      chrome.storage.sync.set({ [KEY]: VALUE }, callback);
      expect(chrome.storage.sync.set).toHaveBeenCalledWith(
        { [KEY]: VALUE },
        callback,
      );
      expect(callback).toHaveBeenCalled();

      const getCallback = vi.fn();
      chrome.storage.sync.get(KEY, getCallback);
      expect(chrome.storage.sync.get).toHaveBeenCalledWith(KEY, getCallback);
    });
  });

  test('onChanged event', () => {
    const listenerSpy = vi.fn();
    const changes = {
      [KEY]: {
        oldValue: null,
        newValue: VALUE,
      },
    };
    const areaName = 'local';

    chrome.storage.onChanged.addListener(listenerSpy);
    chrome.storage.onChanged.callListeners(changes, areaName);

    expect(listenerSpy).toHaveBeenCalledWith(changes, areaName);
  });
});
