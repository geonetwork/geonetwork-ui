import { TestBed } from '@angular/core/testing'
import { ToolsApiService } from '@lib/gn-api'
import { of } from 'rxjs'
import { Gn4TranslateLoader } from './gn4.translate.loader'

const toolsApiServiceMock = {
  getTranslationsPackage1: jest.fn(() =>
    of({ farming: 'Farming', legacy: ' {{ id }} id' })
  ),
}

describe('i18nService', () => {
  let service: Gn4TranslateLoader

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToolsApiService,
          useValue: toolsApiServiceMock,
        },
      ],
    })
    service = TestBed.inject(Gn4TranslateLoader)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loads translation from getTranslationsPackage1', () => {
    let translations
    service.getTranslation('en').subscribe((r) => (translations = r))
    expect(translations.farming).toBe('Farming')
  })

  it('filters {{ }} pattern', () => {
    let translations
    service.getTranslation('en').subscribe((r) => (translations = r))
    expect(translations).not.toHaveProperty('legacy')
  })
})
