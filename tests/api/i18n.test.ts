import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.i18n', () => {
  test('detectLanguage throws unimplemented error', () => {
    expect(() => chrome.i18n.detectLanguage('Hello world')).toThrow(
      'chrome.i18n.detectLanguage is not implemented',
    );
  });

  test('getAcceptLanguages returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.i18n.getAcceptLanguages()).rejects.toThrow(
      'chrome.i18n.getAcceptLanguages is not implemented',
    );
  });

  test('getMessage throws unimplemented error', () => {
    expect(() => chrome.i18n.getMessage('helloWorld')).toThrow(
      'chrome.i18n.getMessage is not implemented',
    );
  });

  test('getMessage with substitutions throws unimplemented error', () => {
    expect(() => chrome.i18n.getMessage('helloUser', ['John'])).toThrow(
      'chrome.i18n.getMessage is not implemented',
    );
  });

  test('getMessage with options throws unimplemented error', () => {
    expect(() =>
      chrome.i18n.getMessage('helloWorld', undefined, { escapeLt: true }),
    ).toThrow('chrome.i18n.getMessage is not implemented');
  });

  test('getUILanguage throws unimplemented error', () => {
    expect(() => chrome.i18n.getUILanguage()).toThrow(
      'chrome.i18n.getUILanguage is not implemented',
    );
  });
});
