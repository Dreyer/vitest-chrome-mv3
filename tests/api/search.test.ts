import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.search', () => {
  const queryInfo = {
    text: 'search query',
    disposition: 'NEW_TAB' as const,
  };

  test('query throws unimplemented error', () => {
    expect(() => chrome.search.query(queryInfo)).toThrow(
      'chrome.search.query is not implemented',
    );
  });
});
