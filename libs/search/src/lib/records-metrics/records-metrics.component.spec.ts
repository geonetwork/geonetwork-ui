import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UiModule } from '@lib/ui'
import { RecordsMetricsComponent } from './records-metrics.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { aggsOnly as aggsOnlyFixture } from '@lib/gn-api'

describe('RecordsMetricsComponent', () => {
  let component: RecordsMetricsComponent
  let fixture: ComponentFixture<RecordsMetricsComponent>
  let httpMock: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsMetricsComponent],
      imports: [UiModule, TranslateModule.forRoot(), HttpClientTestingModule],
    }).compileComponents()
    httpMock = TestBed.inject(HttpTestingController)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsMetricsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('fetching record counts', () => {
    it('create a simple bucket aggregation of type terms.', () => {
      component.field = 'myfield'
      component.count = 4
      component.queryString = '+filter=abcd'
      fixture.detectChanges()

      let results = null
      component.results$.subscribe((value) => (results = value))
      const req = httpMock.expectOne((req) => req.url.indexOf(`_search`) > -1)
      expect(JSON.parse(req.request.body)).toMatchObject({
        query: {
          bool: {
            filter: { query: { query_string: { query: '+filter=abcd' } } },
          },
        },
        aggs: {
          metric: {
            terms: {
              field: 'myfield',
              size: 4,
            },
          },
        },
      })
      req.flush(aggsOnlyFixture)

      expect(results.length).toBe(
        aggsOnlyFixture.aggregations.metric.buckets.length
      )
    })

    it('use the config for the aggregation.', () => {
      component.config =
        '{"terms":{"field":"tag","size":20, "include": "IDP_DPSIR.*"}}'
      component.queryString = '+filter=abcd'
      fixture.detectChanges()

      let results = null
      component.results$.subscribe((value) => (results = value))
      const req = httpMock.expectOne((req) => req.url.indexOf(`_search`) > -1)
      expect(JSON.parse(req.request.body)).toMatchObject({
        query: {
          bool: {
            filter: { query: { query_string: { query: '+filter=abcd' } } },
          },
        },
        aggs: {
          metric: { terms: { field: 'tag', size: 20, include: 'IDP_DPSIR.*' } },
        },
      })
    })

    it('report warning in console in case of invalid config.', () => {
      component.config =
        '{"terms":{"field":"tag","size":2'
      fixture.detectChanges()
      // TODO: How to check config error is reported?
    })

    afterEach(() => {
      httpMock.verify()
    })
  })
})
