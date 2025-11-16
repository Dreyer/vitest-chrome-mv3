import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.printingMetrics', () => {
  test('namespace exists', () => {
    expect(chrome.printingMetrics).toBeDefined();
    expect(typeof chrome.printingMetrics).toBe('object');
  });

  test('getPrintJobs method exists', () => {
    expect(chrome.printingMetrics.getPrintJobs).toBeDefined();
  });

  test('getPrintJobs returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.printingMetrics.getPrintJobs()).rejects.toThrow(
      'chrome.printingMetrics.getPrintJobs is not implemented',
    );
  });

  test('onPrintJobFinished event exists', () => {
    expect(chrome.printingMetrics.onPrintJobFinished).toBeDefined();
  });

  test('onPrintJobFinished event interface works', () => {
    const listener = () => {};
    chrome.printingMetrics.onPrintJobFinished.addListener(listener);
    expect(
      chrome.printingMetrics.onPrintJobFinished.hasListener(listener),
    ).toBe(true);

    // Clean up
    chrome.printingMetrics.onPrintJobFinished.removeListener(listener);
  });
});
