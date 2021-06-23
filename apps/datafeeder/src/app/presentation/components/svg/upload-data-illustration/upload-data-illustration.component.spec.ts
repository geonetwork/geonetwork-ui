import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UploadDataIllustrationComponent } from './upload-data-illustration.component'

describe('UploadDataIllustrationComponent', () => {
  let component: UploadDataIllustrationComponent
  let fixture: ComponentFixture<UploadDataIllustrationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDataIllustrationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataIllustrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
