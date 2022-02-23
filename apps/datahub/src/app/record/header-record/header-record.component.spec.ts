import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { HeaderRecordComponent } from './header-record.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const routerFacadeMock = {
  goToSearch: jest.fn(),
}
const searchFacadeMock = {
  searchFilters$: new BehaviorSubject({ any: 'scot' }),
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
        { provide: SearchFacade, useValue: searchFacadeMock },
        {
          provide: RouterFacade,
          useValue: routerFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('#back', () => {
    it('router route to serach with any filter', () => {
      component.back()
      expect(routerFacadeMock.goToSearch).toHaveBeenCalledWith('scot')
    })
  })
})
