import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.vpnProvider', () => {
  test('namespace exists', () => {
    expect(chrome.vpnProvider).toBeDefined();
    expect(typeof chrome.vpnProvider).toBe('object');
  });

  test('createConfig method exists', () => {
    expect(chrome.vpnProvider.createConfig).toBeDefined();
  });

  test('destroyConfig method exists', () => {
    expect(chrome.vpnProvider.destroyConfig).toBeDefined();
  });

  test('notifyConnectionStateChanged method exists', () => {
    expect(chrome.vpnProvider.notifyConnectionStateChanged).toBeDefined();
  });

  test('sendPacket method exists', () => {
    expect(chrome.vpnProvider.sendPacket).toBeDefined();
  });

  test('setParameters method exists', () => {
    expect(chrome.vpnProvider.setParameters).toBeDefined();
  });

  test('onConfigCreated event exists', () => {
    expect(chrome.vpnProvider.onConfigCreated).toBeDefined();
  });

  test('onConfigRemoved event exists', () => {
    expect(chrome.vpnProvider.onConfigRemoved).toBeDefined();
  });

  test('onPacketReceived event exists', () => {
    expect(chrome.vpnProvider.onPacketReceived).toBeDefined();
  });

  test('onPlatformMessage event exists', () => {
    expect(chrome.vpnProvider.onPlatformMessage).toBeDefined();
  });

  test('onUIEvent event exists', () => {
    expect(chrome.vpnProvider.onUIEvent).toBeDefined();
  });

  test('onConfigCreated event interface works', () => {
    const listener = () => {};
    chrome.vpnProvider.onConfigCreated.addListener(listener);
    expect(chrome.vpnProvider.onConfigCreated.hasListener(listener)).toBe(true);

    // Clean up
    chrome.vpnProvider.onConfigCreated.removeListener(listener);
  });
});
