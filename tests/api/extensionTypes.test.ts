import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.extensionTypes', () => {
  test('namespace exists', () => {
    expect(chrome.extensionTypes).toBeDefined();
    expect(typeof chrome.extensionTypes).toBe('object');
  });
});
