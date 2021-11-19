import { PROXY_PATH, ProxyService } from './proxy.service'
import { TestBed } from '@angular/core/testing'

// mock window.location
;(global as any).window = Object.create(window)
Object.defineProperty(window, 'location', {
  value: new URL('http://myhost:1234/my/path?abc'),
})

let proxyPath

describe('ProxyService', () => {
  let service: ProxyService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PROXY_PATH,
          useFactory: () => proxyPath,
        },
      ],
    })
  })

  it('should be created', () => {
    service = TestBed.inject(ProxyService)
    expect(service).toBeTruthy()
  })

  describe('#getProxiedUrl', () => {
    describe('with an absolute value for PROXY_PATH', () => {
      beforeEach(() => {
        proxyPath = 'https://proxy.org/abc?url='
        service = TestBed.inject(ProxyService)
      })
      it('applies the proxy', () => {
        expect(service.getProxiedUrl('http://anotherhost/abcd')).toEqual(
          `https://proxy.org/abc?url=http://anotherhost/abcd`
        )
      })
    })
    describe('with a relative value for PROXY_PATH', () => {
      beforeEach(() => {
        proxyPath = '/proxy?'
        service = TestBed.inject(ProxyService)
      })
      it('applies the proxy and return a fully qualified url', () => {
        expect(service.getProxiedUrl('http://anotherhost/abcd')).toEqual(
          `http://myhost:1234/proxy?http://anotherhost/abcd`
        )
      })
    })
    describe('without a value for PROXY_PATH', () => {
      beforeEach(() => {
        proxyPath = null
        service = TestBed.inject(ProxyService)
      })
      it('does not alter the url', () => {
        expect(service.getProxiedUrl('http://anotherhost/abcd')).toEqual(
          `http://anotherhost/abcd`
        )
      })
    })
  })
})
