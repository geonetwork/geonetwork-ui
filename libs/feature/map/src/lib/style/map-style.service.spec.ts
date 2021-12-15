import { TestBed } from '@angular/core/testing'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import chroma from 'chroma-js'
import CircleStyle from 'ol/style/Circle'
import Style from 'ol/style/Style'

import { MapStyleService } from './map-style.service'

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

  describe('#createStyle', () => {
    describe('when options are given', () => {
      let style, circle, stroke, fill
      beforeEach(() => {
        const options = {
          color: 'red',
          width: 5,
          radius: 2,
        }
        style = service.createStyle(options)
      })
      it('creates 1 style', () => {
        expect(style).toBeInstanceOf(Style)
      })
      describe('creates a circle', () => {
        beforeEach(() => {
          circle = style.getImage()
        })
        it('has correct radius', () => {
          expect(circle.getRadius()).toBe(2)
        })
        it('has correct fill color', () => {
          expect(circle.getFill().getColor()).toBe('red')
        })
        it('has correct stroke color and width', () => {
          expect(circle.getStroke().getColor()).toBe('white')
          expect(circle.getStroke().getWidth()).toBe(5)
        })
      })
      describe('creates a fill', () => {
        beforeEach(() => {
          fill = style.getFill()
        })
        it('has correct color', () => {
          expect(fill.getColor()).toBe(chroma('red').alpha(0.25).css())
        })
      })
      describe('creates a stroke', () => {
        beforeEach(() => {
          stroke = style.getStroke()
        })
        it('has correct color', () => {
          expect(stroke.getColor()).toBe('white')
        })
        it('has correct width', () => {
          expect(stroke.getWidth()).toBe(5)
        })
      })
    })
    describe('when no option is given', () => {
      let style
      beforeEach(() => {
        style = service.createStyle()
      })
      it('uses default width (2)', () => {
        expect(style.getImage().getStroke().getWidth()).toBe(2)
        expect(style.getStroke().getWidth()).toBe(2)
      })
      it('uses default radius (7)', () => {
        expect(style.getImage().getRadius()).toBe(7)
      })
      it('uses default PRIMARY_COLOR from ThemeConfig', () => {
        expect(style.getImage().getFill().getColor()).toBe(
          getThemeConfig().PRIMARY_COLOR
        )
        expect(style.getImage().getFill().getColor()).toBe('blue')
        expect(style.getFill().getColor()).toBe('rgba(0,0,255,0.25)')
      })
      it('set the default style of the service', () => {
        expect(service.styles.default).toEqual(style)
      })
    })
  })

  describe('#createHLFromStyle', () => {
    describe('when options are given', () => {
      let style, styleHL, circle, stroke, fill
      beforeEach(() => {
        style = service.createStyle()
        styleHL = service.createHLFromStyle(style, 'black')
        circle = styleHL.getImage() as CircleStyle
      })
      it('creates 1 style', () => {
        expect(styleHL).toBeInstanceOf(Style)
      })
      describe('overrides source style properties', () => {
        it('has radius + 1', () => {
          expect(circle.getRadius()).toBe(8)
        })
        it('changes the fill color', () => {
          expect(circle.getFill().getColor()).toBe('black')
          expect(styleHL.getFill().getColor()).toBe('rgba(0,0,0,0.25)')
        })
        it('has width + 1', () => {
          expect(circle.getStroke().getWidth()).toBe(3)
        })
        it('set zIndex', () => {
          expect(style.getZIndex()).toBe(10)
        })
      })
    })
  })
  describe('default styles', () => {
    describe('when options are given', () => {
      let style, styleHL, circle, stroke, fill
      beforeEach(() => {
        style = service.createStyle()
        styleHL = service.createHLFromStyle(style, 'black')
        circle = styleHL.getImage() as CircleStyle
      })
      it('set default style with PRIMARY color', () => {
        expect(service.styles.default).toEqual(service.createStyle())
      })
      it('set default highlight style with SECONDARY color', () => {
        expect(service.styles.defaultHL).toEqual(
          service.createHLFromStyle(
            service.createStyle(),
            getThemeConfig().SECONDARY_COLOR
          )
        )
      })
    })
  })
})
