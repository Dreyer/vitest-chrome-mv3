import { chrome } from '../src/index'
import { beforeEach } from 'vitest'

beforeEach(() => {
  // @ts-expect-error - reset is not a part of the chrome namespace
  chrome.reset()
})
