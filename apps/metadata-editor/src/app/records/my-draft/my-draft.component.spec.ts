import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyDraftComponent } from './my-draft.component'
import { Component, importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { of } from 'rxjs'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Component({
  selector: 'md-editor-records-list',
  template: '',
  standalone: true,
})
export class MockRecordsListComponent {}

class RecordsRepositoryMock {
  getAllDrafts = jest.fn().mockReturnValue(of(DATASET_RECORDS))
}

describe('MyDraftComponent', () => {
  let component: MyDraftComponent
  let fixture: ComponentFixture<MyDraftComponent>

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
    fixture = TestBed.createComponent(MyDraftComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('gets all drafts on init', () => {
    expect(
      TestBed.inject(RecordsRepositoryInterface).getAllDrafts
    ).toHaveBeenCalled()
  })
})
