import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'

import { DataOtherlinksComponent } from './data-otherlinks.component'

class MdViewFacadeMock {
  otherLinks$ = new Subject()
}
describe('DataOtherlinksComponent', () => {
  let component: DataOtherlinksComponent
  let fixture: ComponentFixture<DataOtherlinksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataOtherlinksComponent],
      providers: [{ provide: MdViewFacade, useClass: MdViewFacadeMock }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOtherlinksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
