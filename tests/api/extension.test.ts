import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.extension', () => {
  test('namespace exists', () => {
    expect(chrome.extension).toBeDefined();
    expect(typeof chrome.extension).toBe('object');
  });

  test('getBackgroundPage method exists', () => {
    expect(chrome.extension.getBackgroundPage).toBeDefined();
  });

  test('getViews method exists', () => {
    expect(chrome.extension.getViews).toBeDefined();
  });

  test('isAllowedFileSchemeAccess method exists', () => {
    expect(chrome.extension.isAllowedFileSchemeAccess).toBeDefined();
  });

  test('isAllowedIncognitoAccess method exists', () => {
    expect(chrome.extension.isAllowedIncognitoAccess).toBeDefined();
  });

  test('setUpdateUrlData method exists', () => {
    expect(chrome.extension.setUpdateUrlData).toBeDefined();
  });

  test('isAllowedFileSchemeAccess returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.extension.isAllowedFileSchemeAccess()).rejects.toThrow(
      'chrome.extension.isAllowedFileSchemeAccess is not implemented',
    );
  });

  test('isAllowedIncognitoAccess returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.extension.isAllowedIncognitoAccess()).rejects.toThrow(
      'chrome.extension.isAllowedIncognitoAccess is not implemented',
    );
  });
});
