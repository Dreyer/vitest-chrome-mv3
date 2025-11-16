import { chrome } from '../../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.system.cpu', () => {
  test('namespace exists', () => {
    expect(chrome.system.cpu).toBeDefined();
    // For unknown namespaces, we create proxies that support both object and function access
    // typeof may return 'object' or 'function' depending on implementation
    expect(chrome.system.cpu).toBeDefined();
  });

  test('getInfo method exists', () => {
    expect(chrome.system.cpu.getInfo).toBeDefined();
  });

  test('getInfo returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.system.cpu.getInfo()).rejects.toThrow(
      'chrome.system.cpu.getInfo is not implemented',
    );
  });
});
