import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromCatalogComponent } from './add-layer-from-catalog.component'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { MockBuilder, MockProvider } from 'ng-mocks'

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

  beforeEach(() => {
    return MockBuilder(AddLayerFromCatalogComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLayerFromCatalogComponent],
    })
      .overrideComponent(AddLayerFromCatalogComponent, {
        set: {
          providers: [
            MockProvider(SearchFacade, SearchFacadeMock, 'useClass'),
            MockProvider(SearchService, SearchServiceMock, 'useClass'),
          ],
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLayerFromCatalogComponent)
    component = fixture.componentInstance
    searchFacade = component['searchFacade']
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
