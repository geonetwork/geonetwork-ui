import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataPage } from './upload-data.page'

describe('UploadDataComponent', () => {
  let component: UploadDataPage
  let fixture: ComponentFixture<UploadDataPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataPage],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
