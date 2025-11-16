import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.printing', () => {
  test('namespace exists', () => {
    expect(chrome.printing).toBeDefined();
    expect(typeof chrome.printing).toBe('object');
  });

  test('cancelJob method exists', () => {
    expect(chrome.printing.cancelJob).toBeDefined();
  });

  test('getJobStatus method exists', () => {
    expect(chrome.printing.getJobStatus).toBeDefined();
  });

  test('getPrinterInfo method exists', () => {
    expect(chrome.printing.getPrinterInfo).toBeDefined();
  });

  test('getPrinters method exists', () => {
    expect(chrome.printing.getPrinters).toBeDefined();
  });

  test('submitJob method exists', () => {
    expect(chrome.printing.submitJob).toBeDefined();
  });

  test('getPrinters returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.printing.getPrinters()).rejects.toThrow(
      'chrome.printing.getPrinters is not implemented',
    );
  });

  test('onJobStatusChanged event exists', () => {
    expect(chrome.printing.onJobStatusChanged).toBeDefined();
  });

  test('onJobStatusChanged event interface works', () => {
    const listener = () => {};
    chrome.printing.onJobStatusChanged.addListener(listener);
    expect(chrome.printing.onJobStatusChanged.hasListener(listener)).toBe(true);

    // Clean up
    chrome.printing.onJobStatusChanged.removeListener(listener);
  });
});
