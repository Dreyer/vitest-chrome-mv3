import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.fontSettings', () => {
  test('namespace exists', () => {
    expect(chrome.fontSettings).toBeDefined();
    expect(typeof chrome.fontSettings).toBe('object');
  });

  test('clearDefaultFixedFontSize method exists', () => {
    expect(chrome.fontSettings.clearDefaultFixedFontSize).toBeDefined();
  });

  test('clearDefaultFontSize method exists', () => {
    expect(chrome.fontSettings.clearDefaultFontSize).toBeDefined();
  });

  test('clearFont method exists', () => {
    expect(chrome.fontSettings.clearFont).toBeDefined();
  });

  test('clearMinimumFontSize method exists', () => {
    expect(chrome.fontSettings.clearMinimumFontSize).toBeDefined();
  });

  test('getDefaultFixedFontSize method exists', () => {
    expect(chrome.fontSettings.getDefaultFixedFontSize).toBeDefined();
  });

  test('getDefaultFontSize method exists', () => {
    expect(chrome.fontSettings.getDefaultFontSize).toBeDefined();
  });

  test('getFont method exists', () => {
    expect(chrome.fontSettings.getFont).toBeDefined();
  });

  test('getFontList method exists', () => {
    expect(chrome.fontSettings.getFontList).toBeDefined();
  });

  test('getMinimumFontSize method exists', () => {
    expect(chrome.fontSettings.getMinimumFontSize).toBeDefined();
  });

  test('setDefaultFixedFontSize method exists', () => {
    expect(chrome.fontSettings.setDefaultFixedFontSize).toBeDefined();
  });

  test('setDefaultFontSize method exists', () => {
    expect(chrome.fontSettings.setDefaultFontSize).toBeDefined();
  });

  test('setFont method exists', () => {
    expect(chrome.fontSettings.setFont).toBeDefined();
  });

  test('setMinimumFontSize method exists', () => {
    expect(chrome.fontSettings.setMinimumFontSize).toBeDefined();
  });

  test('onDefaultFixedFontSizeChanged event exists', () => {
    expect(chrome.fontSettings.onDefaultFixedFontSizeChanged).toBeDefined();
  });

  test('onDefaultFontSizeChanged event exists', () => {
    expect(chrome.fontSettings.onDefaultFontSizeChanged).toBeDefined();
  });

  test('onFontChanged event exists', () => {
    expect(chrome.fontSettings.onFontChanged).toBeDefined();
  });

  test('onMinimumFontSizeChanged event exists', () => {
    expect(chrome.fontSettings.onMinimumFontSizeChanged).toBeDefined();
  });
});
