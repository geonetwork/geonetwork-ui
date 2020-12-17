import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FileUploadApiService } from '@lib/datafeeder-api'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'

import { UploadDataComponent } from './upload-data.component'

const fileUploadApiServiceMock = {
  uploadFiles: jest.fn(() =>
    of({
      jobId: 12,
    })
  ),
}

describe('UploadDataComponent', () => {
  let component: UploadDataComponent
  let fixture: ComponentFixture<UploadDataComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDataComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FileUploadApiService,
          useValue: fileUploadApiServiceMock,
        },
      ],
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
