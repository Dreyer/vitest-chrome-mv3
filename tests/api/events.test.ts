import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.events', () => {
  test('namespace exists', () => {
    expect(chrome.events).toBeDefined();
    expect(typeof chrome.events).toBe('object');
  });
});
