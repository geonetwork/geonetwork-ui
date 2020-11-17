import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AnalysisProgressPageComponent } from './analysis-progress.page'
import { UiModule } from '@lib/ui'
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('AnalysisProgress.PageComponent', () => {
  let component: AnalysisProgressPageComponent
  let fixture: ComponentFixture<AnalysisProgressPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisProgressPageComponent],
      imports: [UiModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
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
