import { parseHeaders } from './headers'

describe('headers', () => {
  describe('parseHeaders', () => {
    let rawHeaders
    describe('content-type', function () {
      beforeEach(() => {
        rawHeaders = new Headers({
          expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
          'x-frame-options': 'SAMEORIGIN',
          'access-control-allow-credentials': 'true',
          vary: 'Origin',
          'content-encoding': 'gzip',
          'content-type': 'application/json;charset=utf-8',
          'x-xss-protection': '1; mode=block',
          'x-content-type-options': 'nosniff',
          'strict-transport-security':
            'max-age=31536000; includeSubDomains; preload;',
          'access-control-allow-methods': 'GET, HEAD, OPTIONS',
          'access-control-allow-headers':
            'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          'content-security-policy':
            "frame-ancestors 'self' https://*.maps.arcgis.com",
          'access-control-allow-origin': 'http://localhost',
          connection: 'close',
        })
      })
      it('should only include the mime type and supported type (JSON)', () => {
        expect(parseHeaders(rawHeaders)).toEqual({
          mimeType: 'application/json',
          supportedType: 'json',
        })
      })
    })
    describe('content-type, not supported', function () {
      beforeEach(() => {
        rawHeaders = new Headers({
          'content-type': 'application/anything',
        })
      })
      it('should only include the mime type', () => {
        expect(parseHeaders(rawHeaders)).toEqual({
          mimeType: 'application/anything',
        })
      })
    })
    describe('content-type, size and change date', function () {
      beforeEach(() => {
        rawHeaders = new Headers({
          expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
          'x-frame-options': 'SAMEORIGIN',
          'access-control-allow-credentials': 'true',
          vary: 'Origin',
          'last-modified': 'Wed, 21 Oct 2015 07:28:00 GMT',
          'content-encoding': 'gzip',
          'content-type': 'text/csv;charset=utf-8',
          'content-length': '123456',
          'x-xss-protection': '1; mode=block',
          'x-content-type-options': 'nosniff',
          'strict-transport-security':
            'max-age=31536000; includeSubDomains; preload;',
          'access-control-allow-methods': 'GET, HEAD, OPTIONS',
          'access-control-allow-headers':
            'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          'content-security-policy':
            "frame-ancestors 'self' https://*.maps.arcgis.com",
          'access-control-allow-origin': 'http://localhost',
          connection: 'close',
        })
      })
      it('include type, size and date of last change', () => {
        expect(parseHeaders(rawHeaders)).toEqual({
          mimeType: 'text/csv',
          supportedType: 'csv',
          fileSizeBytes: 123456,
          lastUpdate: new Date('2015-10-21T07:28:00Z'),
        })
      })
    })
    describe('change date, but invalid', function () {
      beforeEach(() => {
        rawHeaders = new Headers({
          'last-modified': 'glargbz',
        })
      })
      it('include type, size and date of last change', () => {
        expect(parseHeaders(rawHeaders)).toEqual({
          lastUpdateInvalid: true,
        })
      })
    })
  })
})
