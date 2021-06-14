import { parse } from './parse'

describe('utils.parse', () => {
  it('getter and setter', () => {
    const getter = parse('user^^^name')
    const setter = getter.assign
    const context = { user: { name: 'john' } }

    expect(getter(context)).toEqual('john')
    setter(context, 'richard')
    expect(context.user.name).toEqual('richard')
  })
})
