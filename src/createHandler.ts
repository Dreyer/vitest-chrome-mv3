import { vi } from 'vitest'
import vitestChromeSchema from './vitest-chrome-schema.json'
import {
  addEvent,
  addFunction,
  addProperty,
  addStorageArea,
} from './add-elements'
import { VitestChrome } from './vitest-chrome'

export function createHandler(
  schema: any = vitestChromeSchema as any,
  namespace = 'chrome',
): ProxyHandler<VitestChrome> & { clear(): void } {
  const mocks = new Set<() => void>()
  const handler: ProxyHandler<VitestChrome> & {
    clear: () => void
    apply?: (target: any, thisArg: any, argArray: any[]) => any
  } = {
    clear: () => {},
    ownKeys() {
      return schema ? Reflect.ownKeys(schema) : []
    },
    getOwnPropertyDescriptor(target, prop) {
      if (schema && prop in schema) {
        return {
          enumerable: true,
          configurable: true,
        }
      } else {
        return {
          enumerable: false,
          configurable: true,
        }
      }
    },
    set(target, key, value) {
      if (
        key in schema &&
        key === 'lastError' &&
        !(
          typeof value === 'object' &&
          typeof value?.message === 'string'
        )
      ) {
        throw new TypeError(
          'chrome.runtime.lastError should be type { message: string }',
        )
      }
      return Reflect.set(target, key, value)
    },
    deleteProperty(target, key) {
      // Mark property as deleted, so it won't be retrieved from the schema
      return Reflect.set(target, key, null)
    },
    has(target, key) {
      const inTarget = key in target && Reflect.get(target, key)
      return inTarget !== null && !!inTarget
    },
    get(target, key) {
      // Check if key exists on target (works for both objects and functions)
      const hasKey = Reflect.has(target, key)
      if (hasKey) {
        const value = Reflect.get(target, key)
        // Check that the value wasn't deleted
        return value !== null ? value : undefined
      }
      
      // If schema is undefined, create mocks based on property name
      // For namespaces, create a proxy (object). For methods/events, create callable functions/events
      if (!schema) {
        const keyStr = String(key)
        const nestedNamespace = `${namespace}.${keyStr}`
        
        // Check if this looks like an event (starts with 'on' and has uppercase 3rd char)
        if (keyStr.startsWith('on') && keyStr.length > 2 && keyStr[2] === keyStr[2].toUpperCase()) {
          // Event
          const event = addEvent({ name: keyStr, type: 'event', parameters: [] }, target)
          if (typeof event.clear === 'function') {
            mocks.add(event.clear)
          }
          return event
        } else {
          // For unknown properties, we can't distinguish between namespaces and methods
          // Create a proxy (object) that can also be called as a function
          // This allows chrome.system.cpu to be an object, and chrome.system.cpu.getInfo() to work
          const targetObj: any = {}
          const proxyHandler = createHandler(undefined, nestedNamespace)
          
          // Create a callable function for when it's used as a method
          const callableFn = vi.fn((...args: any[]) => {
            const hasCallback = args.some((arg) => typeof arg === 'function')
            if (!hasCallback) {
              return Promise.reject(
                new Error(`${nestedNamespace} is not implemented`),
              )
            }
            throw new Error(`${nestedNamespace} is not implemented`)
          })
          ;(callableFn as any).clear = () => {
            callableFn.mockClear()
          }
          
          // Create a proxy that acts as an object but can be called
          // Store created mocks on targetObj so they persist across accesses
          const combinedProxy = new Proxy(targetObj, {
            get(target, prop, receiver) {
              // First check if the property already exists on targetObj
              const hasKey = Reflect.has(targetObj, prop)
              if (hasKey) {
                const value = Reflect.get(targetObj, prop)
                return value !== null ? value : undefined
              }
              // Delegate to proxyHandler's get method, which will create callable functions/events for methods
              // Use targetObj as the target so mocks are stored and reused
              if (proxyHandler.get) {
                const result = proxyHandler.get(targetObj, prop, receiver)
                // The result should already be stored on targetObj by addEvent/addFunction
                // But ensure it's there for consistency
                if (result !== undefined && !Reflect.has(targetObj, prop)) {
                  Object.assign(targetObj, { [prop]: result })
                }
                return result
              }
              return undefined
            },
            apply(target, thisArg, argArray) {
              // When called as a function, use the callable function
              return callableFn(...argArray)
            },
            // Make typeof return 'object' by using an object as target
            getPrototypeOf() {
              return Object.prototype
            },
            ownKeys(target) {
              return proxyHandler.ownKeys ? proxyHandler.ownKeys(targetObj) : []
            },
            getOwnPropertyDescriptor(target, prop) {
              return proxyHandler.getOwnPropertyDescriptor
                ? proxyHandler.getOwnPropertyDescriptor(targetObj, prop)
                : { enumerable: true, configurable: true }
            },
            has(target, key) {
              return proxyHandler.has ? proxyHandler.has(targetObj, key) : false
            },
            set(target, key, value, receiver) {
              return proxyHandler.set ? proxyHandler.set(targetObj, key, value, receiver) : true
            },
            deleteProperty(target, key) {
              return proxyHandler.deleteProperty
                ? proxyHandler.deleteProperty(targetObj, key)
                : true
            },
          })
          Object.assign(target, { [key]: combinedProxy })
          mocks.add((callableFn as any).clear)
          return combinedProxy
        }
      }
      
      if (schema && key in schema) {
        let mockedElement: any
        switch (schema[key].type) {
          case 'event':
            mockedElement = addEvent(schema[key], target)
            break
          case 'function':
            mockedElement = addFunction(schema[key], target, namespace)
            break
          case 'property':
            mockedElement = addProperty(schema[key], target)
            break
          // default is namespace
          default: {
            // Special handling for storage API (only at chrome.storage, not chrome.system.storage, etc.)
            if (key === 'storage' && namespace === 'chrome') {
              const localArea = addStorageArea()
              const syncArea = addStorageArea()
              const managedArea = addStorageArea()
              const onChangedEvent = addEvent({ name: 'onChanged', type: 'event', parameters: [] }, {})

              const storage = {
                local: localArea,
                sync: syncArea,
                managed: managedArea,
                onChanged: onChangedEvent,
              }

              Object.assign(target, { [key]: storage })

              // Add clear methods to mocks set
              if (typeof (localArea as any).clearAll === 'function') mocks.add((localArea as any).clearAll)
              if (typeof (syncArea as any).clearAll === 'function') mocks.add((syncArea as any).clearAll)
              if (typeof (managedArea as any).clearAll === 'function') mocks.add((managedArea as any).clearAll)
              if (typeof onChangedEvent.clear === 'function') mocks.add(onChangedEvent.clear)

              return storage
            } else {
              const proxy = new Proxy<Record<string, any>>(
                {},
                createHandler(schema[key], `${namespace}.${String(key)}`),
              )
              Object.assign(target, { [key]: proxy })
              return proxy
            }
          }
        }
        if (mockedElement && typeof mockedElement.clear === 'function') {
          mocks.add(mockedElement.clear)
        }
        return mockedElement
      } else {
        // Handle case where schema exists and has functions/events arrays
        if (schema && Array.isArray(schema.functions)) {
          const functionSchema = schema.functions.find(
            (fn: any) => fn.name === key,
          )
          if (functionSchema) {
            const fn = addFunction(functionSchema, target, namespace)
            Object.assign(target, { [key]: fn })
            if (typeof (fn as any).clear === 'function') {
              mocks.add((fn as any).clear)
            }
            return fn
          }
        }

        if (schema && Array.isArray(schema.events)) {
          const eventSchema = schema.events.find(
            (event: any) => event.name === key,
          )
          if (eventSchema) {
            const event = addEvent(eventSchema, target)
            if (typeof event.clear === 'function') {
              mocks.add(event.clear)
            }
            return event
          }
        }

        // Handle unknown properties when schema exists but property is unknown
        // (When schema is undefined, it's handled earlier in the get trap)

        // If schema exists but property is unknown, create appropriate mock
        const keyStr = String(key)
        const nestedNamespace = `${namespace}.${keyStr}`
        
        // Check if this looks like an event (starts with 'on' and has uppercase 3rd char)
        if (keyStr.startsWith('on') && keyStr.length > 2 && keyStr[2] === keyStr[2].toUpperCase()) {
          // Looks like an event, create an event object
          const event = addEvent({ name: keyStr, type: 'event', parameters: [] }, target)
          if (typeof event.clear === 'function') {
            mocks.add(event.clear)
          }
          return event
        } else {
          // Create a proxy that can be both an object (for namespaces) and callable (for methods)
          const targetObj: any = {}
          const proxyHandler = createHandler(undefined, nestedNamespace)
          
          // Create a callable function
          const callableFn = vi.fn((...args: any[]) => {
            const hasCallback = args.some((arg) => typeof arg === 'function')
            if (!hasCallback) {
              return Promise.reject(
                new Error(`${nestedNamespace} is not implemented`),
              )
            }
            throw new Error(`${nestedNamespace} is not implemented`)
          })
          ;(callableFn as any).clear = () => {
            callableFn.mockClear()
          }
          
          // Create a proxy that supports both property access and function calls
          const combinedProxy = new Proxy(callableFn, {
            get(target, prop, receiver) {
              // Return vitest mock properties
              if (prop === 'clear' || prop === 'mockClear' || prop === 'mock' || prop === 'mockImplementation') {
                return target[prop as keyof typeof target]
              }
              
              // First check if the property already exists on targetObj
              const hasKey = Reflect.has(targetObj, prop)
              if (hasKey) {
                const value = Reflect.get(targetObj, prop)
                return value !== null ? value : undefined
              }
              
              // Delegate property access to proxyHandler
              if (proxyHandler.get) {
                const result = proxyHandler.get(targetObj, prop, receiver)
                // Store the result on targetObj for persistence
                if (result !== undefined && !Reflect.has(targetObj, prop)) {
                  Object.assign(targetObj, { [prop]: result })
                }
                return result
              }
              return undefined
            },
            apply(target, thisArg, argArray) {
              return target(...argArray)
            },
            ownKeys(target) {
              return proxyHandler.ownKeys ? proxyHandler.ownKeys(targetObj) : []
            },
            getOwnPropertyDescriptor(target, prop) {
              return proxyHandler.getOwnPropertyDescriptor
                ? proxyHandler.getOwnPropertyDescriptor(targetObj, prop)
                : { enumerable: true, configurable: true }
            },
            has(target, key) {
              return proxyHandler.has ? proxyHandler.has(targetObj, key) : false
            },
            set(target, key, value, receiver) {
              return proxyHandler.set ? proxyHandler.set(targetObj, key, value, receiver) : true
            },
            deleteProperty(target, key) {
              return proxyHandler.deleteProperty
                ? proxyHandler.deleteProperty(targetObj, key)
                : true
            },
          })
          Object.assign(target, { [key]: combinedProxy })
          mocks.add((callableFn as any).clear)
          return combinedProxy
        }
      }
    },
  }

  ;(handler as any).clear = () => {
    mocks.forEach((mock) => mock())
  }

  return handler
}
