import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject } from 'rxjs'
import { RecordOtherlinksComponent } from './record-otherlinks.component'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('RecordOtherlinksComponent', () => {
  let component: RecordOtherlinksComponent
  let fixture: ComponentFixture<RecordOtherlinksComponent>

  beforeEach(() => MockBuilder(RecordOtherlinksComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MdViewFacade, {
          otherLinks$: new BehaviorSubject([]),
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordOtherlinksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
