import { TestBed } from '@angular/core/testing'
import { FileWithOverridesTranslateLoader } from './file-with-overrides.translate.loader'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import * as AppConfig from '../app-config'
import { loadAppConfig } from '../app-config'
import { appConfigWithTranslationFixture } from '../fixtures'
import fetchMock from 'fetch-mock-jest'

describe('FileTranslateLoader', () => {
  let loader: FileWithOverridesTranslateLoader
  let httpController: HttpTestingController

  beforeEach(() => {
    fetchMock.reset()
    jest.spyOn(AppConfig, 'getCustomTranslations')
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    loader = new FileWithOverridesTranslateLoader(
      TestBed.inject(HttpClient),
      './assets/i18n/'
    )
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
