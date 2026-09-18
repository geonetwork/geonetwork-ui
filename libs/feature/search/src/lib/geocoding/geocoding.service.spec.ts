import { TestBed } from '@angular/core/testing'
import { firstValueFrom } from 'rxjs'
import {
  queryGeoadmin,
  queryGeonames,
  queryGeoplateforme,
} from '@geospatial-sdk/geocoding'
import {
  DEFAULT_GEOCODING_PROVIDER,
  GEOCODING_PROVIDER,
  GeocodingService,
} from './geocoding.service'

jest.mock('@geospatial-sdk/geocoding', () => ({
  queryGeoadmin: jest.fn(),
  queryGeonames: jest.fn(),
  queryGeoplateforme: jest.fn(),
}))

function setup(provider: unknown) {
  TestBed.configureTestingModule({
    providers: [{ provide: GEOCODING_PROVIDER, useValue: provider }],
  })
  return TestBed.inject(GeocodingService)
}

describe('GeocodingService', () => {
  const results = [{ label: 'Beaufort', geom: null }]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('queries the configured provider with the given options', async () => {
    ;(queryGeonames as jest.Mock).mockResolvedValue(results)
    const service = setup(['geonames', { maxRows: 5 }])

    const response = await firstValueFrom(service.query('beaufort'))

    expect(queryGeonames).toHaveBeenCalledWith('beaufort', { maxRows: 5 })
    expect(response).toEqual(results)
  })

  it('queries the geoadmin provider with the given options', async () => {
    ;(queryGeoadmin as jest.Mock).mockResolvedValue(results)
    const service = setup(['geoadmin', { lang: 'fr' }])

    const response = await firstValueFrom(service.query('beaufort'))

    expect(queryGeoadmin).toHaveBeenCalledWith('beaufort', { lang: 'fr' })
    expect(response).toEqual(results)
  })

  it('queries the geoplateforme provider with the given options', async () => {
    ;(queryGeoplateforme as jest.Mock).mockResolvedValue(results)
    const service = setup(['geoplateforme', { limit: 5 }])

    const response = await firstValueFrom(service.query('beaufort'))

    expect(queryGeoplateforme).toHaveBeenCalledWith('beaufort', {
      limit: 5,
    })
    expect(response).toEqual(results)
  })

  it('errors on an unsupported provider', async () => {
    const service = setup(['unknown', {}])

    await expect(firstValueFrom(service.query('beaufort'))).rejects.toThrow(
      'Unsupported geocoding provider: unknown'
    )
  })
})

describe('GEOCODING_PROVIDER default factory', () => {
  it('defaults to geonames', () => {
    TestBed.configureTestingModule({})
    expect(TestBed.inject(GEOCODING_PROVIDER)).toEqual(
      DEFAULT_GEOCODING_PROVIDER
    )
  })
})
