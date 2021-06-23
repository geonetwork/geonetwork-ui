import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SummarizeIllustrationComponent } from './summarize-illustration.component'

describe('SummarizeIllustrationComponent', () => {
  let component: SummarizeIllustrationComponent
  let fixture: ComponentFixture<SummarizeIllustrationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarizeIllustrationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeIllustrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
