import { TestBed } from '@angular/core/testing'
import { FileTranslateLoader } from './file.translate.loader'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import fetchMock from 'fetch-mock-jest'

describe('FileTranslateLoader', () => {
  let loader: FileTranslateLoader
  let httpController: HttpTestingController

  beforeEach(() => {
    fetchMock.reset()
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
