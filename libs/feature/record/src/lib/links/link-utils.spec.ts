import { TestBed } from '@angular/core/testing'
import {
  getDownloadFormat,
  DownloadFormatType,
  checkFileFormat,
  getLinksWithEsriRestFormats,
} from './link-utils'

describe('link utils', () => {
  describe('#getDownloadFormat', () => {
    describe('for a FILE link', () => {
      it('returns download format', () => {
        expect(
          getDownloadFormat(
            {
              description: 'Test file',
              name: 'file.geojson',
              protocol: 'WWW:DOWNLOAD',
              url: 'http://example.com',
            },
            DownloadFormatType.FILE
          )
        ).toEqual('geojson')
      })
    }),
      describe('for a WFS link', () => {
        it('returns download format', () => {
          expect(
            getDownloadFormat(
              {
                description: 'Test service',
                name: 'some_layer',
                format: 'geojson',
                protocol: 'OGC:WFS',
                url: 'http://example.com/service',
              },
              DownloadFormatType.WFS
            )
          ).toEqual('WFS:geojson')
        })
      })
  }),
    describe('#checkFileFormat', () => {
      describe('in link name and url', () => {
        it('returns true for file format', () => {
          expect(
            checkFileFormat(
              {
                description: 'Test file',
                name: 'file.geojson',
                protocol: 'WWW:DOWNLOAD',
                url: 'http://example.com',
              },
              'geojson'
            )
          ).toEqual(true)
        })
      }),
        describe('in link name and url', () => {
          it('returns false for file format', () => {
            expect(
              checkFileFormat(
                {
                  description: 'Test file',
                  name: 'file.geojson',
                  protocol: 'WWW:DOWNLOAD',
                  url: 'http://example.com',
                },
                'csv'
              )
            ).toEqual(false)
          })
        })
    }),
    describe('#getLinksWithEsriRestFormats', () => {
      it('returns links with formats for link', () => {
        expect(
          getLinksWithEsriRestFormats({
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            format: 'arcgis geoservices rest api',
            url: 'https://my.esri.server/FeatureServer',
          })
        ).toEqual([
          {
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            format: 'REST:json',
            url: 'https://my.esri.server/FeatureServer/query?f=json&where=1=1',
          },
          {
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            format: 'REST:geojson',
            url: 'https://my.esri.server/FeatureServer/query?f=geojson&where=1=1',
          },
        ])
      })
    })
})
