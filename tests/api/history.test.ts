import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.history', () => {
  const urlDetails = {
    url: 'https://example.com',
  };

  const searchQuery = {
    text: 'example',
    maxResults: 10,
  };

  const range = {
    startTime: Date.now() - 86400000, // 24 hours ago
    endTime: Date.now(),
  };

  test('addUrl throws unimplemented error', () => {
    expect(() => chrome.history.addUrl(urlDetails)).toThrow(
      'chrome.history.addUrl is not implemented',
    );
  });

  test('deleteAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.history.deleteAll()).rejects.toThrow(
      'chrome.history.deleteAll is not implemented',
    );
  });

  test('deleteRange throws unimplemented error', () => {
    expect(() => chrome.history.deleteRange(range)).toThrow(
      'chrome.history.deleteRange is not implemented',
    );
  });

  test('deleteUrl throws unimplemented error', () => {
    expect(() => chrome.history.deleteUrl(urlDetails)).toThrow(
      'chrome.history.deleteUrl is not implemented',
    );
  });

  test('getVisits throws unimplemented error', () => {
    expect(() => chrome.history.getVisits(urlDetails)).toThrow(
      'chrome.history.getVisits is not implemented',
    );
  });

  test('search throws unimplemented error', () => {
    expect(() => chrome.history.search(searchQuery)).toThrow(
      'chrome.history.search is not implemented',
    );
  });

  test('onVisited event interface works', () => {
    const listener = () => {};
    chrome.history.onVisited.addListener(listener);
    expect(chrome.history.onVisited.hasListener(listener)).toBe(true);
    expect(chrome.history.onVisited.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    const visitItem = {
      id: '123',
      url: 'https://example.com',
      title: 'Example',
      visitCount: 1,
      typedCount: 0,
      lastVisitTime: Date.now(),
    };
    chrome.history.onVisited.callListeners(visitItem);

    // Clean up
    chrome.history.onVisited.removeListener(listener);
    expect(chrome.history.onVisited.hasListener(listener)).toBe(false);
  });

  test('onVisitRemoved event interface works', () => {
    const listener = () => {};
    chrome.history.onVisitRemoved.addListener(listener);
    expect(chrome.history.onVisitRemoved.hasListener(listener)).toBe(true);

    // Test calling listeners with mock data
    const removedInfo = {
      allHistory: false,
      urls: ['https://example.com'],
    };
    chrome.history.onVisitRemoved.callListeners(removedInfo);

    // Clean up
    chrome.history.onVisitRemoved.removeListener(listener);
  });
});
