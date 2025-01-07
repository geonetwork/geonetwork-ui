import { PROXY_PATH, ProxyService } from './proxy.service'
import { TestBed } from '@angular/core/testing'
import { MockProvider } from 'ng-mocks'
import { Location } from '@angular/common'

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
        MockProvider(Location, {
          path: () => '/wms',
        }),
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
      it('different host: applies the proxy', () => {
        expect(service.getProxiedUrl('http://anotherhost/abcd')).toEqual(
          `https://proxy.org/abc?url=http%3A%2F%2Fanotherhost%2Fabcd`
        )
      })
      it('does not apply the proxy twice', () => {
        const proxied = service.getProxiedUrl('http://anotherhost/abcd')
        expect(service.getProxiedUrl(proxied)).toEqual(proxied)
      })
      it('same host/port/protocol: does not apply the proxy', () => {
        const proxied = service.getProxiedUrl('http://localhost/wms')
        expect(proxied).toEqual('http://localhost/wms')
      })
      it('different protocol: applies the proxy', () => {
        const proxied = service.getProxiedUrl('https://myhost:1234/wms')
        expect(proxied).toEqual(
          'https://proxy.org/abc?url=https%3A%2F%2Fmyhost%3A1234%2Fwms'
        )
      })
      it('different port: applies the proxy', () => {
        const proxied = service.getProxiedUrl('http://myhost:123/wms')
        expect(proxied).toEqual(
          'https://proxy.org/abc?url=http%3A%2F%2Fmyhost%3A123%2Fwms'
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
          `http://localhost/proxy?http%3A%2F%2Fanotherhost%2Fabcd`
        )
      })
      it('does not apply the proxy twice', () => {
        const proxied = service.getProxiedUrl('http://anotherhost/abcd')
        expect(service.getProxiedUrl(proxied)).toEqual(proxied)
      })
      it('does not apply the proxy if on the same host', () => {
        const proxied = service.getProxiedUrl('http://localhost/wms')
        expect(proxied).toEqual('http://localhost/wms')
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
