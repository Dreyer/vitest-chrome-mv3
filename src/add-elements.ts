import { createEvent } from './create-event'
import { Storage } from './vitest-chrome'
import { Mock, vi } from 'vitest'

/**
 * Namespace member data format from vitest-chrome-schema.json
 *
 * @interface SchemaData
 * @template T Type of namespace member
 */
interface SchemaData<
  T extends 'event' | 'function' | 'property'
> {
  name: string
  type: T
  isPromise?: boolean
  deprecated: string | false
  parameters: T extends 'event' | 'function'
    ? {
        name: string
        optional: boolean
        parameters: number
        type: string
      }[]
    : never[]
  value: T extends 'property' ? any : undefined
}

export const addEvent = (schema: any, target: object) => {
  const event = (...args: any[]) => {
    // @ts-expect-error - no index signature
    return event.callListeners(...args)
  }
  event.listeners = new Set<(...args: any[]) => void>()
  event.addListener = vi.fn((listener) => {
    event.listeners.add(listener)
  })
  event.removeListener = vi.fn((listener) => {
    event.listeners.delete(listener)
  })
  event.hasListener = vi.fn((listener) => {
    return event.listeners.has(listener)
  })
  event.hasListeners = vi.fn(() => {
    return event.listeners.size > 0
  })
  event.callListeners = vi.fn((...args: any[]) => {
    for (const listener of event.listeners) {
      listener(...args)
    }
  })
  event.clear = () => {
    event.listeners.clear()
    event.addListener.mockClear()
    event.removeListener.mockClear()
    event.hasListener.mockClear()
    event.hasListeners.mockClear()
    event.callListeners.mockClear()
  }
  Object.assign(target, { [schema.name]: event })
  return event
}

export const addFunction = (
  schema: any,
  target: object,
  namespace: string,
) => {
  const unimplementedError = `${namespace}.${schema.name} is not implemented`
  const fn = vi.fn((...args: any[]) => {
    if (schema.isPromise) {
      return Promise.reject(new Error(unimplementedError))
    }
    const callback = args.find((arg) => typeof arg === 'function')
    if (callback) {
      callback()
    }
    throw new Error(unimplementedError)
  })
  fn.clear = () => {
    fn.mockClear()
  }
  Object.assign(target, { [schema.name]: fn })
  return fn
}

export const addProperty = (schema: any, target: object) => {
  if (schema.name === 'storage') {
    const storage = {
      local: addStorageArea(),
      sync: addStorageArea(),
      managed: addStorageArea(),
      onChanged: addEvent({ name: 'onChanged' }, {}),
    }
    Object.assign(target, { [schema.name]: storage })
    return storage
  }

  let prop: any
  Object.defineProperty(target, schema.name, {
    get() {
      return prop
    },
    set(value) {
      prop = value
    },
  })
  // TODO: find a way to clear property value
  return prop
}

export function addStorageArea(): Storage.StorageArea {
  const area = {
    clear: vi.fn(),
    get: vi.fn(),
    getBytesInUse: vi.fn(),
    remove: vi.fn(),
    set: vi.fn((...args: any[]) => {
      const callback = args.find((arg) => typeof arg === 'function')
      if (callback) {
        callback()
      }
    }),
  }

  // Add clear method to reset all mocks (separate from the clear function)
  ;(area as any).clearAll = () => {
    area.clear.mockClear()
    area.get.mockClear()
    area.getBytesInUse.mockClear()
    area.remove.mockClear()
    area.set.mockClear()
  }

  return area
}
