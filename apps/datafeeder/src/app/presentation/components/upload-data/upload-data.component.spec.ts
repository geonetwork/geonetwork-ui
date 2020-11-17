import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataComponent } from './upload-data.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('UploadDataComponent', () => {
  let component: UploadDataComponent
  let fixture: ComponentFixture<UploadDataComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
