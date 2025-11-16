import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.offscreen', () => {
  test('namespace exists', () => {
    expect(chrome.offscreen).toBeDefined();
    expect(typeof chrome.offscreen).toBe('object');
  });

  test('closeDocument method exists', () => {
    expect(chrome.offscreen.closeDocument).toBeDefined();
  });

  test('createDocument method exists', () => {
    expect(chrome.offscreen.createDocument).toBeDefined();
  });

  test('closeDocument returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.offscreen.closeDocument()).rejects.toThrow(
      'chrome.offscreen.closeDocument is not implemented',
    );
  });

  test('createDocument throws unimplemented error', () => {
    expect(() =>
      chrome.offscreen.createDocument({ url: 'test.html', reasons: [] }),
    ).toThrow('chrome.offscreen.createDocument is not implemented');
  });
});
