import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisProgressIllustrationsComponent } from './analysis-progress-illustrations.component'

describe('AnalysisProgressIllustrationsComponent', () => {
  let component: AnalysisProgressIllustrationsComponent
  let fixture: ComponentFixture<AnalysisProgressIllustrationsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysisProgressIllustrationsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisProgressIllustrationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
