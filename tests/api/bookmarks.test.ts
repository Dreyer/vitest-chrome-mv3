import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.bookmarks', () => {
  const bookmark = {
    id: '1',
    title: 'Test Bookmark',
    url: 'https://example.com',
  };

  test('create throws unimplemented error', () => {
    expect(() =>
      chrome.bookmarks.create({
        title: bookmark.title,
        url: bookmark.url,
      }),
    ).toThrow('chrome.bookmarks.create is not implemented');
  });

  test('get throws unimplemented error', () => {
    expect(() => chrome.bookmarks.get(bookmark.id)).toThrow(
      'chrome.bookmarks.get is not implemented',
    );
  });

  test('getChildren throws unimplemented error', () => {
    expect(() => chrome.bookmarks.getChildren(bookmark.id)).toThrow(
      'chrome.bookmarks.getChildren is not implemented',
    );
  });

  test('getRecent throws unimplemented error', () => {
    expect(() => chrome.bookmarks.getRecent(10)).toThrow(
      'chrome.bookmarks.getRecent is not implemented',
    );
  });

  test('getSubTree throws unimplemented error', () => {
    expect(() => chrome.bookmarks.getSubTree(bookmark.id)).toThrow(
      'chrome.bookmarks.getSubTree is not implemented',
    );
  });

  test('getTree returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.bookmarks.getTree()).rejects.toThrow(
      'chrome.bookmarks.getTree is not implemented',
    );
  });

  test('move throws unimplemented error', () => {
    expect(() =>
      chrome.bookmarks.move(bookmark.id, { parentId: 'parent123' }),
    ).toThrow('chrome.bookmarks.move is not implemented');
  });

  test('remove throws unimplemented error', () => {
    expect(() => chrome.bookmarks.remove(bookmark.id)).toThrow(
      'chrome.bookmarks.remove is not implemented',
    );
  });

  test('search throws unimplemented error', () => {
    expect(() => chrome.bookmarks.search('test')).toThrow(
      'chrome.bookmarks.search is not implemented',
    );
  });

  test('onChanged event interface works', () => {
    const listener = () => {};
    chrome.bookmarks.onChanged.addListener(listener);
    expect(chrome.bookmarks.onChanged.hasListener(listener)).toBe(true);
    expect(chrome.bookmarks.onChanged.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    const changes = { id: '123', changeInfo: {} };
    chrome.bookmarks.onChanged.callListeners(changes);

    // Clean up
    chrome.bookmarks.onChanged.removeListener(listener);
    expect(chrome.bookmarks.onChanged.hasListener(listener)).toBe(false);
  });

  test('onChildrenReordered event interface works', () => {
    const listener = () => {};
    chrome.bookmarks.onChildrenReordered.addListener(listener);
    expect(chrome.bookmarks.onChildrenReordered.hasListener(listener)).toBe(
      true,
    );

    // Clean up
    chrome.bookmarks.onChildrenReordered.removeListener(listener);
  });
});
