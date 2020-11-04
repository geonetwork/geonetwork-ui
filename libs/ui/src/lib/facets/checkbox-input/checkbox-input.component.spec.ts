import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { CheckboxInputComponent } from './checkbox-input.component'

describe('CheckboxInputComponent', () => {
  let component: CheckboxInputComponent
  let fixture: ComponentFixture<CheckboxInputComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxInputComponent],
      imports: [FormsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
