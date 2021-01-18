import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardFieldComponent } from './wizard-field.component'

describe('WizardFieldsComponent', () => {
  let component: WizardFieldComponent
  let fixture: ComponentFixture<WizardFieldComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardFieldComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardFieldComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
