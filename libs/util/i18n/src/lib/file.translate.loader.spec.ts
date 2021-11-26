import { TestBed } from '@angular/core/testing'
import { FileTranslateLoader } from './file.translate.loader'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import * as AppConfig from '@geonetwork-ui/util/app-config'
import fetchMock from 'fetch-mock-jest'
import { CONFIG_WITH_TRANSLATIONS } from '@geonetwork-ui/util/app-config'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'

describe('FileTranslateLoader', () => {
  let loader: FileTranslateLoader
  let httpController: HttpTestingController

  beforeEach(() => {
    fetchMock.reset()
    jest.spyOn(AppConfig, 'getCustomTranslations')
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    loader = new FileTranslateLoader(
      TestBed.inject(HttpClient),
      './assets/i18n/'
    )
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
    describe('without app config', () => {
      it('uses only 2 letter code (ignore regional code)', () => {
        loader.getTranslation('en_US').subscribe(() => {}) // eslint-disable-line
        const req = httpController.expectOne('./assets/i18n/en.json')
        req.flush(EN)
      })
      it('filters out empty translations', () => {
        let translations
        loader
          .getTranslation('fr')
          .subscribe((result) => (translations = result))
        const req = httpController.expectOne('./assets/i18n/fr.json')
        req.flush(FR)
        expect(translations).toEqual({
          'second.label': 'Deuxième libellé.',
        })
      })
      it('does not check custom translations', () => {
        expect(AppConfig.getCustomTranslations).not.toHaveBeenCalled()
      })
    })
    describe('with app config', () => {
      beforeEach(async () => {
        fetchMock.get('end:default.toml', () => CONFIG_WITH_TRANSLATIONS)
        await loadAppConfig()
      })
      it('includes translations', () => {
        let translations
        loader
          .getTranslation('fr')
          .subscribe((result) => (translations = result))
        const req = httpController.expectOne('./assets/i18n/fr.json')
        req.flush(FR)
        expect(translations).toEqual({
          'second.label': 'Deuxième libellé.',
          'my.sample.text': 'Un bon exemple de texte.',
        })
      })
    })
    afterEach(() => {
      httpController.verify()
    })
  })
})
