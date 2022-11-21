import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '../state/search.facade'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'
import { SearchService } from '../utils/service/search.service'
import { SortByComponent } from './sort-by.component'

const sortBySubject = new BehaviorSubject('title')
const facadeMock = {
  sortBy$: sortBySubject,
  setSortBy: jest.fn(),
}

const searchServiceMock = {
  updateSearchFilters: jest.fn(),
  setSortBy: jest.fn(),
}

@Component({
  selector: 'gn-ui-dropdown-selector',
  template: '<div></div>',
})
export class MockDropdownSelectorComponent {
  @Input() choices: unknown[]
  @Input() selected: any
}

describe('SortByComponent', () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortByComponent, MockDropdownSelectorComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchFacade,
          useValue: facadeMock,
        },
        {
          provide: SearchService,
          useValue: searchServiceMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('dropwdown value', () => {
    let dropDownComponent: MockDropdownSelectorComponent
    beforeEach(() => {
      dropDownComponent = fixture.debugElement.query(
        By.directive(MockDropdownSelectorComponent)
      ).componentInstance
    })
    it('choices from component', () => {
      expect(dropDownComponent.choices).toEqual(component.choices)
    })
    it('initialized with state value', () => {
      expect(dropDownComponent.selected).toEqual('title')
    })
    it('updated from state', () => {
      sortBySubject.next('_score')
      fixture.detectChanges()
      expect(dropDownComponent.selected).toEqual('_score')
    })
  })
  describe('#changeSortBy', () => {
    let sort
    describe('when sort is a string', () => {
      beforeEach(() => {
        sort = '_score'
        component.changeSortBy(sort)
      })
      it('dispatch search action', () => {
        expect(searchServiceMock.setSortBy).toHaveBeenCalledWith(sort)
      })
    })
    describe('when sort is not a string', () => {
      beforeEach(() => {
        sort = { title: 'desc' }
      })
      it('dispatch search action', () => {
        expect(() => component.changeSortBy(sort)).toThrowError()
      })
    })
  })
})
