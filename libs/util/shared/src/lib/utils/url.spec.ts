import { removeSearchParams } from './url'

describe('URL utils', () => {
  describe('removeSearchParams', () => {
    it('removes given search params in a case insensitive way', () => {
      expect(
        removeSearchParams(
          'http://my.org/abc/?arg0=1234&arg1=aaa&Arg1=111&ARG2=&aRG3=fff&arg4=5678',
          ['ARG1', 'arg2', 'arg3']
        )
      ).toEqual('http://my.org/abc/?arg0=1234&arg4=5678')
    })
  })
})
