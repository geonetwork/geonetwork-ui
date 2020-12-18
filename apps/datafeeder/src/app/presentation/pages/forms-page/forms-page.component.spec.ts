import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsPageComponent } from './forms-page.component'

describe('FormsPageComponent', () => {
  let component: FormsPageComponent
  let fixture: ComponentFixture<FormsPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormsPageComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
