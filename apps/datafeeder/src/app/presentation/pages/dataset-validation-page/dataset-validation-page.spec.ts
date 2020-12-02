import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DatasetValidationPageComponent } from './dataset-validation-page'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

describe('DatasetValidationPageComponent', () => {
  let component: DatasetValidationPageComponent
  let fixture: ComponentFixture<DatasetValidationPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetValidationPageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetValidationPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
