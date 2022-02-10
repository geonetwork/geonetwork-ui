import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { SearchHeaderComponent } from './search-header.component'

class RouterFacadeMock {
  goToMetadata = jest.fn()
  anySearch$ = new BehaviorSubject('scot')
}
class SearchFacadeMock {}
/* eslint-disable */
@Component({
  selector: 'gn-ui-fuzzy-search',
  template: '',
})
class FuzzySearchComponentMock {
  @Input() initialValue?: MetadataRecord
}
/* eslint-enable */

describe('HeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [SearchHeaderComponent, FuzzySearchComponentMock],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RouterFacade,
          useClass: RouterFacadeMock,
        },
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderComponent)
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
      expect(fuzzyCpt.initialValue).toEqual({ title: 'scot' })
    })
  })
})
