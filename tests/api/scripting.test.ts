import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.scripting', () => {
  const scriptInjection = {
    target: { tabId: 1 },
    files: ['content.js'],
  };

  const cssInjection = {
    target: { tabId: 1 },
    files: ['styles.css'],
  };

  const contentScript = {
    id: 'my-script',
    js: ['content.js'],
    matches: ['*://*.example.com/*'],
  };

  test('executeScript throws unimplemented error', () => {
    expect(() => chrome.scripting.executeScript(scriptInjection)).toThrow(
      'chrome.scripting.executeScript is not implemented',
    );
  });

  test('getRegisteredContentScripts throws unimplemented error', () => {
    expect(() => chrome.scripting.getRegisteredContentScripts()).toThrow(
      'chrome.scripting.getRegisteredContentScripts is not implemented',
    );
  });

  test('insertCSS throws unimplemented error', () => {
    expect(() => chrome.scripting.insertCSS(cssInjection)).toThrow(
      'chrome.scripting.insertCSS is not implemented',
    );
  });

  test('registerContentScripts throws unimplemented error', () => {
    expect(() =>
      chrome.scripting.registerContentScripts([contentScript]),
    ).toThrow('chrome.scripting.registerContentScripts is not implemented');
  });

  test('removeCSS throws unimplemented error', () => {
    expect(() => chrome.scripting.removeCSS(cssInjection)).toThrow(
      'chrome.scripting.removeCSS is not implemented',
    );
  });

  test('unregisterContentScripts throws unimplemented error', () => {
    expect(() => chrome.scripting.unregisterContentScripts()).toThrow(
      'chrome.scripting.unregisterContentScripts is not implemented',
    );
  });

  test('updateContentScripts throws unimplemented error', () => {
    expect(() =>
      chrome.scripting.updateContentScripts([contentScript]),
    ).toThrow('chrome.scripting.updateContentScripts is not implemented');
  });
});
