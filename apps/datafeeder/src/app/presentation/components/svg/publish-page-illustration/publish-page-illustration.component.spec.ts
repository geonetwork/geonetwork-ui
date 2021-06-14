import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PublishPageIllustrationComponent } from './publish-page-illustration.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('SumUpPageIllustrationComponent', () => {
  let component: PublishPageIllustrationComponent
  let fixture: ComponentFixture<PublishPageIllustrationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishPageIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPageIllustrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
