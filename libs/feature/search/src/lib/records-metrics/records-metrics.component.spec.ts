import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { RecordsMetricsComponent } from './records-metrics.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { aggsOnly as aggsOnlyFixture } from '@geonetwork-ui/feature/search'

describe('RecordsMetricsComponent', () => {
  let component: RecordsMetricsComponent
  let fixture: ComponentFixture<RecordsMetricsComponent>
  let httpMock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsMetricsComponent],
      imports: [UiSearchModule, TranslateModule.forRoot(), HttpClientTestingModule],
    }).compileComponents()
    httpMock = TestBed.inject(HttpTestingController)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsMetricsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('fetching record counts', () => {
    it('parses the aggregation buckets', () => {
      component.field = 'myfield'
      component.count = 4
      component.queryString = '+filter=abcd'
      fixture.detectChanges()

      let results = null
      component.results$.subscribe((value) => (results = value))
      const req = httpMock.expectOne((req) => req.url.indexOf(`_search`) > -1)
      expect(JSON.parse(req.request.body)).toMatchObject({
        query: { query_string: { query: '+filter=abcd' } },
        aggs: {
          results: {
            terms: {
              field: 'myfield',
              size: 4,
            },
          },
        },
      })
      req.flush(aggsOnlyFixture)

      expect(results.length).toBe(
        aggsOnlyFixture.aggregations.results.buckets.length
      )
    })

    afterEach(() => {
      httpMock.verify()
    })
  })
})
