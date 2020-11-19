import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DatasetValidationPageComponent } from './dataset-validation-page'

describe('DatasetValidationPageComponent', () => {
  let component: DatasetValidationPageComponent
  let fixture: ComponentFixture<DatasetValidationPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetValidationPageComponent],
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
