import { TestBed } from '@angular/core/testing'
import { ToolsApiService } from '@lib/gn-api'
import { of } from 'rxjs'
import { TranslationService } from './i18n.service'

const toolsApiServiceMock = {
  getTranslationsPackage1: jest.fn(() => of({ farming: 'Farming' })),
}

describe('i18nService', () => {
  let service: TranslationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToolsApiService,
          useValue: toolsApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(TranslationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loads translation from getTranslationsPackage1', () => {
    let translations
    service.getTranslation('en').subscribe((r) => (translations = r))
    expect(translations.farming).toBe('Farming')
  })
})
