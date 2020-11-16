import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AnalysisProgressPageComponent } from './analysis-progress.page'

describe('AnalysisProgress.PageComponent', () => {
  let component: AnalysisProgressPageComponent
  let fixture: ComponentFixture<AnalysisProgressPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressPageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisProgressPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
