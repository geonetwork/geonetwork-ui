import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummarizeBackgroundComponent } from './summarize-background.component'

describe('SummarizeBackgroundComponent', () => {
  let component: SummarizeBackgroundComponent
  let fixture: ComponentFixture<SummarizeBackgroundComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarizeBackgroundComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeBackgroundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
