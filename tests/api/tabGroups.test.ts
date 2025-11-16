import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.tabGroups', () => {
  test('namespace exists', () => {
    expect(chrome.tabGroups).toBeDefined()
    expect(typeof chrome.tabGroups).toBe('object')
  })

  test('get method exists', () => {
    expect(chrome.tabGroups.get).toBeDefined()
  })

  test('move method exists', () => {
    expect(chrome.tabGroups.move).toBeDefined()
  })

  test('query method exists', () => {
    expect(chrome.tabGroups.query).toBeDefined()
  })

  test('update method exists', () => {
    expect(chrome.tabGroups.update).toBeDefined()
  })

  test('get throws unimplemented error', () => {
    expect(() => chrome.tabGroups.get(1)).toThrow(
      'chrome.tabGroups.get is not implemented',
    )
  })

  test('move throws unimplemented error', () => {
    expect(() => chrome.tabGroups.move(1, { index: 0 })).toThrow(
      'chrome.tabGroups.move is not implemented',
    )
  })

  test('query throws unimplemented error', () => {
    expect(() => chrome.tabGroups.query({})).toThrow(
      'chrome.tabGroups.query is not implemented',
    )
  })

  test('update throws unimplemented error', () => {
    expect(() => chrome.tabGroups.update(1, {})).toThrow(
      'chrome.tabGroups.update is not implemented',
    )
  })

  test('onCreated event exists', () => {
    expect(chrome.tabGroups.onCreated).toBeDefined()
  })

  test('onMoved event exists', () => {
    expect(chrome.tabGroups.onMoved).toBeDefined()
  })

  test('onRemoved event exists', () => {
    expect(chrome.tabGroups.onRemoved).toBeDefined()
  })

  test('onUpdated event exists', () => {
    expect(chrome.tabGroups.onUpdated).toBeDefined()
  })

  test('onCreated event interface works', () => {
    const listener = () => {}
    chrome.tabGroups.onCreated.addListener(listener)
    expect(chrome.tabGroups.onCreated.hasListener(listener)).toBe(true)

    // Clean up
    chrome.tabGroups.onCreated.removeListener(listener)
  })
})
