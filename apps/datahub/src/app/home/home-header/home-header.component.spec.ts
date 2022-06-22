import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { HomeHeaderComponent } from './home-header.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
  }),
}))

const routerFacadeMock = {
  goToMetadata: jest.fn(),
  anySearch$: new BehaviorSubject('scot'),
}
/* eslint-disable */
@Component({
  selector: 'gn-ui-fuzzy-search',
  template: '',
})
class FuzzySearchComponentMock {
  @Input() value?: MetadataRecord
}
/* eslint-enable */

describe('HeaderComponent', () => {
  let component: HomeHeaderComponent
  let fixture: ComponentFixture<HomeHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeHeaderComponent, FuzzySearchComponentMock],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useValue: routerFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('search route paramter', () => {
    it('passed to fuzzy search as AutoComplete item object', () => {
      const fuzzyCpt = fixture.debugElement.query(
        By.directive(FuzzySearchComponentMock)
      ).componentInstance
      expect(fuzzyCpt.value).toEqual({ title: 'scot' })
    })
    it('value is changed on route update', () => {
      routerFacadeMock.anySearch$.next('river')
      const fuzzyCpt = fixture.debugElement.query(
        By.directive(FuzzySearchComponentMock)
      ).componentInstance
      fixture.detectChanges()

      expect(fuzzyCpt.value).toEqual({ title: 'river' })
    })
  })
})
