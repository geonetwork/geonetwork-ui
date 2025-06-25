import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SpatialExtentComponent } from './spatial-extent.component'
import { MockBuilder } from 'ng-mocks'
import { firstValueFrom } from 'rxjs'
import { createViewFromLayer } from '@geospatial-sdk/core'

jest.mock('@geospatial-sdk/core', () => ({
  createViewFromLayer: jest.fn(() => {
    return Promise.resolve({
      zoom: 3,
      center: [3, 4],
    })
  }),
}))

describe('FormFieldMapContainerComponent', () => {
  let component: SpatialExtentComponent
  let fixture: ComponentFixture<SpatialExtentComponent>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    return MockBuilder(SpatialExtentComponent)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents()

    fixture = TestBed.createComponent(SpatialExtentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('initial context is null (default map)', async () => {
    const context = await firstValueFrom(component.mapContext$)
    expect(context).toEqual(null)
  })

  it('should remove previous layer and add a new layer with geometries', async () => {
    component.spatialExtents = [
      {
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [0, 1],
              [1, 1],
              [1, 0],
              [0, 0],
            ],
          ],
        },
      },
    ]
    const context = await firstValueFrom(component.mapContext$)
    expect(context).toEqual({
      layers: [
        {
          data: {
            features: [
              {
                geometry: {
                  coordinates: [
                    [
                      [0, 0],
                      [0, 1],
                      [1, 1],
                      [1, 0],
                      [0, 0],
                    ],
                  ],
                  type: 'Polygon',
                },
                properties: {},
                type: 'Feature',
              },
            ],
            type: 'FeatureCollection',
          },
          label: 'Spatial extents',
          style: {
            'stroke-color': 'black',
            'stroke-width': 2,
            'fill-color': 'rgba(153, 153, 153, 0.3)',
          },
          type: 'geojson',
        },
      ],
      view: {
        center: [3, 4],
        zoom: 3,
      },
    })
    expect(createViewFromLayer).toHaveBeenCalledWith(context.layers[0])
  })

  it('should remove previous layer and add a new layer with bbox', async () => {
    component.spatialExtents = [
      {
        bbox: [0, 0, 1, 1],
      },
    ]
    const context = await firstValueFrom(component.mapContext$)
    expect(context).toEqual({
      layers: [
        {
          data: {
            features: [
              {
                geometry: {
                  coordinates: [
                    [
                      [0, 0],
                      [0, 1],
                      [1, 1],
                      [1, 0],
                      [0, 0],
                    ],
                  ],
                  type: 'Polygon',
                },
                properties: {},
                type: 'Feature',
              },
            ],
            type: 'FeatureCollection',
          },
          label: 'Spatial extents',
          style: {
            'stroke-color': 'black',
            'stroke-width': 2,
            'fill-color': 'rgba(153, 153, 153, 0.3)',
          },
          type: 'geojson',
        },
      ],
      view: {
        center: [3, 4],
        zoom: 3,
      },
    })
    expect(createViewFromLayer).toHaveBeenCalledWith(context.layers[0])
  })

  it('should transform bbox to geometry', () => {
    const bbox = [0, 0, 1, 1] as [number, number, number, number]
    const geometry = component.bboxCoordsToGeometry(bbox)

    expect(geometry.type).toEqual('Polygon')
    expect(geometry).toEqual({
      coordinates: [
        [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
          [0, 0],
        ],
      ],
      type: 'Polygon',
    })
  })
})
