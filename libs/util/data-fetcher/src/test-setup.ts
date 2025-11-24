/* eslint-disable */
import fetch from 'fetch-mock-jest'

global.fetch = fetch as never

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
