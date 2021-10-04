import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'
import { BehaviorSubject } from 'rxjs'
import { MdViewFacade } from '../state'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'

import { DataExportsComponent } from './data-exports.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_FULL_FIXTURE[0])
}

describe('DataExportsComponent', () => {
  let component: DataExportsComponent
  let fixture: ComponentFixture<DataExportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExportsComponent],
      imports: [UiElementsModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
