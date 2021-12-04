import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { Subject } from 'rxjs'

import { HeaderRecordComponent } from './header-record.component'

class MdViewFacadeMock {
  metadata$ = new Subject()
  isPresent$ = new Subject()
}
class RouterFacadeMock {
  goToMetadata = jest.fn()
}

describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRecordComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MdViewFacade, useClass: MdViewFacadeMock },
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
