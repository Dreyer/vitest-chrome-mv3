import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.types', () => {
  test('namespace exists', () => {
    expect(chrome.types).toBeDefined();
    expect(typeof chrome.types).toBe('object');
  });
});
