import { TestBed } from '@angular/core/testing'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'
import fetchMock from 'fetch-mock-jest'
import { provideI18n } from './i18n.providers'
import { TRANSLATE_DEFAULT_CONFIG } from './i18n.constants'
import { TranslateLoader } from '@ngx-translate/core'

describe('FileTranslateLoader', () => {
  let loader: TranslateLoader
  let httpController: HttpTestingController

  beforeEach(() => {
    fetchMock.reset()
    TestBed.configureTestingModule({
      providers: [
        provideI18n(TRANSLATE_DEFAULT_CONFIG, false), // do not use local storage to avoid additional requests
        provideHttpClientTesting(),
      ],
    })
    loader = TestBed.inject(TranslateLoader)
    httpController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(loader).toBeTruthy()
  })

  describe('#getTranslation', () => {
    const EN = {
      'first.label': 'First Label.',
      'second.label': 'Second Label.',
    }
    const FR = {
      'first.label': '',
      'second.label': 'Deuxième libellé.',
    }
    it('uses only 2 letter code (ignore regional code)', () => {
      loader.getTranslation('en_US').subscribe(() => {}) // eslint-disable-line
      const req = httpController.expectOne('./assets/i18n/en.json')
      req.flush(EN)
    })
    it('filters out empty translations', () => {
      let translations
      loader.getTranslation('fr').subscribe((result) => (translations = result))
      const req = httpController.expectOne('./assets/i18n/fr.json')
      req.flush(FR)
      expect(translations).toEqual({
        'second.label': 'Deuxième libellé.',
      })
    })
    afterEach(() => {
      httpController.verify()
    })
  })
})
