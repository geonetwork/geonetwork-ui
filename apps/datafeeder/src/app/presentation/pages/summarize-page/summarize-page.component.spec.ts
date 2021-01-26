import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SummarizePageComponent } from './summarize-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

describe('SummarizePageComponent', () => {
  let component: SummarizePageComponent
  let fixture: ComponentFixture<SummarizePageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummarizePageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
