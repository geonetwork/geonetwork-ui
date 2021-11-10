import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainSearchComponent } from './main-search.component'
import { RouterFacade, SearchFacade } from '@geonetwork-ui/feature/search'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

class RouterFacadeMock {
  goToMetadata = jest.fn()
}

class SearchFacadeMock {
  setFilters = jest.fn(() => this)
  setResultsLayout = jest.fn(() => this)
}

describe('MainSearchComponent', () => {
  let component: MainSearchComponent
  let fixture: ComponentFixture<MainSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSearchComponent],
      imports: [UiLayoutModule],
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
    fixture = TestBed.createComponent(MainSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
