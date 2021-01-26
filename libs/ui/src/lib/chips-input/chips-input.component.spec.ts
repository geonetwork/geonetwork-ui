import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChipsInputComponent } from './chips-input.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('ChipsInputComponent', () => {
  let component: ChipsInputComponent
  let fixture: ComponentFixture<ChipsInputComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsInputComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
