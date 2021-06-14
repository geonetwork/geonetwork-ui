import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataBackgroundComponent } from './upload-data-background.component'

describe('UploadDataBackgroundComponent', () => {
  let component: UploadDataBackgroundComponent
  let fixture: ComponentFixture<UploadDataBackgroundComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDataBackgroundComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataBackgroundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
