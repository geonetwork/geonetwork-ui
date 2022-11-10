import { TestBed } from '@angular/core/testing'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import chroma from 'chroma-js'
import Style, { StyleFunction } from 'ol/style/Style'
import { MapStyleService, StyleByGeometryType } from './map-style.service'
import Feature from 'ol/Feature'
import { LineString, Point, Polygon } from 'ol/geom'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    PRIMARY_COLOR: 'blue',
    SECONDARY_COLOR: 'red',
  }),
  isConfigLoaded: jest.fn(() => true),
}))

describe('MapStyleService', () => {
  let service: MapStyleService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MapStyleService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#createGeometryStyles', () => {
    let styles: StyleByGeometryType
    let pointStyle
    let lineStyle
    let polygonStyle

    describe('unfocused style', () => {
      beforeEach(() => {
        const options = {
          color: 'orange',
        }
        styles = service.createGeometryStyles(options)
        pointStyle = styles.point
        lineStyle = styles.line
        polygonStyle = styles.polygon
      })
      describe('point style', () => {
        it('has 1 style', () => {
          expect(pointStyle).toBeInstanceOf(Style)
        })
        it('has correct radius', () => {
          expect(pointStyle.getImage().getRadius()).toBe(7)
        })
        it('has correct fill color', () => {
          expect(pointStyle.getImage().getFill().getColor()).toBe('orange')
        })
        it('has correct stroke color and width', () => {
          expect(pointStyle.getImage().getStroke().getColor()).toBe('white')
          expect(pointStyle.getImage().getStroke().getWidth()).toBe(2)
        })
      })
      describe('polygon style', () => {
        it('has 1 style', () => {
          expect(polygonStyle).toBeInstanceOf(Style)
        })
        it('has correct fill color', () => {
          expect(polygonStyle.getFill().getColor()).toBe(
            chroma('orange').alpha(0.25).css()
          )
        })
        it('has correct stroke color and width', () => {
          expect(polygonStyle.getStroke().getColor()).toBe('white')
          expect(polygonStyle.getStroke().getWidth()).toBe(2)
        })
      })
      describe('line style', () => {
        it('has 2 styles', () => {
          expect(lineStyle).toEqual([expect.any(Style), expect.any(Style)])
        })
        it('has correct color (back stroke)', () => {
          expect(lineStyle[0].getStroke().getColor()).toBe('white')
        })
        it('has correct width (back stroke)', () => {
          expect(lineStyle[0].getStroke().getWidth()).toBe(6)
        })
        it('has correct color (front stroke)', () => {
          expect(lineStyle[1].getStroke().getColor()).toBe('orange')
        })
        it('has correct width (front stroke)', () => {
          expect(lineStyle[1].getStroke().getWidth()).toBe(2)
        })
      })
    })
    describe('focused style', () => {
      beforeEach(() => {
        const options = {
          color: 'pink',
          isFocused: true,
        }
        styles = service.createGeometryStyles(options)
        pointStyle = styles.point
        lineStyle = styles.line
        polygonStyle = styles.polygon
      })
      describe('point style', () => {
        it('has correct radius', () => {
          expect(pointStyle.getImage().getRadius()).toBe(8)
        })
        it('has correct fill color', () => {
          expect(pointStyle.getImage().getFill().getColor()).toBe('pink')
        })
        it('has correct stroke color and width', () => {
          expect(pointStyle.getImage().getStroke().getColor()).toBe('white')
          expect(pointStyle.getImage().getStroke().getWidth()).toBe(3)
        })
      })
      describe('polygon style', () => {
        it('has correct fill color', () => {
          expect(polygonStyle.getFill().getColor()).toBe(
            chroma('pink').alpha(0.25).css()
          )
        })
        it('has correct stroke color and width', () => {
          expect(polygonStyle.getStroke().getColor()).toBe('white')
          expect(polygonStyle.getStroke().getWidth()).toBe(2)
        })
      })
      describe('line style', () => {
        it('has correct color (back stroke)', () => {
          expect(lineStyle[0].getStroke().getColor()).toBe('white')
        })
        it('has correct width (back stroke)', () => {
          expect(lineStyle[0].getStroke().getWidth()).toBe(8)
        })
        it('has correct color (front stroke)', () => {
          expect(lineStyle[1].getStroke().getColor()).toBe('pink')
        })
        it('has correct width (front stroke)', () => {
          expect(lineStyle[1].getStroke().getWidth()).toBe(3)
        })
      })
    })
  })

  describe('#createStyleFunction', () => {
    let styleFn
    let feature
    it('returns a function', () => {
      styleFn = service.createStyleFunction(
        service.createGeometryStyles({
          color: 'blue',
        })
      )
      feature = new Feature()
    })
    describe('with linestring geometry', () => {
      beforeEach(() => {
        feature.setGeometry(new LineString([]))
      })
      it('resolves to a double style with stroke', () => {
        const style = styleFn(feature, 1)
        expect(style).toEqual([expect.any(Style), expect.any(Style)])
        expect(style[0].getStroke()).toBeTruthy()
        expect(style[0].getFill()).toBeFalsy()
        expect(style[0].getImage()).toBeFalsy()
      })
    })
    describe('with point geometry', () => {
      beforeEach(() => {
        feature.setGeometry(new Point([]))
      })
      it('resolves to a style with image', () => {
        const style = styleFn(feature, 1)
        expect(style.getImage()).toBeTruthy()
        expect(style.getFill()).toBeFalsy()
        expect(style.getStroke()).toBeFalsy()
      })
    })
    describe('with polygon geometry', () => {
      beforeEach(() => {
        feature.setGeometry(new Polygon([]))
      })
      it('resolves to a style with fill and stroke', () => {
        const style = styleFn(feature, 1)
        expect(style.getFill()).toBeTruthy()
        expect(style.getStroke()).toBeTruthy()
        expect(style.getImage()).toBeFalsy()
      })
    })
  })

  describe('built-in styles', () => {
    let pointFeature, pointStyle
    beforeEach(() => {
      pointFeature = new Feature(new Point([]))
    })
    describe('default style', () => {
      beforeEach(() => {
        const styleFn = service.styles.default as StyleFunction
        pointStyle = styleFn(pointFeature, 1)
      })
      it('uses the primary theme color', () => {
        expect(pointStyle.getImage().getFill().getColor()).toEqual(
          getThemeConfig().PRIMARY_COLOR
        )
      })
    })
    describe('default highlight style', () => {
      beforeEach(() => {
        const styleFn = service.styles.defaultHL as StyleFunction
        pointStyle = styleFn(pointFeature, 1)
      })
      it('uses the secondary theme color', () => {
        expect(pointStyle.getImage().getFill().getColor()).toEqual(
          getThemeConfig().SECONDARY_COLOR
        )
      })
    })
  })
})
