import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.identity', () => {
  const tokenDetails = {
    interactive: false,
    scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  };

  const profileDetails = {
    accountStatus: 'ANY' as const,
  };

  const webAuthFlowDetails = {
    url: 'https://accounts.google.com/oauth',
    interactive: false,
  };

  const invalidTokenDetails = {
    token: 'invalid-token',
  };

  test('clearAllCachedAuthTokens returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.identity.clearAllCachedAuthTokens()).rejects.toThrow(
      'chrome.identity.clearAllCachedAuthTokens is not implemented',
    );
  });

  test('getAccounts returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.identity.getAccounts()).rejects.toThrow(
      'chrome.identity.getAccounts is not implemented',
    );
  });

  test('getAuthToken throws unimplemented error', () => {
    expect(() => chrome.identity.getAuthToken(tokenDetails)).toThrow(
      'chrome.identity.getAuthToken is not implemented',
    );
  });

  test('getProfileUserInfo throws unimplemented error', () => {
    expect(() => chrome.identity.getProfileUserInfo(profileDetails)).toThrow(
      'chrome.identity.getProfileUserInfo is not implemented',
    );
  });

  test('getRedirectURL throws unimplemented error', () => {
    expect(() => chrome.identity.getRedirectURL('/callback')).toThrow(
      'chrome.identity.getRedirectURL is not implemented',
    );
  });

  test('launchWebAuthFlow throws unimplemented error', () => {
    expect(() => chrome.identity.launchWebAuthFlow(webAuthFlowDetails)).toThrow(
      'chrome.identity.launchWebAuthFlow is not implemented',
    );
  });

  test('removeCachedAuthToken throws unimplemented error', () => {
    expect(() =>
      chrome.identity.removeCachedAuthToken(invalidTokenDetails),
    ).toThrow('chrome.identity.removeCachedAuthToken is not implemented');
  });

  test('onSignInChanged event interface works', () => {
    const listener = () => {};
    chrome.identity.onSignInChanged.addListener(listener);
    expect(chrome.identity.onSignInChanged.hasListener(listener)).toBe(true);
    expect(chrome.identity.onSignInChanged.hasListeners()).toBe(true);

    // Test calling listeners with mock data
    const accountInfo = {
      id: 'user@example.com',
    };
    chrome.identity.onSignInChanged.callListeners(accountInfo, true);

    // Clean up
    chrome.identity.onSignInChanged.removeListener(listener);
    expect(chrome.identity.onSignInChanged.hasListener(listener)).toBe(false);
  });
});
