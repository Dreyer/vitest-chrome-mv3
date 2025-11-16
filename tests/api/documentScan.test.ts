import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.documentScan', () => {
  test('namespace exists', () => {
    expect(chrome.documentScan).toBeDefined();
    expect(typeof chrome.documentScan).toBe('object');
  });

  test('cancelScan method exists', () => {
    expect(chrome.documentScan.cancelScan).toBeDefined();
  });

  test('closeScanner method exists', () => {
    expect(chrome.documentScan.closeScanner).toBeDefined();
  });

  test('getOptionGroups method exists', () => {
    expect(chrome.documentScan.getOptionGroups).toBeDefined();
  });

  test('getScannerList method exists', () => {
    expect(chrome.documentScan.getScannerList).toBeDefined();
  });

  test('openScanner method exists', () => {
    expect(chrome.documentScan.openScanner).toBeDefined();
  });

  test('readScanData method exists', () => {
    expect(chrome.documentScan.readScanData).toBeDefined();
  });

  test('scan method exists', () => {
    expect(chrome.documentScan.scan).toBeDefined();
  });

  test('setOptions method exists', () => {
    expect(chrome.documentScan.setOptions).toBeDefined();
  });

  test('startScan method exists', () => {
    expect(chrome.documentScan.startScan).toBeDefined();
  });
});
