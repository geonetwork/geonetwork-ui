import { ComponentFixture, TestBed } from '@angular/core/testing'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { TranslateModule } from '@ngx-translate/core'

import { HeaderRecordComponent } from './header-record.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
}))

describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>

  beforeEach(() => MockBuilder(HeaderRecordComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [MockProvider(MdViewFacade)],
    }).compileComponents()
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
})
