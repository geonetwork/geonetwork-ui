import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { Subject } from 'rxjs'

import { HeaderRecordComponent } from './header-record.component'

class MdViewFacadeMock {
  metadata$ = new Subject()
  isPresent$ = new Subject()
}
describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRecordComponent],
      providers: [{ provide: MdViewFacade, useClass: MdViewFacadeMock }],
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
