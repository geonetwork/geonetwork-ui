import { ComponentFixture, TestBed } from '@angular/core/testing'
import { summaryHits } from '@geonetwork-ui/util/shared'
import { of } from 'rxjs'
import { LastCreatedComponent } from './last-created.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class SearchFacadeMock {
  init = jest.fn()
  results$ = of(summaryHits)
  setPagination = jest.fn()
  setSortBy = jest.fn()
  setConfigRequestFields = jest.fn()
  setResultsLayout = jest.fn()
}

describe('LastCreatedComponent', () => {
  let component: LastCreatedComponent
  let fixture: ComponentFixture<LastCreatedComponent>
  let facade: SearchFacade
  let de

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastCreatedComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    facade = TestBed.inject(SearchFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCreatedComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('get results on init', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('Should set the correct params in the facade', () => {
      expect(facade.init).toHaveBeenCalled()
      expect(facade.setPagination).toHaveBeenCalledWith(0, 10)
      expect(facade.setSortBy).toHaveBeenCalledWith('-createDate')
      expect(facade.setConfigRequestFields).toHaveBeenCalledWith({
        includes: expect.arrayContaining([
          'uuid',
          'id',
          'title',
          'createDate',
          'changeDate',
        ]),
      })
    })
  })
})
