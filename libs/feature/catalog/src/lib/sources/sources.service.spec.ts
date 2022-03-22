import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { SourcesService } from './sources.service'
import { TranslateModule } from '@ngx-translate/core'
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
  describe('getting label with empty source uuid', () => {
    let sourceLabel
    beforeEach(() => {
      service.getSourceLabel('').subscribe((label) => (sourceLabel = label))
    })
    it('should get source label undefined', () => {
      expect(sourceLabel).toBeUndefined()
    })
  })
  describe('getting source label with uuid NOT present in catalog', () => {
    let sourceLabel
    beforeEach(() => {
      service
        .getSourceLabel('12345c40-5ba9-41a8-80e7-510576221cbc')
        .subscribe((label) => (sourceLabel = label))
    })
    it('should get source label undefined', () => {
      expect(sourceLabel).toBeUndefined()
    })
  })
  describe('getting source label with uuid present in catalog', () => {
    let sourceLabel
    beforeEach(() => {
      service
        .getSourceLabel('77992c40-5ba9-41a8-80e7-510576221cbc')
        .subscribe((label) => (sourceLabel = label))
    })
    it('should get source label for uuid', () => {
      expect(sourceLabel).toBe('Agence ORE')
    })
  })
})
