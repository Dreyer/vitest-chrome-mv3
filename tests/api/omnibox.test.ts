import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.omnibox', () => {
  test('namespace exists', () => {
    expect(chrome.omnibox).toBeDefined();
    expect(typeof chrome.omnibox).toBe('object');
  });

  test('setDefaultSuggestion method exists', () => {
    expect(chrome.omnibox.setDefaultSuggestion).toBeDefined();
  });

  test('setDefaultSuggestion throws unimplemented error', () => {
    expect(() =>
      chrome.omnibox.setDefaultSuggestion({ description: 'test' }),
    ).toThrow('chrome.omnibox.setDefaultSuggestion is not implemented');
  });

  test('onDeleteSuggestion event exists', () => {
    expect(chrome.omnibox.onDeleteSuggestion).toBeDefined();
  });

  test('onInputCancelled event exists', () => {
    expect(chrome.omnibox.onInputCancelled).toBeDefined();
  });

  test('onInputChanged event exists', () => {
    expect(chrome.omnibox.onInputChanged).toBeDefined();
  });

  test('onInputEntered event exists', () => {
    expect(chrome.omnibox.onInputEntered).toBeDefined();
  });

  test('onInputStarted event exists', () => {
    expect(chrome.omnibox.onInputStarted).toBeDefined();
  });

  test('onInputChanged event interface works', () => {
    const listener = () => {};
    chrome.omnibox.onInputChanged.addListener(listener);
    expect(chrome.omnibox.onInputChanged.hasListener(listener)).toBe(true);

    // Clean up
    chrome.omnibox.onInputChanged.removeListener(listener);
  });
});
