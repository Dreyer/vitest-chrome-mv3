import { expect, test, describe } from 'vitest'

// Import the chrome mock to trigger polyfill setup
import '../src/index'

describe('Browser API Polyfills', () => {
  test('ClipboardItem is available globally', () => {
    expect(globalThis.ClipboardItem).toBeDefined()
    expect(typeof globalThis.ClipboardItem).toBe('function')
  })

  test('ClipboardItem can be instantiated', () => {
    const data = {
      'text/plain': 'Hello World',
      'text/html': '<p>Hello World</p>'
    }

    const item = new globalThis.ClipboardItem(data)
    expect(item).toBeInstanceOf(globalThis.ClipboardItem)
    expect(item.types).toContain('text/plain')
    expect(item.types).toContain('text/html')
  })

  test('ClipboardItem handles Blob data', () => {
    const blob = new Blob(['test content'], { type: 'text/plain' })
    const data = { 'text/plain': blob }

    const item = new globalThis.ClipboardItem(data)
    expect(item.types).toContain('text/plain')
    expect(item.getType('text/plain')).toBe(blob)
  })
})
