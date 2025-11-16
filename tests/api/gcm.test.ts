import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.gcm', () => {
  const message = {
    data: { key: 'value' },
    from: 'sender-id',
    collapseKey: 'collapse-key',
  };

  test('register throws unimplemented error', () => {
    expect(() => chrome.gcm.register(['sender-id'])).toThrow(
      'chrome.gcm.register is not implemented',
    );
  });

  test('send throws unimplemented error', () => {
    expect(() => chrome.gcm.send(message)).toThrow(
      'chrome.gcm.send is not implemented',
    );
  });

  test('unregister returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.gcm.unregister()).rejects.toThrow(
      'chrome.gcm.unregister is not implemented',
    );
  });

  test('onMessage event interface works', () => {
    const listener = () => {};
    chrome.gcm.onMessage.addListener(listener);
    expect(chrome.gcm.onMessage.hasListener(listener)).toBe(true);
    expect(chrome.gcm.onMessage.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    chrome.gcm.onMessage.callListeners(message);

    // Clean up
    chrome.gcm.onMessage.removeListener(listener);
    expect(chrome.gcm.onMessage.hasListener(listener)).toBe(false);
  });

  test('onMessagesDeleted event interface works', () => {
    const listener = () => {};
    chrome.gcm.onMessagesDeleted.addListener(listener);
    expect(chrome.gcm.onMessagesDeleted.hasListener(listener)).toBe(true);

    // Clean up
    chrome.gcm.onMessagesDeleted.removeListener(listener);
  });

  test('onSendError event interface works', () => {
    const listener = () => {};
    chrome.gcm.onSendError.addListener(listener);
    expect(chrome.gcm.onSendError.hasListener(listener)).toBe(true);

    // Clean up
    chrome.gcm.onSendError.removeListener(listener);
  });
});
