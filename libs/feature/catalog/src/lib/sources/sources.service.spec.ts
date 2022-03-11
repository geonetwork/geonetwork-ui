import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { SourcesService } from './sources.service'
import { TranslateModule } from '@ngx-translate/core'
import { readFirst } from '@nrwl/angular/testing'
import { SourcesApiService } from '@geonetwork-ui/data-access/gn4'
import { SOURCES_FIXTURE } from './sources.fixture'
import { Observable } from 'rxjs'
import { LangService } from '@geonetwork-ui/util/i18n'

class SourcesApiServiceMock {
  getSources1 = jest.fn(function () {
    return new Observable((observer) => {
      observer.next(SOURCES_FIXTURE)
    })
  })
}
class LangServiceMock {
  iso3 = 'fre'
}

describe('SourcesService', () => {
  let service: SourcesService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientModule],
      providers: [
        { provide: SourcesApiService, useClass: SourcesApiServiceMock },
        { provide: LangService, useClass: LangServiceMock },
      ],
    })
    service = TestBed.inject(SourcesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('setting empty source uuid', () => {
    beforeEach(() => {
      service.setSourceUuid('')
    })
    it('should set source label to undefined', async () => {
      const sourceLabel = await readFirst(service.sourceLabel$)
      expect(sourceLabel).toBe(undefined)
    })
  })
  describe('setting source uuid to value NOT present in catalog', () => {
    beforeEach(() => {
      service.setSourceUuid('12345c40-5ba9-41a8-80e7-510576221cbc')
    })
    it('should set source label to undefined', async () => {
      const sourceLabel = await readFirst(service.sourceLabel$)
      expect(sourceLabel).toBe(undefined)
    })
  })
  describe('setting source uuid to value present in catalog', () => {
    beforeEach(() => {
      service.setSourceUuid('77992c40-5ba9-41a8-80e7-510576221cbc')
    })
    it('should retrieve source label for uuid', async () => {
      const sourceLabel = await readFirst(service.sourceLabel$)
      expect(sourceLabel).toBe('Agence ORE')
    })
  })
})
