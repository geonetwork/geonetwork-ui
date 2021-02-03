import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { I18nModule } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'

import { UploadDataErrorDialogComponent } from './upload-data-error-dialog.component'

describe('UploadDataErrorDialogComponent', () => {
  let component: UploadDataErrorDialogComponent
  let fixture: ComponentFixture<UploadDataErrorDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule, TranslateModule.forRoot()],
      declarations: [UploadDataErrorDialogComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataErrorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
