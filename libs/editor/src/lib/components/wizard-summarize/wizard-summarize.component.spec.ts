import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardSummarizeComponent } from './wizard-summarize.component'

describe('WizardSummarizeComponent', () => {
  let component: WizardSummarizeComponent
  let fixture: ComponentFixture<WizardSummarizeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardSummarizeComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSummarizeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
