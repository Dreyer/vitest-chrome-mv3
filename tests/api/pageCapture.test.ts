import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.pageCapture', () => {
  test('namespace exists', () => {
    expect(chrome.pageCapture).toBeDefined();
    expect(typeof chrome.pageCapture).toBe('object');
  });

  test('saveAsMHTML method exists', () => {
    expect(chrome.pageCapture.saveAsMHTML).toBeDefined();
  });

  test('saveAsMHTML throws unimplemented error', () => {
    expect(() => chrome.pageCapture.saveAsMHTML({ tabId: 1 })).toThrow(
      'chrome.pageCapture.saveAsMHTML is not implemented',
    );
  });
});
