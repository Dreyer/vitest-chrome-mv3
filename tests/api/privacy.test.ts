import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.privacy', () => {
  test('namespace exists', () => {
    expect(chrome.privacy).toBeDefined();
    expect(typeof chrome.privacy).toBe('object');
  });
});
