import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromCatalogComponent } from './add-layer-from-catalog.component'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class SearchFacadeMock {
  init = jest.fn()
  setConfigRequestFields = jest.fn()
  setFilters = jest.fn()
}
class SearchServiceMock {}

describe('AddLayerFromCatalogComponent', () => {
  let component: AddLayerFromCatalogComponent
  let fixture: ComponentFixture<AddLayerFromCatalogComponent>
  let searchFacade: SearchFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLayerFromCatalogComponent],
      providers: [{ provide: SearchFacade, useClass: SearchFacadeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(AddLayerFromCatalogComponent, {
        set: {
          providers: [
            {
              provide: SearchService,
              useClass: SearchServiceMock,
            },
          ],
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    searchFacade = TestBed.inject(SearchFacade)
    fixture = TestBed.createComponent(AddLayerFromCatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initialization', () => {
    it('should initialize the facade', () => {
      expect(searchFacade.init).toHaveBeenCalledWith('map-add-layer')
      expect(searchFacade.setConfigRequestFields).toHaveBeenCalledWith(
        expect.arrayContaining(['link'])
      )
      expect(searchFacade.setFilters).toHaveBeenCalledWith({
        availableInServices: '+linkProtocol:/OGC:WMS.*/',
      })
    })
  })
})
