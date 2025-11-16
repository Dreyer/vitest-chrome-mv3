import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.management', () => {
  const extensionId = 'abcdefghijklmnopabcdefghijklmnop';
  const manifestStr = '{"name": "Test Extension", "version": "1.0"}';

  test('createAppShortcut throws unimplemented error', () => {
    expect(() => chrome.management.createAppShortcut(extensionId)).toThrow(
      'chrome.management.createAppShortcut is not implemented',
    );
  });

  test('generateAppForLink throws unimplemented error', () => {
    expect(() =>
      chrome.management.generateAppForLink('https://example.com', 'Example'),
    ).toThrow('chrome.management.generateAppForLink is not implemented');
  });

  test('get throws unimplemented error', () => {
    expect(() => chrome.management.get(extensionId)).toThrow(
      'chrome.management.get is not implemented',
    );
  });

  test('getAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.management.getAll()).rejects.toThrow(
      'chrome.management.getAll is not implemented',
    );
  });

  test('getPermissionWarningsById throws unimplemented error', () => {
    expect(() =>
      chrome.management.getPermissionWarningsById(extensionId),
    ).toThrow('chrome.management.getPermissionWarningsById is not implemented');
  });

  test('getPermissionWarningsByManifest throws unimplemented error', () => {
    expect(() =>
      chrome.management.getPermissionWarningsByManifest(manifestStr),
    ).toThrow(
      'chrome.management.getPermissionWarningsByManifest is not implemented',
    );
  });

  test('getSelf returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.management.getSelf()).rejects.toThrow(
      'chrome.management.getSelf is not implemented',
    );
  });

  test('installReplacementWebApp returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.management.installReplacementWebApp()).rejects.toThrow(
      'chrome.management.installReplacementWebApp is not implemented',
    );
  });

  test('launchApp throws unimplemented error', () => {
    expect(() => chrome.management.launchApp(extensionId)).toThrow(
      'chrome.management.launchApp is not implemented',
    );
  });

  test('setEnabled throws unimplemented error', () => {
    expect(() => chrome.management.setEnabled(extensionId, true)).toThrow(
      'chrome.management.setEnabled is not implemented',
    );
  });

  test('setLaunchType throws unimplemented error', () => {
    expect(() =>
      chrome.management.setLaunchType(extensionId, 'OPEN_AS_WINDOW'),
    ).toThrow('chrome.management.setLaunchType is not implemented');
  });

  test('uninstall throws unimplemented error', () => {
    expect(() =>
      chrome.management.uninstall(extensionId, { showConfirmDialog: true }),
    ).toThrow('chrome.management.uninstall is not implemented');
  });

  test('uninstallSelf throws unimplemented error', () => {
    expect(() =>
      chrome.management.uninstallSelf({ showConfirmDialog: true }),
    ).toThrow('chrome.management.uninstallSelf is not implemented');
  });

  test('onDisabled event interface works', () => {
    const listener = () => {};
    chrome.management.onDisabled.addListener(listener);
    expect(chrome.management.onDisabled.hasListener(listener)).toBe(true);
    expect(chrome.management.onDisabled.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    const extensionInfo = {
      id: extensionId,
      name: 'Test Extension',
      enabled: false,
    };
    chrome.management.onDisabled.callListeners(extensionInfo);

    // Clean up
    chrome.management.onDisabled.removeListener(listener);
    expect(chrome.management.onDisabled.hasListener(listener)).toBe(false);
  });

  test('onEnabled event interface works', () => {
    const listener = () => {};
    chrome.management.onEnabled.addListener(listener);
    expect(chrome.management.onEnabled.hasListener(listener)).toBe(true);

    // Clean up
    chrome.management.onEnabled.removeListener(listener);
  });

  test('onInstalled event interface works', () => {
    const listener = () => {};
    chrome.management.onInstalled.addListener(listener);
    expect(chrome.management.onInstalled.hasListener(listener)).toBe(true);

    // Clean up
    chrome.management.onInstalled.removeListener(listener);
  });

  test('onUninstalled event interface works', () => {
    const listener = () => {};
    chrome.management.onUninstalled.addListener(listener);
    expect(chrome.management.onUninstalled.hasListener(listener)).toBe(true);

    // Clean up
    chrome.management.onUninstalled.removeListener(listener);
  });
});
