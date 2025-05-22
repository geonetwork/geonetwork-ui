import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordLinkedRecordsComponent } from './record-linked-records.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject } from 'rxjs'

describe('RecordLinkedRecordsComponent', () => {
  let component: RecordLinkedRecordsComponent
  let fixture: ComponentFixture<RecordLinkedRecordsComponent>

  beforeEach(() => MockBuilder(RecordLinkedRecordsComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordLinkedRecordsComponent],
      providers: [
        MockProvider(MdViewFacade, {
          sources$: new BehaviorSubject([]),
          sourceOf$: new BehaviorSubject([]),
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordLinkedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
