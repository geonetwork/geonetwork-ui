import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchService } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'

import { HeaderRecordComponent } from './header-record.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
}))

const searchServiceMock = {
  updateFilters: jest.fn(),
}
describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRecordComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
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
    it('searchFilter updateSearch', () => {
      component.back()
      expect(searchServiceMock.updateFilters).toHaveBeenCalledWith({})
    })
  })
})
