import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisProgressIllustrationUpoadComponent } from './analysis-progress-illustration-upoad.component'

describe('AnalysisProgressIllustrationUpoadComponent', () => {
  let component: AnalysisProgressIllustrationUpoadComponent
  let fixture: ComponentFixture<AnalysisProgressIllustrationUpoadComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressIllustrationUpoadComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AnalysisProgressIllustrationUpoadComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
