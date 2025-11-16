import { chrome } from '../../src/index';
import { describe, test, expect } from 'vitest';

describe('chrome.platformKeys', () => {
  test('namespace exists', () => {
    expect(chrome.platformKeys).toBeDefined();
    expect(typeof chrome.platformKeys).toBe('object');
  });

  test('getKeyPair method exists', () => {
    expect(chrome.platformKeys.getKeyPair).toBeDefined();
  });

  test('getKeyPairBySpki method exists', () => {
    expect(chrome.platformKeys.getKeyPairBySpki).toBeDefined();
  });

  test('selectClientCertificates method exists', () => {
    expect(chrome.platformKeys.selectClientCertificates).toBeDefined();
  });

  test('subtleCrypto method exists', () => {
    expect(chrome.platformKeys.subtleCrypto).toBeDefined();
  });

  test('verifyTLSServerCertificate method exists', () => {
    expect(chrome.platformKeys.verifyTLSServerCertificate).toBeDefined();
  });
});
