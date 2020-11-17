import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataPageComponent } from './upload-data.page'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

describe('UploadDataComponent', () => {
  let component: UploadDataPageComponent
  let fixture: ComponentFixture<UploadDataPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataPageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
