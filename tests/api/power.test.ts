import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.power', () => {
  test('releaseKeepAwake throws unimplemented error', () => {
    expect(() => chrome.power.releaseKeepAwake()).toThrow(
      'chrome.power.releaseKeepAwake is not implemented',
    );
  });

  test('reportActivity returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.power.reportActivity()).rejects.toThrow(
      'chrome.power.reportActivity is not implemented',
    );
  });

  test('requestKeepAwake throws unimplemented error', () => {
    expect(() => chrome.power.requestKeepAwake('display')).toThrow(
      'chrome.power.requestKeepAwake is not implemented',
    );
  });
});
