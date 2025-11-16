import { chrome } from '../../../src/index'
import { describe, test, expect } from 'vitest'

describe('chrome.input.ime', () => {
  test('namespace exists', () => {
    expect(chrome.input.ime).toBeDefined()
    // For unknown namespaces, we create proxies that support both object and function access
    expect(chrome.input.ime).toBeDefined()
  })

  test('clearComposition method exists', () => {
    expect(chrome.input.ime.clearComposition).toBeDefined()
  })

  test('commitText method exists', () => {
    expect(chrome.input.ime.commitText).toBeDefined()
  })

  test('deleteSurroundingText method exists', () => {
    expect(chrome.input.ime.deleteSurroundingText).toBeDefined()
  })

  test('hideInputView method exists', () => {
    expect(chrome.input.ime.hideInputView).toBeDefined()
  })

  test('keyEventHandled method exists', () => {
    expect(chrome.input.ime.keyEventHandled).toBeDefined()
  })

  test('sendKeyEvents method exists', () => {
    expect(chrome.input.ime.sendKeyEvents).toBeDefined()
  })

  test('setAssistiveWindowButtonHighlighted method exists', () => {
    expect(chrome.input.ime.setAssistiveWindowButtonHighlighted).toBeDefined()
  })

  test('setAssistiveWindowProperties method exists', () => {
    expect(chrome.input.ime.setAssistiveWindowProperties).toBeDefined()
  })

  test('setCandidates method exists', () => {
    expect(chrome.input.ime.setCandidates).toBeDefined()
  })

  test('setCandidateWindowProperties method exists', () => {
    expect(chrome.input.ime.setCandidateWindowProperties).toBeDefined()
  })

  test('setComposition method exists', () => {
    expect(chrome.input.ime.setComposition).toBeDefined()
  })

  test('setCursorPosition method exists', () => {
    expect(chrome.input.ime.setCursorPosition).toBeDefined()
  })

  test('setMenuItems method exists', () => {
    expect(chrome.input.ime.setMenuItems).toBeDefined()
  })

  test('updateMenuItems method exists', () => {
    expect(chrome.input.ime.updateMenuItems).toBeDefined()
  })

  test('onActivate event exists', () => {
    expect(chrome.input.ime.onActivate).toBeDefined()
  })

  test('onAssistiveWindowButtonClicked event exists', () => {
    expect(chrome.input.ime.onAssistiveWindowButtonClicked).toBeDefined()
  })

  test('onBlur event exists', () => {
    expect(chrome.input.ime.onBlur).toBeDefined()
  })

  test('onCandidateClicked event exists', () => {
    expect(chrome.input.ime.onCandidateClicked).toBeDefined()
  })

  test('onDeactivated event exists', () => {
    expect(chrome.input.ime.onDeactivated).toBeDefined()
  })

  test('onFocus event exists', () => {
    expect(chrome.input.ime.onFocus).toBeDefined()
  })

  test('onInputContextUpdate event exists', () => {
    expect(chrome.input.ime.onInputContextUpdate).toBeDefined()
  })

  test('onKeyEvent event exists', () => {
    expect(chrome.input.ime.onKeyEvent).toBeDefined()
  })

  test('onMenuItemActivated event exists', () => {
    expect(chrome.input.ime.onMenuItemActivated).toBeDefined()
  })

  test('onReset event exists', () => {
    expect(chrome.input.ime.onReset).toBeDefined()
  })

  test('onSurroundingTextChanged event exists', () => {
    expect(chrome.input.ime.onSurroundingTextChanged).toBeDefined()
  })

  test('onActivate event interface works', () => {
    const listener = () => {}
    chrome.input.ime.onActivate.addListener(listener)
    expect(chrome.input.ime.onActivate.hasListener(listener)).toBe(true)
    expect(chrome.input.ime.onActivate.hasListeners()).toBe(true)

    // Clean up
    chrome.input.ime.onActivate.removeListener(listener)
    expect(chrome.input.ime.onActivate.hasListener(listener)).toBe(false)
  })
})
