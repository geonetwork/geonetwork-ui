import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { FormsPageComponent } from './forms-page.component'

describe('FormsPageComponent', () => {
  let component: FormsPageComponent
  let fixture: ComponentFixture<FormsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsPageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
