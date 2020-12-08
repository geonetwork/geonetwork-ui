import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisProgressIllustrationDetectFileFormatComponent } from './analysis-progress-illustration-detect-file-format.component'

describe('AnalysisProgressIllustrationDetectFileFormatComponent', () => {
  let component: AnalysisProgressIllustrationDetectFileFormatComponent
  let fixture: ComponentFixture<AnalysisProgressIllustrationDetectFileFormatComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressIllustrationDetectFileFormatComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AnalysisProgressIllustrationDetectFileFormatComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
