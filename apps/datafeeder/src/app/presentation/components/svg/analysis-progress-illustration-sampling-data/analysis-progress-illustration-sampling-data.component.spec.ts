import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisProgressIllustrationSamplingDataComponent } from './analysis-progress-illustration-sampling-data.component'

describe('AnalysisProgressIllustrationSamplingDataComponent', () => {
  let component: AnalysisProgressIllustrationSamplingDataComponent
  let fixture: ComponentFixture<AnalysisProgressIllustrationSamplingDataComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressIllustrationSamplingDataComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AnalysisProgressIllustrationSamplingDataComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
