import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.readingList', () => {
  test('namespace exists', () => {
    expect(chrome.readingList).toBeDefined()
    expect(typeof chrome.readingList).toBe('object')
  })

  test('addEntry method exists', () => {
    expect(chrome.readingList.addEntry).toBeDefined()
  })

  test('query method exists', () => {
    expect(chrome.readingList.query).toBeDefined()
  })

  test('removeEntry method exists', () => {
    expect(chrome.readingList.removeEntry).toBeDefined()
  })

  test('updateEntry method exists', () => {
    expect(chrome.readingList.updateEntry).toBeDefined()
  })

  test('onEntryAdded event exists', () => {
    expect(chrome.readingList.onEntryAdded).toBeDefined()
  })

  test('onEntryRemoved event exists', () => {
    expect(chrome.readingList.onEntryRemoved).toBeDefined()
  })

  test('onEntryUpdated event exists', () => {
    expect(chrome.readingList.onEntryUpdated).toBeDefined()
  })

  test('onEntryAdded event interface works', () => {
    const listener = () => {}
    chrome.readingList.onEntryAdded.addListener(listener)
    expect(chrome.readingList.onEntryAdded.hasListener(listener)).toBe(true)

    // Clean up
    chrome.readingList.onEntryAdded.removeListener(listener)
  })
})
