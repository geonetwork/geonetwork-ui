import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyDraftComponent } from './my-draft.component'
import { Component, importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { of } from 'rxjs'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { cold, hot } from 'jasmine-marbles'

@Component({
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {}

class RecordsRepositoryMock {
  draftsChanged$ = of(void 0)
  getAllDrafts = jest.fn().mockReturnValue(of(DATASET_RECORDS))
  draftIsTemporary = jest.fn()
}

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>
  let recordsRepository: RecordsRepositoryMock

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(TranslateModule.forRoot()),
        {
          provide: RecordsRepositoryInterface,
          useClass: RecordsRepositoryMock,
        },
      ],
    }).overrideComponent(MyDraftComponent, {
      remove: {
        imports: [RecordsListComponent],
      },
      add: {
        imports: [MockRecordsListComponent],
      },
    })
    recordsRepository = TestBed.inject(RecordsRepositoryInterface) as any
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
