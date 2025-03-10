import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { TranslateModule } from '@ngx-translate/core'
import { cold, hot } from 'jasmine-marbles'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MyDraftComponent } from './my-draft.component'
import { EditorService } from '@geonetwork-ui/feature/editor'

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>
  let recordsRepository: RecordsRepositoryInterface
  let editorService: EditorService

  beforeEach(() => {
    return MockBuilder(MyDraftComponent)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        MockProvider(RecordsRepositoryInterface),
        MockProvider(EditorService),
      ],
    })
    recordsRepository = TestBed.inject(RecordsRepositoryInterface)
    editorService = TestBed.inject(EditorService)
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
  it('should rollback draft', () => {
    const record = {} as any
    recordsRepository.getAllDrafts = jest
      .fn()
      .mockReturnValue(cold('-a-|', { a: [record] }))
    const undoRecordDraftSpy = jest.spyOn(
      component.editorService,
      'undoRecordDraft'
    )

    component.rollbackDraft(record)

    expect(undoRecordDraftSpy).toHaveBeenCalledWith(record)
  })
})
