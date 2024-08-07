import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { cold, hot } from 'jasmine-marbles'
import { of } from 'rxjs'
import { DashboardMenuComponent } from './dashboard-menu.component'

class RecordsRepositoryMock {
  draftsChanged$ = of(void 0)
  getAllDrafts = jest.fn().mockReturnValue(of(DATASET_RECORDS))
}

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent
  let fixture: ComponentFixture<DashboardMenuComponent>
  let recordsRepository: RecordsRepositoryMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenuComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    recordsRepository = TestBed.inject(RecordsRepositoryInterface) as any
    fixture = TestBed.createComponent(DashboardMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit draftsCount$ immediately and then on drafts change', () => {
    // Mock the source observable that draftsCount$ depends on
    recordsRepository.draftsChanged$ = hot('-a-|', {
      a: void 0,
    })
    recordsRepository.getAllDrafts = jest
      .fn()
      .mockReturnValue(hot('ab-|', { a: [], b: [{}] }))

    // Define the expected marble diagram
    const expected = cold('ab-|', { a: 0, b: 1 })

    // Assert that draftsCount$ behaves as expected
    expect(component.draftsCount$).toBeObservable(expected)
  })
})
