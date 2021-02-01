import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SuccessPublishPageComponent } from './success-publish-page.component'
import { UiModule } from '@lib/ui'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('SuccessPublishPageComponent', () => {
  let component: SuccessPublishPageComponent
  let fixture: ComponentFixture<SuccessPublishPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPublishPageComponent],
      imports: [UiModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPublishPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
