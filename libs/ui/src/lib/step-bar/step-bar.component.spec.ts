import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StepBarComponent } from './step-bar.component'

describe('StepBarComponent', () => {
  let component: StepBarComponent
  let fixture: ComponentFixture<StepBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepBarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
