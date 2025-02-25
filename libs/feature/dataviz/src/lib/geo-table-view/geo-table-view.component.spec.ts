import { ChangeDetectorRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { pointFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import { GeoTableViewComponent } from './geo-table-view.component'
import { MockBuilder } from 'ng-mocks'

// FIXME: these tests should be restored once there is a possibility to clone
// a Reader (from the data-fetcher); currently the component is broken
describe.skip('GeoTableViewComponent', () => {
  let component: GeoTableViewComponent
  let fixture: ComponentFixture<GeoTableViewComponent>

  beforeEach(() => MockBuilder(GeoTableViewComponent))

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTableViewComponent)
    component = fixture.componentInstance
    component.data = pointFeatureCollectionFixture()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('init', () => {
    it('data for the table', () => {
      expect(component.tableData).toEqual(
        component.data.features.map((f) => ({
          id: f.id,
          ...f.properties,
        }))
      )
    })

    it('map context', () => {
      expect(component.mapContext).toEqual({
        layers: [
          {
            type: 'xyz',
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          },
          {
            type: 'geojson',
            data: component.data,
          },
        ],
        view: {
          center: [0, 0],
          zoom: 2,
        },
      })
    })
    it('map objects', () => {
      expect(component['features'].length).toBe(
        pointFeatureCollectionFixture().features.length
      )
    })
  })

  describe('#onTableSelect', () => {
    let tableEntry
    beforeEach(() => {
      tableEntry = {
        id: 1,
        name: 'feature 1',
      }
      component.onTableSelect(tableEntry)
    })
    it('set the selection', () => {
      expect(component.selectionId).toBe(1)
      expect(component.selection).toEqual(
        pointFeatureCollectionFixture().features.find((f) => f.id === 1)
      )
    })
    it('zoom on feature', () => {
      expect(component.mapContext.view).toEqual({
        geometry: {
          coordinates: [2.335333, 51.070817],
          type: 'Point',
        },
        maxZoom: 13,
      })
    })
  })

  describe('#onMapFeatureSelect', () => {
    let features
    beforeEach(() => {
      features = [
        pointFeatureCollectionFixture().features.find((f) => f.id === 2),
      ]
      const changeDetectorRef =
        fixture.debugElement.injector.get(ChangeDetectorRef)
      jest.spyOn(changeDetectorRef.constructor.prototype, 'detectChanges')
      component.onMapFeatureSelect(features)
    })
    it('set the selection', () => {
      expect(component.selectionId).toBe(2)
      expect(component.selection).toBe(features[0])
    })
    it('layer is refreshed', () => {
      // expect(component['vectorLayer'].changed).toHaveBeenCalled()
      expect(component['changeRef'].detectChanges).toHaveBeenCalled()
    })
  })
})
