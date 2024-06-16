import { TextDecoder, TextEncoder } from 'util'

// this is needed because jsdom does not include these as globals by default
// see https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// hide console output in CI
if (process.env.TEST_HIDE_CONSOLE) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

// mock local storage (create a new one each time)
class LocalStorageRefStub {
  store: Record<string, string> = {}
  mockLocalStorage = {
    getItem: jest.fn((key: string): string => {
      return key in this.store ? this.store[key] : null
    }),
    setItem: jest.fn((key: string, value: string) => {
      this.mockLocalStorage[key] = `${value}` // we're also saving it here to be able to get it with {...localStorage}
      this.store[key] = `${value}`
    }),
    removeItem: jest.fn((key: string) => {
      delete this.mockLocalStorage[key]
      delete this.store[key]
    }),
    clear: jest.fn(() => {
      for (const key in this.store) {
        delete this.mockLocalStorage[key]
      }
      this.store = {}
    }),
  }
  public getLocalStorage() {
    return this.mockLocalStorage
  }
}
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageRefStub().getLocalStorage(),
  })
})
