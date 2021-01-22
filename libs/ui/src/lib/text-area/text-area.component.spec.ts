import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TextAreaComponent } from './text-area.component'

describe('TextAreaComponent', () => {
  let component: TextAreaComponent
  let fixture: ComponentFixture<TextAreaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
