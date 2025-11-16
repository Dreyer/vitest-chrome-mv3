import { chrome } from '../../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.system.display', () => {
  test('namespace exists', () => {
    expect(chrome.system.display).toBeDefined();
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.system.display).toBeDefined();
  });

  test('clearTouchCalibration method exists', () => {
    expect(chrome.system.display.clearTouchCalibration).toBeDefined();
  });

  test('completeCustomTouchCalibration method exists', () => {
    expect(chrome.system.display.completeCustomTouchCalibration).toBeDefined();
  });

  test('enableUnifiedDesktop method exists', () => {
    expect(chrome.system.display.enableUnifiedDesktop).toBeDefined();
  });

  test('getDisplayLayout method exists', () => {
    expect(chrome.system.display.getDisplayLayout).toBeDefined();
  });

  test('getInfo method exists', () => {
    expect(chrome.system.display.getInfo).toBeDefined();
  });

  test('overscanCalibrationAdjust method exists', () => {
    expect(chrome.system.display.overscanCalibrationAdjust).toBeDefined();
  });

  test('overscanCalibrationComplete method exists', () => {
    expect(chrome.system.display.overscanCalibrationComplete).toBeDefined();
  });

  test('overscanCalibrationReset method exists', () => {
    expect(chrome.system.display.overscanCalibrationReset).toBeDefined();
  });

  test('overscanCalibrationStart method exists', () => {
    expect(chrome.system.display.overscanCalibrationStart).toBeDefined();
  });

  test('setDisplayLayout method exists', () => {
    expect(chrome.system.display.setDisplayLayout).toBeDefined();
  });

  test('setDisplayProperties method exists', () => {
    expect(chrome.system.display.setDisplayProperties).toBeDefined();
  });

  test('setMirrorMode method exists', () => {
    expect(chrome.system.display.setMirrorMode).toBeDefined();
  });

  test('showNativeTouchCalibration method exists', () => {
    expect(chrome.system.display.showNativeTouchCalibration).toBeDefined();
  });

  test('startCustomTouchCalibration method exists', () => {
    expect(chrome.system.display.startCustomTouchCalibration).toBeDefined();
  });
});
