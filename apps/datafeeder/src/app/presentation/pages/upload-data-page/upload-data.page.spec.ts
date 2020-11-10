import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataPageComponent } from './upload-data.page'

describe('UploadDataComponent', () => {
  let component: UploadDataPageComponent
  let fixture: ComponentFixture<UploadDataPageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataPageComponent],
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
