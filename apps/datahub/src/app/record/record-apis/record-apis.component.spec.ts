import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { RecordApisComponent } from './record-apis.component'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

class MdViewFacadeMock {
  apiLinks$ = new Subject()
}

describe('DataApisComponent', () => {
  let component: RecordApisComponent
  let fixture: ComponentFixture<RecordApisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordApisComponent],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordApisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
