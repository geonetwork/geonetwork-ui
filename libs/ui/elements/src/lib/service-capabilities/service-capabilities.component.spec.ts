import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ServiceCapabilitiesComponent } from './service-capabilities.component'
import { WfsFeatureTypeFull, WmsLayerFull } from '@camptocamp/ogc-client'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ServiceCapabilitiesComponent', () => {
  let component: ServiceCapabilitiesComponent
  let fixture: ComponentFixture<ServiceCapabilitiesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(ServiceCapabilitiesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('searchLayers', () => {
    it('should filter layers by title or abstract', () => {
      component.availableLayers = [
        { title: 'Layer 1', abstract: 'Abstract 1' },
        { title: 'Layer 2', abstract: 'Abstract 2' },
        { name: 'Layer 3' },
      ]
      component.searchQuery = 'Layer'

      component.searchLayers()

      expect(component.filteredLayers.length).toBe(3)
    })

    it('should filter layers by name if title is not present', () => {
      component.availableLayers = [
        { name: 'Layer 3' },
        { name: 'Another Layer' },
      ]
      component.searchQuery = 'Layer'

      component.searchLayers()

      expect(component.filteredLayers.length).toBe(2)
    })
  })

  describe('selectLayer', () => {
    it('should select a layer and update layerInformation with available keys', () => {
      // Define a mock layer with some of the keys present
      const layer = {
        title: 'Sample Layer',
        abstract: 'This is a sample layer.',
        defaultCrs: 'EPSG:4326',
        availableCrs: ['EPSG:4326', 'EPSG:3857'],
        styles: [],
        boundingBoxes: null,
        queryable: true,
        opaque: false,
      } as WmsLayerFull

      // Call the selectLayer method with the mock layer
      component.selectLayer(layer)

      // Define the expected layerInformation based on the mock layer
      const expectedLayerInformation = [
        {
          displayName: 'service.metadata.capabilities.title',
          value: 'Sample Layer',
        },
        {
          displayName: 'service.metadata.capabilities.abstract',
          value: 'This is a sample layer.',
        },
        {
          displayName: 'service.metadata.capabilities.defaultCrs',
          value: 'EPSG:4326',
        },
        {
          displayName: 'service.metadata.capabilities.availableCrs',
          value: ['EPSG:4326', 'EPSG:3857'],
        },
      ]

      // Assert that the layerInformation is updated correctly
      expect(component.layerInformation).toEqual(expectedLayerInformation)
      expect(component.selectedLayer).toBe(layer)
    })

    it('should deselect a layer if the same layer is selected again', () => {
      const layer = {
        title: 'Sample Layer',
        abstract: 'This is a sample layer.',
      } as WfsFeatureTypeFull

      component.selectLayer(layer)
      expect(component.selectedLayer).toBe(layer)
      expect(component.layerInformation.length).toBeGreaterThan(0)

      component.selectLayer(layer)
      expect(component.selectedLayer).toBeNull()
      expect(component.layerInformation.length).toBe(0)
    })
  })
})
