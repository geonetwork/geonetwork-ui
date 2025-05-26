import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { cold, hot } from 'jasmine-marbles'
import { MockBuilder, MockProviders } from 'ng-mocks'
import { DashboardMenuComponent } from './dashboard-menu.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent
  let fixture: ComponentFixture<DashboardMenuComponent>
  let recordsRepository: RecordsRepositoryInterface

  beforeEach(() => {
    return MockBuilder(DashboardMenuComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProviders(ActivatedRoute, RecordsRepositoryInterface),
      ],
    }).compileComponents()
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
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
    recordsRepository.getDraftsCount = jest
      .fn()
      .mockReturnValue(hot('ab-|', { a: 0, b: 1 }))

    // Define the expected marble diagram
    const expected = cold('ab-|', { a: 0, b: 1 })

    // Assert that draftsCount$ behaves as expected
    expect(component.draftsCount$).toBeObservable(expected)
  })
})
