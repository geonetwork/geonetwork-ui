import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SummarizePageComponent } from './summarize-page.component'

describe('SummarizePageComponent', () => {
  let component: SummarizePageComponent
  let fixture: ComponentFixture<SummarizePageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummarizePageComponent],
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
