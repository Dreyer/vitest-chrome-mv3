import { chrome } from '../../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.devtools.inspectedWindow', () => {
  test('namespace exists', () => {
    expect(chrome.devtools.inspectedWindow).toBeDefined();
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.devtools.inspectedWindow).toBeDefined();
  });

  test('tabId property exists', () => {
    expect(chrome.devtools.inspectedWindow.tabId).toBeDefined();
  });

  test('eval method exists', () => {
    expect(chrome.devtools.inspectedWindow.eval).toBeDefined();
  });

  test('getResources method exists', () => {
    expect(chrome.devtools.inspectedWindow.getResources).toBeDefined();
  });

  test('reload method exists', () => {
    expect(chrome.devtools.inspectedWindow.reload).toBeDefined();
  });

  test('onResourceAdded event exists', () => {
    expect(chrome.devtools.inspectedWindow.onResourceAdded).toBeDefined();
  });

  test('onResourceContentCommitted event exists', () => {
    expect(
      chrome.devtools.inspectedWindow.onResourceContentCommitted,
    ).toBeDefined();
  });
});
