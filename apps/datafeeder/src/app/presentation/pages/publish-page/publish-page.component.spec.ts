import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PublishPageComponent } from './publish-page.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { UiModule } from '@lib/ui'

describe('SumUpPageComponent', () => {
  let component: PublishPageComponent
  let fixture: ComponentFixture<PublishPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublishPageComponent],
      imports: [UiModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
