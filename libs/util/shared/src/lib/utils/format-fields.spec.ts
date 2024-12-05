import { formatUserInfo } from './format-fields'

describe('formatUserInfo', () => {
  it('should format user info correctly', () => {
    expect(formatUserInfo('barbie|Roberts|Barbara|UserAdmin (5)')).toEqual(
      'Barbara Roberts'
    )
  })

  it('should format user info correctly with count', () => {
    expect(
      formatUserInfo('barbie|Roberts|Barbara|UserAdmin (5)', true)
    ).toEqual('Barbara Roberts (5)')
  })

  it('should return undefined if user info is empty', () => {
    expect(formatUserInfo('')).toBeUndefined()
  })

  it('should return undefined if user info is not a string', () => {
    expect(formatUserInfo(undefined)).toBeUndefined()
  })
})
