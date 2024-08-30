import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { SearchService } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { HeaderRecordComponent } from './header-record.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
}))

const searchServiceMock = {
  updateFilters: jest.fn(),
}

class MdViewFacadeMock {
  mapApiLinks$ = new BehaviorSubject([])
  geoDataLinks$ = new BehaviorSubject([])
}

describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRecordComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SearchService, useValue: searchServiceMock },
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecordComponent)
    component = fixture.componentInstance
    component.metadata = {
      ...datasetRecordsFixture()[0],
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#back', () => {
    it('searchFilter updateSearch', () => {
      component.back()
      expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({})
    })
  })
})
