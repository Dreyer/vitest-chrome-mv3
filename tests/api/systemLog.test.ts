import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.systemLog', () => {
  test('namespace exists', () => {
    expect(chrome.systemLog).toBeDefined();
    expect(typeof chrome.systemLog).toBe('object');
  });

  test('add method exists', () => {
    expect(chrome.systemLog.add).toBeDefined();
  });

  test('add throws unimplemented error', () => {
    expect(() => chrome.systemLog.add({ message: 'test' })).toThrow(
      'chrome.systemLog.add is not implemented',
    );
  });
});
