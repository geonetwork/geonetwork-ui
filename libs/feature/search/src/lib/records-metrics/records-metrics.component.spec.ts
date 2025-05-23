import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { RecordsMetricsComponent } from './records-metrics.component'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { SAMPLE_AGGREGATIONS_RESULTS } from '@geonetwork-ui/common/fixtures'
import { of } from 'rxjs'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'

class RecordsRepositoryMock {
  aggregate = jest.fn(() => of(SAMPLE_AGGREGATIONS_RESULTS()))
}

describe('RecordsMetricsComponent', () => {
  let component: RecordsMetricsComponent
  let fixture: ComponentFixture<RecordsMetricsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsMetricsComponent],
      imports: [UiSearchModule, TranslateDirective, TranslatePipe],
      providers: [
        provideI18n(),
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
        SAMPLE_AGGREGATIONS_RESULTS().myField.buckets.length
      )
    })
  })
})
