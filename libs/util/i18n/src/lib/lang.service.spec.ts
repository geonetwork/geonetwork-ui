import { TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'

import { LangService } from './lang.service'

const translateServiceMock = {
  currentLang: 'fr',
}

describe('LangService', () => {
  let service: LangService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    })
    service = TestBed.inject(LangService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('return current lang in iso2', () => {
    expect(service.iso2).toBe('fr')
  })
  it('return current lang in iso3', () => {
    expect(service.iso3).toBe('fre')
  })
  it('return index property selector for the current lang', () => {
    expect(service.index).toBe('langfre')
  })
})
