import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { TranslateModule } from '@ngx-translate/core'
import { cold, hot } from 'jasmine-marbles'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MyDraftComponent } from './my-draft.component'

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>
  let recordsRepository: RecordsRepositoryInterface

  beforeEach(() => {
    return MockBuilder(MyDraftComponent)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [MockProvider(RecordsRepositoryInterface)],
    })
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    fixture = TestBed.createComponent(MyDraftComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit records$ immediately and then on drafts change', () => {
    // Mock the source observable that records$ depends on
    recordsRepository.draftsChanged$ = hot('--a-|', {
      a: void 0,
    })
    recordsRepository.getAllDrafts = jest
      .fn()
      .mockReturnValue(hot('-ab-|', { a: [], b: [{}] }))

    // Define the expected marble diagram
    const expected = cold('abc-|', { a: [], b: [], c: [{}] })

    // Assert that records$ behaves as expected
    expect(component.records$).toBeObservable(expected)
  })
})
