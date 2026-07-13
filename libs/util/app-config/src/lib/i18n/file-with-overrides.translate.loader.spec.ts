import { TestBed } from '@angular/core/testing'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'
import * as AppConfig from '../app-config'
import { loadAppConfig, TRANSLATE_WITH_OVERRIDES_CONFIG } from '../app-config'
import { appConfigWithTranslationFixture } from '../fixtures'
import fetchMock from 'fetch-mock-jest'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { TranslateLoader } from '@ngx-translate/core'

describe('FileTranslateLoader', () => {
  let loader: TranslateLoader
  let httpController: HttpTestingController

  beforeEach(() => {
    fetchMock.reset()
    jest.spyOn(AppConfig, 'getCustomTranslations')
    TestBed.configureTestingModule({
      providers: [
        provideI18n(TRANSLATE_WITH_OVERRIDES_CONFIG, false), // do not use local storage to avoid additional requests
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
    const FR = {
      'first.label': '',
      'second.label': 'Deuxième libellé.',
    }
    beforeEach(async () => {
      fetchMock.get('end:default.toml', () => appConfigWithTranslationFixture())
      await loadAppConfig()
    })
    it('includes translations', () => {
      let translations
      loader.getTranslation('fr').subscribe((result) => (translations = result))
      const req = httpController.expectOne('./assets/i18n/fr.json')
      req.flush(FR)
      expect(translations).toEqual({
        'second.label': 'Deuxième libellé.',
        'my.sample.text': 'Un bon exemple de texte.',
        'my.quoted.text': 'du texte entre guillements.',
      })
    })
    afterEach(() => {
      httpController.verify()
    })
  })
})
