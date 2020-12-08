import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisProgressIllustrationGatheringInfoComponent } from './analysis-progress-illustration-gathering-info.component'

describe('AnalysisProgressIllustrationGatheringInfoComponent', () => {
  let component: AnalysisProgressIllustrationGatheringInfoComponent
  let fixture: ComponentFixture<AnalysisProgressIllustrationGatheringInfoComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressIllustrationGatheringInfoComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AnalysisProgressIllustrationGatheringInfoComponent
    )
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
