import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchFacade } from '../state/search.facade'

import { FilterDropdownComponent } from './filter-dropdown.component'


class SearchFacadeMock {
  updateFilters = jest.fn()
}

@Component({
  selector: 'gn-ui-dropdown-multiselect',
  template: '<div></div>',
})
export class DropdownComponentMock {
  @Input() title: string
  @Input() ariaName: string
  @Input() choices: {
    value: unknown
    label: string
  }[]
  @Input() selected: unknown[]
  @Output() selectValues = new EventEmitter<unknown[]>()
}

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent
  let dropdown: DropdownComponentMock
  let facade: SearchFacade
  let fixture: ComponentFixture<FilterDropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDropdownComponent, DropdownComponentMock],
      providers: [{
        provide: SearchFacade,
        useClass: SearchFacadeMock
      }]
    }).compileComponents()

    fixture = TestBed.createComponent(FilterDropdownComponent)
    facade = TestBed.inject(SearchFacade)
    component = fixture.componentInstance
    component.fieldName = "Org"
    dropdown = fixture.debugElement.query(By.directive(DropdownComponentMock)).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when selected values change', () => {
    beforeEach(() => {
      dropdown.selectValues.emit(['org1', 'org2', 34])
    })
    it('calls updateFilters on the search facade', () => {
      expect(facade.updateFilters).toHaveBeenCalledWith({
        Org: { org1: true, org2: true, 34: true }
      })
    })
  })
  // describe('when no values are selected', () => {
  //   beforeEach(() => {
  //     dropdown.selectValues.emit([])
  //   })
  //   it('clears the filter on the search facade', () => {
  //     expect(facade.updateFilters).toHaveBeenCalledWith({
  //       Org: undefined
  //     })
  //   })
  // })
})
