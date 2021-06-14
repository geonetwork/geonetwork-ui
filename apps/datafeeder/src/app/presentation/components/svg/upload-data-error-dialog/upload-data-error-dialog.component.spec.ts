import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

import { UploadDataErrorDialogComponent } from './upload-data-error-dialog.component'

describe('UploadDataErrorDialogComponent', () => {
  let component: UploadDataErrorDialogComponent
  let fixture: ComponentFixture<UploadDataErrorDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilI18nModule, TranslateModule.forRoot()],
      declarations: [UploadDataErrorDialogComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataErrorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
