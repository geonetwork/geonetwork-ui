/* eslint-disable */
import fetch from 'fetch-mock-jest'
import { TextDecoder, TextEncoder } from 'util'

global.fetch = fetch as never

// this is needed because jsdom does not include these as globals by default
// see https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.Headers = class {
  _value = {}
  constructor(initValue) {
    for (const key in initValue) {
      this._value[key.toLowerCase()] = initValue[key]
    }
  }
  has(name) {
    return name.toLowerCase() in this._value
  }
  get(name) {
    if (!this.has(name)) throw new TypeError()
    return this._value[name.toLowerCase()]
  }
} as never

// hide console output in CI
if (process.env.TEST_HIDE_CONSOLE) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}
