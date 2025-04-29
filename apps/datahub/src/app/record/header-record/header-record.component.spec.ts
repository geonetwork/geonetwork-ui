import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  datasetRecordsFixture,
  SAMPLE_RECORD,
} from '@geonetwork-ui/common/fixtures'
import { TranslateModule } from '@ngx-translate/core'

import { HeaderRecordComponent } from './header-record.component'
import { MockBuilder } from 'ng-mocks'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject } from 'rxjs'
import { ImageOverlayPreviewComponent } from '@geonetwork-ui/ui/elements'
import { By } from '@angular/platform-browser'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
}))

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(SAMPLE_RECORD)
  downloadLinks$ = new BehaviorSubject([])
  apiLinks$ = new BehaviorSubject([])
  otherLinks$ = new BehaviorSubject([])
  related$ = new BehaviorSubject(null)
  error$ = new BehaviorSubject(null)
  isMetadataLoading$ = new BehaviorSubject(false)
}

describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>
  let facade

  beforeEach(() => MockBuilder(HeaderRecordComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecordComponent)
    component = fixture.componentInstance
    component.metadata = {
      ...datasetRecordsFixture()[0],
    } as DatasetRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Image Overlay Preview', () => {
    describe('if metadata with overview', () => {
      let imgOverlayPreview: ImageOverlayPreviewComponent
      beforeEach(() => {
        facade.isPresent$.next(true)
        fixture.detectChanges()
        imgOverlayPreview = fixture.debugElement.query(
          By.directive(ImageOverlayPreviewComponent)
        ).componentInstance
      })
      describe('and url defined', () => {
        it('should send the imageUrl to imgOverlayPreview component', () => {
          expect(imgOverlayPreview).toBeTruthy()
          expect(imgOverlayPreview.imageUrl).toBeDefined()
        })
      })
    })
  })
})
