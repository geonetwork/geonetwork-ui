import { parseSizeAsMb } from './size.utils'

describe('parseSizeAsMb', () => {
  describe('size as number', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12')).toEqual(0.000011444091796875)
    })
  })
  describe('size in B', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12B')).toEqual(0.000011444091796875)
    })
  })
  describe('size in KB', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12KB')).toEqual(0.01171875)
    })
  })
  describe('size in MB', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12MB')).toEqual(12)
    })
  })
  describe('size in GB', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12GB')).toEqual(12288)
    })
  })
  describe('size in TB', () => {
    it('converts to MB', () => {
      expect(parseSizeAsMb('12TB')).toEqual(12582912)
    })
  })
})
