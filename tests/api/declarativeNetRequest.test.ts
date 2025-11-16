import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.declarativeNetRequest', () => {
  const ruleOptions = {
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: 'block' as const },
        condition: {
          urlFilter: '*://example.com/*',
          resourceTypes: ['main_frame' as const],
        },
      },
    ],
  };

  const regexOptions = {
    regex: 'example\\.com',
    isCaseSensitive: false,
  };

  test('getAvailableStaticRuleCount returns a promise that rejects with unimplemented error', async () => {
    await expect(
      chrome.declarativeNetRequest.getAvailableStaticRuleCount(),
    ).rejects.toThrow(
      'chrome.declarativeNetRequest.getAvailableStaticRuleCount is not implemented',
    );
  });

  test('getDisabledRuleIds throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.getDisabledRuleIds({ ruleIds: [1, 2, 3] }),
    ).toThrow(
      'chrome.declarativeNetRequest.getDisabledRuleIds is not implemented',
    );
  });

  test('getDynamicRules throws unimplemented error', () => {
    expect(() => chrome.declarativeNetRequest.getDynamicRules()).toThrow(
      'chrome.declarativeNetRequest.getDynamicRules is not implemented',
    );
  });

  test('getEnabledRulesets returns a promise that rejects with unimplemented error', async () => {
    await expect(
      chrome.declarativeNetRequest.getEnabledRulesets(),
    ).rejects.toThrow(
      'chrome.declarativeNetRequest.getEnabledRulesets is not implemented',
    );
  });

  test('getMatchedRules throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.getMatchedRules({ tabId: 1 }),
    ).toThrow(
      'chrome.declarativeNetRequest.getMatchedRules is not implemented',
    );
  });

  test('getSessionRules throws unimplemented error', () => {
    expect(() => chrome.declarativeNetRequest.getSessionRules()).toThrow(
      'chrome.declarativeNetRequest.getSessionRules is not implemented',
    );
  });

  test('isRegexSupported throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.isRegexSupported(regexOptions),
    ).toThrow(
      'chrome.declarativeNetRequest.isRegexSupported is not implemented',
    );
  });

  test('setExtensionActionOptions throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.setExtensionActionOptions({
        displayActionCountAsBadgeText: true,
      }),
    ).toThrow(
      'chrome.declarativeNetRequest.setExtensionActionOptions is not implemented',
    );
  });

  test('testMatchOutcome throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.testMatchOutcome({
        url: 'https://example.com',
        type: 'main_frame',
      }),
    ).toThrow(
      'chrome.declarativeNetRequest.testMatchOutcome is not implemented',
    );
  });

  test('updateDynamicRules throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.updateDynamicRules(ruleOptions),
    ).toThrow(
      'chrome.declarativeNetRequest.updateDynamicRules is not implemented',
    );
  });

  test('updateEnabledRulesets throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['ruleset1'],
      }),
    ).toThrow(
      'chrome.declarativeNetRequest.updateEnabledRulesets is not implemented',
    );
  });

  test('updateSessionRules throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.updateSessionRules(ruleOptions),
    ).toThrow(
      'chrome.declarativeNetRequest.updateSessionRules is not implemented',
    );
  });

  test('updateStaticRules throws unimplemented error', () => {
    expect(() =>
      chrome.declarativeNetRequest.updateStaticRules({
        enableRulesetIds: ['ruleset1'],
      }),
    ).toThrow(
      'chrome.declarativeNetRequest.updateStaticRules is not implemented',
    );
  });

  test('onRuleMatchedDebug event interface works', () => {
    const listener = () => {};
    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(listener);
    expect(
      chrome.declarativeNetRequest.onRuleMatchedDebug.hasListener(listener),
    ).toBe(true);
    expect(chrome.declarativeNetRequest.onRuleMatchedDebug.hasListeners()).toBe(
      true,
    );

    // Test calling listeners with mock data
    const details = {
      request: { url: 'https://example.com' },
      rule: { id: 1, rulesetId: 'ruleset1' },
    };
    chrome.declarativeNetRequest.onRuleMatchedDebug.callListeners(details);

    // Clean up
    chrome.declarativeNetRequest.onRuleMatchedDebug.removeListener(listener);
    expect(
      chrome.declarativeNetRequest.onRuleMatchedDebug.hasListener(listener),
    ).toBe(false);
  });
});
