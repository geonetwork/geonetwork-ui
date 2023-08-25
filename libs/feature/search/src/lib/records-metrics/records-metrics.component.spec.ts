import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { RecordsMetricsComponent } from './records-metrics.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  aggsOnly as aggsOnlyFixture,
  SAMPLE_AGGREGATIONS_RESULTS,
} from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/records-repository.interface'

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS))
}

describe('RecordsMetricsComponent', () => {
  let component: RecordsMetricsComponent
  let fixture: ComponentFixture<RecordsMetricsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsMetricsComponent],
      imports: [UiSearchModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    }).compileComponents()
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
      component.field = 'myField'
      component.count = 4
      component.queryString = '+filter=abcd'
      fixture.detectChanges()

      let results = null
      component.results$.subscribe((value) => (results = value))
      expect(results.length).toBe(
        SAMPLE_AGGREGATIONS_RESULTS.myField.buckets.length
      )
    })
  })
})
