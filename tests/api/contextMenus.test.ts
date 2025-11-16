import { chrome } from '../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.contextMenus', () => {
  const createProperties = {
    title: 'Test Menu Item',
    contexts: ['page'] as const,
    onclick: () => {},
  }

  const menuItemId = 'test-menu-item'

  const updateProperties = {
    title: 'Updated Menu Item',
  }

  test('create throws unimplemented error', () => {
    expect(() => chrome.contextMenus.create(createProperties)).toThrow(
      'chrome.contextMenus.create is not implemented',
    )
  })

  test('remove throws unimplemented error', () => {
    expect(() => chrome.contextMenus.remove(menuItemId)).toThrow(
      'chrome.contextMenus.remove is not implemented',
    )
  })

  test('removeAll returns a promise that rejects with unimplemented error', async () => {
    await expect(chrome.contextMenus.removeAll()).rejects.toThrow(
      'chrome.contextMenus.removeAll is not implemented',
    )
  })

  test('update throws unimplemented error', () => {
    expect(() =>
      chrome.contextMenus.update(menuItemId, updateProperties),
    ).toThrow('chrome.contextMenus.update is not implemented')
  })

  test('onClicked event interface works', () => {
    const listener = () => {}
    chrome.contextMenus.onClicked.addListener(listener)
    expect(chrome.contextMenus.onClicked.hasListener(listener)).toBe(true)
    expect(chrome.contextMenus.onClicked.hasListeners()).toBe(true)

    // Test calling listeners with mock data
    const clickData = {
      menuItemId: menuItemId,
      parentMenuItemId: undefined,
      mediaType: undefined,
      linkUrl: 'https://example.com',
      srcUrl: undefined,
      pageUrl: 'https://example.com',
      frameUrl: undefined,
      selectionText: 'selected text',
      editable: false,
    }
    chrome.contextMenus.onClicked.callListeners(clickData)

    // Clean up
    chrome.contextMenus.onClicked.removeListener(listener)
    expect(chrome.contextMenus.onClicked.hasListener(listener)).toBe(false)
  })
})
