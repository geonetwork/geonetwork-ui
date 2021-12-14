import { TestBed } from '@angular/core/testing'
import { getThemeConfig, isConfigLoaded } from '@geonetwork-ui/util/app-config'
import chroma from 'chroma-js'
import Style from 'ol/style/Style'

import { MapStyleService } from './map-style.service'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    PRIMARY_COLOR: 'blue',
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

  describe('#createDefaultStyle', () => {
    describe('when options are given', () => {
      let styles, style, circle, stroke, fill
      beforeEach(() => {
        const options = {
          color: 'red',
          width: 5,
          radius: 2,
        }
        styles = service.createDefaultStyle(options)
        style = styles[0]
      })
      it('creates an array of 1 style', () => {
        expect(styles).toBeInstanceOf(Array)
        expect(styles.length).toBe(1)
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
      let styles, style
      beforeEach(() => {
        styles = service.createDefaultStyle()
        style = styles[0]
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
    })
  })
})
