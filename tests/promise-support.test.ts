import { chrome } from '../src/index'
import { expect, test, vi } from 'vitest';

test('promise-based function should return a promise', async () => {
  const tabId = 123;
  const mockTab = { id: tabId, url: 'https://example.com' };

  // Since chrome.tabs.get is now promise-based in our mock,
  // we can mock its resolved value.
  vi.spyOn(chrome.tabs, 'get').mockResolvedValue(mockTab);

  const promise = chrome.tabs.get(tabId);

  expect(promise).toBeInstanceOf(Promise);
  await expect(promise).resolves.toEqual(mockTab);
  expect(chrome.tabs.get).toHaveBeenCalledWith(tabId);
});
