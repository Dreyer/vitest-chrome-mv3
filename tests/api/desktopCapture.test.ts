import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.desktopCapture', () => {
  test('namespace exists', () => {
    expect(chrome.desktopCapture).toBeDefined();
    expect(typeof chrome.desktopCapture).toBe('object');
  });

  test('cancelChooseDesktopMedia method exists', () => {
    expect(chrome.desktopCapture.cancelChooseDesktopMedia).toBeDefined();
  });

  test('chooseDesktopMedia method exists', () => {
    expect(chrome.desktopCapture.chooseDesktopMedia).toBeDefined();
  });

  test('cancelChooseDesktopMedia throws unimplemented error', () => {
    expect(() => chrome.desktopCapture.cancelChooseDesktopMedia(1)).toThrow(
      'chrome.desktopCapture.cancelChooseDesktopMedia is not implemented',
    );
  });

  test('chooseDesktopMedia throws unimplemented error', () => {
    expect(() =>
      chrome.desktopCapture.chooseDesktopMedia(['screen'], () => {}),
    ).toThrow('chrome.desktopCapture.chooseDesktopMedia is not implemented');
  });
});
