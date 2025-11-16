import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.topSites', () => {
  test('get returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.topSites.get()).rejects.toThrow(
      'chrome.topSites.get is not implemented',
    );
  });
});
