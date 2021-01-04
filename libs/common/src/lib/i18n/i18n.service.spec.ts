import { TestBed } from '@angular/core/testing'
import { StandardsApiService } from '@lib/gn-api'
import { of } from 'rxjs'
import { TranslationService } from './i18n.service'
import { HttpClient } from '@angular/common/http'

const standardApiServiceMock = {
  getCodelistsTranslations: jest.fn(() => of({ farming: 'Farming' })),
}

const httpClient = {
  get: jest.fn(() => of({ 'facets.block.title.tag': 'Keywords' })),
}

describe('i18nService', () => {
  let service: TranslationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClient,
        },
        {
          provide: StandardsApiService,
          useValue: standardApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(TranslationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('to have loaded core translations + codelist translations', () => {
    let translations
    service.getTranslation('en').subscribe((r) => (translations = r))
    expect(translations['facets.block.title.tag']).toBe('Keywords')
    expect(translations.farming).toBe('Farming')
  })
})
